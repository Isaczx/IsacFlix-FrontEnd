const co = document.querySelector(".video-carousel");
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
            listaAnimes.classList.add("video-slide");
            
            const listaImagens = document.createElement("img");
            listaImagens.src = imagemA;
            listaImagens.alt = nome;
            listaImagens.classList.add("imagens");
            listaImagens.width = 200;
            listaImagens.height = 200;
            
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

                
            });
        });
        
        //inserindo o carrosel
            $('.video-carousel').slick({
              slidesToShow: 5,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000,
              arrows: true,
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1
                  }
                }
                
              ]
            });

            
            
            const anterior = document.querySelector(".slick-prev").textContent = "Anterior";
            const proximo=document.querySelector(".slick-next").textContent = "Proximo";
          });
          
    

   
}
