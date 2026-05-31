const words = [

"Java",
"Kotlin",
"SQL y PostgreSQL",
"Flutter",
"Jetpack Compose",
"Clean Code",
"IA",
"Videojuegos 2D y 3D",
"Unity",
"HTML",
"CSS",
"Responsive Design",
"Spring Boot",
"Git",
"GitHub",
"Postman"

];

let i = 0;

function typing(){

document.querySelector(".typing").innerText = words[i];

i++;

if(i >= words.length){

i = 0;

}

setTimeout(typing,2000);

}

typing();