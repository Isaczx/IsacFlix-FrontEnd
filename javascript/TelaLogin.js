const formulario = document.querySelector("form");
const nome = document.querySelector(".username");
const senha = document.querySelector(".password");
const alerta = document.querySelector(".alert");
const headers = new Headers();
headers.append('Content-Type', 'application/json');

function logar(){
    fetch("http://localhost:8080/auth/login",
    {
        

        method: "POST",
        headers: headers,
        body: JSON.stringify(
            {
            email: nome.value,
            senha: senha.value
        })   
    })
    .then(response => {
        if (!response.ok) {
            mensagem("Email ou Senha incorretos")
            throw new Error('Erro na solicitação de login');    
        }
        return response.json();
   
})
.then(data => {
    const token = data.token; // Obtém o token de acesso do objeto de resposta
    

    // Por exemplo, você pode armazenar o token em localStorage para uso posterior
    localStorage.setItem('token', token);

    window.location.href = "pages/home.html";


})
}

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    var f = logar();
   
    

    
})

function mensagem(msg){
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem");
    mensagem.innerText = msg;
    alerta.append(mensagem);
  
  
    setTimeout(() =>{
      mensagem.remove();
    }, 10000)
  }