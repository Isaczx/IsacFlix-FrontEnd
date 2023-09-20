const id = localStorage.getItem("ID");
const token = localStorage.getItem("token");
const headers = new Headers();
headers.append("Authorization", `Bearer ${token}`);
const teste = document.querySelector(".episodio");
const botaoD = document.querySelector(".setaD");
const botaoE = document.querySelector(".setaE");
const container = document.querySelector(".containerEpisodios");
const selecao = document.querySelector("#epi");
const option = document.querySelectorAll(".episodio");
const frame = document.querySelector(".frame");


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
            
            
           
                const nome = anime.nome;
                const descrição = anime.decricao;
                const imagem = anime.imagem;

                

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
        console.log(data)
        console.log(data.length);
        data.forEach(episodio => {
            const nomeE = episodio.nome;
            const  idE = episodio.id;
            const videoE = episodio.video;
            
            

            
            listaE = document.createElement("option");
            listaE.textContent = nomeE;
            listaE.classList.add("episodio");

            selecao.appendChild(listaE);
            frame.src = data[0].video;
            frame.title = data[0].nome;
            
          selecao.addEventListener("change", ()=>{
            var numeroEpisodio = selecao.selectedIndex;
            console.log(numeroEpisodio);
           
            frame.title = data[numeroEpisodio].nome;
            frame.src = data[numeroEpisodio].video;
            
          })
           
          
        });

       click(data);
        
    });
    
}


function click(data){
    botaoD.addEventListener("click", () =>{
        if(selecao.selectedIndex < selecao.options.length -1){
        selecao.selectedIndex += 1;
        var numeroEpisodio = selecao.selectedIndex;
        frame.title = data[numeroEpisodio].nome;
        frame.src = data[numeroEpisodio].video;

        }
    })

    botaoE.addEventListener("click", () =>{

        if(selecao.selectedIndex  >= 1){
            selecao.selectedIndex -= 1;
            var numeroEpisodio = selecao.selectedIndex;
            frame.title = data[numeroEpisodio].nome;
            frame.src = data[numeroEpisodio].video;
        }
    })
}