
//Switch dark-mode//

const colormodebutton = document.querySelector("#color-mode");
const body = document.body;
const imgchange = document.getElementById("imgchange");
const coloricono = document.getElementById("icono");
const colorcarro = document.getElementById("carro");
let darkmode = localStorage.getItem("dark-mode");

colormodebutton.addEventListener("click", cambiarmodocolor);

if (darkmode === "activado") {
    body.classList.add("dark-mode");
    imgchange.src = "./Imágenes/Darkmodelogo.png";
    colormodebutton.innerText = "Modo claro";
    coloricono.classList.add("fondoboton");
    colorcarro.classList.add("carro");
}

function cambiarmodocolor(){
    body.classList.toggle("dark-mode");
    body.classList.add("suavizar");
    imgchange.classList.add("suavizarimg");
    coloricono.classList.add("suavizar");
    colorcarro.classList.add("suavizar");

    if (body.classList.contains("dark-mode")){
        colormodebutton.innerText = "Modo claro";
        imgchange.src = "./Imágenes/Darkmodelogo.png";
        coloricono.classList.add("fondoboton");
        colorcarro.classList.add("carro");
        localStorage.setItem("dark-mode", "activado" )
    } else {
        colormodebutton.innerText = "Modo oscuro";
        imgchange.src = "./Imágenes/img-header1.png";
        colorcarro.classList.remove("carro");
        localStorage.setItem("dark-mode", "desactivado")
    }
}



//Carrito de compra//

