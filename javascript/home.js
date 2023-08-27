const co = document.querySelector(".category-list");
const headers = new Headers();
const token = localStorage.getItem("token");
headers.append("Authorization", `Bearer ${token}`);


buscaAnimes();

function buscaAnimes(){

    fetch("http://localhost:8080/animes", {

        method: "GET",
        headers: headers,

    }).then(response =>{
        if(!response.ok){
            throw new console.error("erro na solicitação");
        }
        return response.json(); // Converte a resposta para JSON
    }).then(data => {
        console.log(data);
        console.log('Token de acesso:', token );

        data.forEach(anime => {
            const nome = anime.nome;
            const id = anime.id;
            const imagemA = anime.imagem;
        

            console.log(nome, id, imagemA)
            
            const listaAnimes = document.createElement("div");
            listaAnimes.classList.add("animes");
            
            const listaImagens = document.createElement("img");
            listaImagens.src = imagemA;
            listaImagens.alt = nome;
            listaImagens.classList.add("imagens");
            
            const nomeAnime = document.createElement("div");
            nomeAnime.textContent = nome;
            nomeAnime.classList.add("nomeAnime");

            
            
            listaAnimes.appendChild(nomeAnime);
            co.appendChild(listaAnimes);
            listaAnimes.appendChild(listaImagens); 

            listaAnimes.addEventListener("click", function(event){

                console.log("Anime: " ,nome);
                console.log("ID: ", id);
                
                localStorage.setItem("ID", id);
                window.location.href= "../pages/ListaVideo.html";

                
            })
        });
        
    })

   
}
