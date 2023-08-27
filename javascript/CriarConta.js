const CPF = document.querySelector("#CPF");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const Rsenha = document.querySelector("#RSenha");
const botao = document.querySelector("#butao");
const form = document.querySelector(".form-group");
const headers = new Headers;
headers.append('Content-Type', 'application/json');



CPF.addEventListener("input", () => {
  let input = CPF.value.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (input.length > 3 && input.length <= 6) {
    input = input.replace(/^(\d{3})(\d)/, '$1.$2');
  } else if (input.length > 6 && input.length <= 9) {
    input = input.replace(/^(\d{3})(\d{3})(\d)/, '$1.$2.$3');
  } else if (input.length > 9) {
    input = input.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
  }

  CPF.value = input;
});

nome.addEventListener("blur", () =>{
  TestarNome();
  
})

//quando tira o foco valida o CPF
CPF.addEventListener("blur", () =>{
  ValidarCPF();
  TestarNome();
})

//quando tira o foco do input confirmarSenha ele valida as senhas
Rsenha.addEventListener("blur", () =>{
  ValidarSenha();
})

botao.addEventListener("mouseover", () =>{
  ValidarSenha();
  ValidarCPF();
  TestarNome();
})

form.addEventListener("submit", function(evento){
    evento.preventDefault();
   
      
      var f = Criar();
      nome.value = "";
      email.value= "",
      CPF.value ="";
      senha.value = "";
      Rsenha.value = "";
    
});
   

 

function Criar(){
    fetch("http://localhost:8080/auth/registrar",{

        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: nome.value,
            email: email.value,
            CPF: CPF.value,
            senha: senha.value
        })
    }).then(response =>{
        if(!response.ok){
            alert("Usuario , Email ou CPF ja cadastrados");
        }else{
          alert("Conta com sucesso!!");
        }
       
        return response.json();
      
      }).then(data =>{
        window.location.href = "../index.html";
      })
}

function ValidarCPF(){
  // Retira os caracteres nao numericos
 const CPFValidar= CPF.value.replace(/[^\d]/g , "");
  
  
  // ve contem 11 digitos e nao sao repetidos
  if(CPFValidar.length !== 11 || /^(.)\1+$/.test(CPFValidar)){
    alert("CPF deve conter 11 digitos");
    botao.disabled=true;
  }else{
    var cpf = CPFValidar;
    var soma = 0;
  // soma cada carectere do CPF
  for(var i= 0 ; i < 11; i ++){
    soma += parseInt(cpf.charAt(i)) ; 
  }
  var somaString = soma.toString();  
  // Se os digitos do produto da soma nao forem iguais o CPF é invalido
  if(somaString.charAt(0) ==  somaString.charAt(1) && cpf.charAt(9) <= 9){
    botao.removeAttribute("disabled");
    return true;
  }else{
    botao.disabled=true;
    alert("CPF Invalido");
    return false;
  }
  }

  
 
  
}

function ValidarSenha(){
  // Se as senhas nao forem iguais. apaga os inputs e desativa o botao
  if(senha.value !== Rsenha.value ){
    botao.disabled=true;
    alert("As senhas não coincidem. Preencha os campos corretamente.");
    senha.value = "";
    Rsenha.value ="";
  }  else{
// Se a senha nao conter no minimo 8 caracteres. desativa o botao
   if (senha.value.length <= 7){
      alert("A senha deve conter 8 caracteres ou mais");
      botao.disabled = true;
      senha.value = "";
      Rsenha.value ="";
    }else{
      botao.disabled = false;
    }
  }

  
}

function TestarNome(){
  fetch(`http://localhost:8080/lista/${nome.value}`,{
    method: "GET",
  
    headers: headers
  }).then(response =>{
    if(!response.ok){
      alert("problema na requisição")
    }
    return response.json();
  }).then(data =>{
    if(data.username === nome.value){
      botao.disabled = true;
      alert("nome ja cadastrado");
    }else{
      alert(prossiga)
      botao.disabled = false;
    }

  })
}