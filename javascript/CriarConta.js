const CPF = document.querySelector("#CPF");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const Rsenha = document.querySelector("#RSenha");
const botao = document.querySelector("#butao");
const form = document.querySelector(".form-group");
const alerta = document.querySelector(".alert");
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

email.addEventListener("blur", () =>{
  TestarEmail();
})



//quando tira o foco valida o CPF
CPF.addEventListener("blur", () =>{
  TestarCPF();
  ValidarCPF();
  
})

//quando tira o foco do input confirmarSenha ele valida as senhas
Rsenha.addEventListener("blur", () =>{
  ValidarSenha();
})


form.addEventListener("submit", function(evento){
    evento.preventDefault();
    TestarNome();
    TestarEmail();
    ValidarCPF();
    TestarCPF();
    ValidarSenha();
    
    
      if(botao.disabled = true){
        evento.preventDefault();
      }else{

      var f = Criar();
      nome.value = "";
      email.value= "",
      CPF.value ="";
      senha.value = "";
      Rsenha.value = "";
    }
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
          const msg = "Usuario , Email ou CPF ja cadastrados";
          
          mensagem(msg);
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
    mensagem("CPF deve conter 11 digitos");
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
    mensagem("CPF Invalido");
    return false;
  }
  }

  
 
  
}

function ValidarSenha(){
  // Se as senhas nao forem iguais. apaga os inputs e desativa o botao
  if(senha.value !== Rsenha.value ){
    botao.disabled=true;
    mensagem("As senhas não coincidem. Preencha os campos corretamente.");
    senha.value = "";
    Rsenha.value ="";
  }  else{
// Se a senha nao conter no minimo 8 caracteres. desativa o botao
   if (senha.value.length <= 7){  
      mensagem("A senha deve conter 8 caracteres ou mais")
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
      mensagem("problema na requisição")
    }
    return response.json();
  }).then(data =>{
    if(data.username === nome.value){
      botao.disabled = true;
    
     mensagem("Nome ja cadastrado");
    }else{
      mensagem("prossiga");
      botao.disabled = false;
    }

  })
}

function TestarEmail(){
  fetch(`http://localhost:8080/lista/email/${email.value}`,{
    method: "GET",
    headers: headers})
    .then(response =>{
      if(!response.ok){
        mensagem("problema na requisição")
      }
      return response.json();
    }).then(data =>{
      if(email.value === data.email){
        botao.disabled = true;
        mensagem("Email ja cadastrado")
      }else{
        botao.disabled = false;
      }
    })
}

function TestarCPF(){
  fetch(`http://localhost:8080/lista/CPF/${CPF.value}`,{
    method: "GET",
    headers: headers})
    .then(response =>{
      if(!response.ok){
        mensagem("falha na requisição")
      }
      return response.json();
    }).then(data =>{
      console.log(data)
      if(CPF.value === data.cpf){
        botao.disabled = true;
        mensagem("CPF ja cadastrado");
      }else{
        botao.disabled = false;
        
      }
    })
}

function mensagem(msg){
  const mensagem = document.createElement("div");
  mensagem.classList.add("mensagem");
  mensagem.innerText = msg;
  alerta.append(mensagem);


  setTimeout(() =>{
    mensagem.remove();
  }, 10000)
}