const CPF = document.querySelector("#CPF");
const botao = document.querySelector("#butao");
const alerta = document.querySelector(".alert");
const email = document.querySelector("#email");
const headers = new Headers;
headers.append('Content-Type', 'application/json');


CPF.addEventListener("input", () =>{
    let input = CPF.value.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (input.length > 3 && input.length <= 6) {
    input = input.replace(/^(\d{3})(\d)/, '$1.$2');
  } else if (input.length > 6 && input.length <= 9) {
    input = input.replace(/^(\d{3})(\d{3})(\d)/, '$1.$2.$3');
  } else if (input.length > 9) {
    input = input.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
  }

  CPF.value = input;
})

CPF.addEventListener("blur", ()=>{
    ValidarCPF();
})

botao.addEventListener("submit", ()=>{
    Recuperar();
})

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

function mensagem(msg){
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem");
    mensagem.innerText = msg;
    alerta.append(mensagem);

    setTimeout(() =>{
        mensagem.remove();
      }, 10000)
}

function Recuperar(){
    fetch(`http://localhost:8080/Recuperar/${email.value},${CPF.value}`,{
        method: "GET",
        headers: headers})
        .then(response =>{
            if(!response.ok){
                mensagem("Falha na requisição");
            }
            return response.json();
        }).then(data =>{
            if(data.email === email.value && data.CPF === CPF.value){
                alert(data.senha);

            }else{
                mensagem("Valores informados não conferem ou não existem");
            }
        })
}

