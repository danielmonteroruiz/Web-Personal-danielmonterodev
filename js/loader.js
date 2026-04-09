const terminal = document.getElementById("terminal");

const lines = [
"> Iniciando portafolio...",
"> Cargando Proyectos [OK]",
"> Cargando Perfil [OK]",
"> Bienvenido a DanielMonteroCode"
];

let index = 0;

function writeLine(){

if(index < lines.length){

terminal.innerHTML += lines[index] + "\n";

index++;

setTimeout(writeLine,1200);

}else{

localStorage.setItem("animationShown","true");

setTimeout(()=>{
window.location.href = "home.html";
},1200)

}

}

window.onload = function(){

if(localStorage.getItem("animationShown")){

window.location.href = "home.html";

}else{

writeLine();

}

}