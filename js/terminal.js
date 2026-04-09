const lines = [
"> Iniciando portafolio...",
"> Cargando Proyectos [OK]",
"> Cargando Perfil [OK]",
"> Bienvenido a DanielMonteroCode"
];

let index = 0;
const terminal = document.getElementById("terminal-text");

function typeLine(){

if(index < lines.length){

terminal.innerHTML += lines[index] + "\n";

index++;

setTimeout(typeLine,1500);

}else{

setTimeout(()=>{

document.getElementById("terminal").style.display="none";
document.getElementById("main").style.display="block";

},1000)

}

}

window.onload = typeLine;