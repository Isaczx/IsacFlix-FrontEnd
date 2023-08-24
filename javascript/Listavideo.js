const id = localStorage.getItem("ID");
const token = localStorage.getItem("token");
const headers = new Headers();
headers.append("Authorization", `Bearer ${token}`);
const teste = document.querySelector(".episodio");

console.log(id);
buscarAnime();
buscarEpisodios();



function buscarAnime(){
    fetch(`http://localhost:8080/animes/${id}`,{

        method: "GET",
        headers: headers,   
    }).then(response =>{
        if(!response.ok){
            throw new console.error("erro na solicitação");
        }
        return response.json();
        }).then(anime =>{
            console.log(anime);
            
           
                const nome = anime.nome;
                const descrição = anime.decricao;
                const imagem = anime.imagem;

                console.log("Nome: ", nome);
                console.log("Descrição ", descrição);
                console.log("Imagem ", imagem);

                const container = document.querySelector(".containerAnime");

                const Anime = document.createElement("div");
                Anime.classList.add("Anime");

                const foto = document.createElement("img");
                foto.src = imagem;
                foto.alt = nome;
                foto.classList.add("foto");

                const Nome = document.createElement("h1");
                Nome.textContent = nome;
                Nome.classList.add("Nome");

                const Descrição = document.createElement("h3");
                Descrição.textContent = descrição;
                Descrição.classList.add("Descrição");


                container.appendChild(Anime);
                Anime.appendChild(Nome);
                Anime.appendChild(foto);
                Anime.appendChild(Descrição);
        })
}

function buscarEpisodios(){
    fetch(`http://localhost:8080/episodios/Anime/${id}` ,{

        method: "GET",
        headers: headers,
    }).then(response =>{
        if(!response.ok){
            throw new console.error("Erro na solicitação de episodios")
        }
        return response.json();
        }
    ).then(data =>{

        console.log(data);
        data.forEach(episodio => {
            const nomeE = episodio.nome;
            const  idE = episodio.id;
            const video = episodio.video;
            const container = document.querySelector(".containerEpisodios")
            console.log(video)

            listaE = document.createElement("li");
            listaE.textContent = nomeE;
            listaE.classList.add("episodio");

            container.appendChild(listaE);

            listaE.addEventListener("click", function(evento){

                const frame = document.querySelector(".frame");
                frame.src = video;
                frame.title = nomeE;
                
            })

        });


        
    })   
}
