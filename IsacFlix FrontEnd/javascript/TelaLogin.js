const formulario = document.querySelector("form");
const nome = document.querySelector(".username");
const senha = document.querySelector(".password");
const headers = new Headers();
headers.append('Content-Type', 'application/json');

function logar(){
    fetch("http://localhost:8080/auth/login",
    {
        

        method: "POST",
        headers: headers,
        body: JSON.stringify(
            {
            name: nome.value,
            senha: senha.value
        })   
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na solicitação de login');
        }
        return response.json();
   
})
.then(data => {
    const token = data.token; // Obtém o token de acesso do objeto de resposta
    
    // Aqui você pode fazer o que quiser com o token
    console.log('Token de acesso:', token );

    // Por exemplo, você pode armazenar o token em localStorage para uso posterior
    localStorage.setItem('token', token);

    window.location.href = "pages/home.html";


})
}

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    console.log(formulario , nome.value);
    console.log(formulario , senha.value);

    var f = logar();
   
    

    
})

