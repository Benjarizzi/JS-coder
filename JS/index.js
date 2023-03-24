/**Switch */

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

const productosArray = [
    {
        id:"Producto 01",
        titulo:"Coca Cola",
        imagen:"https://ardiaprod.vtexassets.com/arquivos/ids/228484/Gaseosa-CocaCola-Sabor-Original-15-Lts-_2.jpg?v=637959904176070000",
        descripcion:"Gaseosa de 1,5L no retornable.",
        precio: 620
        
    },
    {
        id:"Producto 02",
        titulo:"Moritas Mogul",
        imagen:"https://arcorencasa.com/wp-content/uploads/2020/07/20210210-1002594.png",
        descripcion:"Gomitas sabor frutos tropicales.",
        precio: 500
       
    },
    {
        id:"Producto 03",
        titulo:"Cadbury frutilla",
        imagen:"https://img.offers-cdn.net/assets/uploads/offers/ar/6363411/chocolate-yoghurt-frutilla-cadbury-160-gr-large.jpeg",
        descripcion:"Chocolate con leche relleno de frutillas con crema.",
        precio: 800
        
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".boton");
const numerito = document.querySelector("#numerito");

function cargarproductos(){
    productosArray.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
    <div class="col producto">
        <div class="card h-100 ">
        <img src="${producto.imagen}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text descripciones">${producto.descripcion}</p>
            <div class="precio">
              <button class="btn btn-primary boton" id="${producto.id}">Añadir al Carrito</button>
              <h5>${producto.precio}</h5>
            </div>
          </div>
        </div>
    </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar ();
}


cargarproductos();

function actualizarBotonesAgregar (){
    botonesAgregar = document.querySelectorAll(".boton");
    botonesAgregar.forEach(button =>{
        button.addEventListener("click",agregarAlCarrito);
    });
}


let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito ();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);

 if(productosEnCarrito.some(producto => producto.id === idBoton)){
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;    
 }else{
    productoAgregado.cantidad = 1; //Agregamos una propiedad a los productos que tenemos en el Array de arriba
    productosEnCarrito.push(productoAgregado);
 }
 actualizarNumerito ()
 localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito (){
    let nuevoNumerito =  productosEnCarrito.reduce((ac,producto) => ac + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}