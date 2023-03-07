
//Switch dark-mode//

const colormodebutton = document.querySelector("#color-mode");
const body = document.body;
const imgchange = document.getElementById("imgchange");
const coloricono = document.getElementById("icono");
const colorcarro = document.getElementById("carro");
colormodebutton.addEventListener("click", cambiarmodocolor);

function cambiarmodocolor(){
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")){
        colormodebutton.innerText = "Modo claro";
        imgchange.src = "./Imágenes/Darkmodelogo.png";
        coloricono.classList.add("fondoboton");
        colorcarro.classList.add("carro");
    } else {
        colormodebutton.innerText = "Modo oscuro";
        imgchange.src = "./Imágenes/img-header1.png";
        colorcarro.classList.remove("carro");
    }
}

//Carrito de compra//

