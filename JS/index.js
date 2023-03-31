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
        cantidad:1,
        precio: 620
        
    },
    {
        id:"Producto 02",
        titulo:"Moritas Mogul",
        imagen:"https://arcorencasa.com/wp-content/uploads/2020/07/20210210-1002594.png",
        descripcion:"Gomitas sabor frutos tropicales.",
        cantidad:1,
        precio: 500
       
    },
    {
        id:"Producto 03",
        titulo:"Cadbury frutilla",
        imagen:"https://img.offers-cdn.net/assets/uploads/offers/ar/6363411/chocolate-yoghurt-frutilla-cadbury-160-gr-large.jpeg",
        descripcion:"Chocolate con leche relleno de frutillas con crema.",
        cantidad:1,
        precio: 800
        
    },
];
const contenedorProductos = document.getElementById('contenedor-productos')



//PRIMER PRIMER PASO, INYECTAR EL HTML
productosArray.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <div class="col producto">
        <div class="card h-100 ">
        <img src="${producto.imagen}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text descripciones">${producto.descripcion}</p>
            <div class="precio">
              <button class="btn btn-primary boton" id="agregar${producto.id}">Añadir al Carrito</button>
              <h5>${producto.precio}</h5>
            </div>
          </div>
        </div>
    </div>
        `;
    contenedorProductos.appendChild(div)

    //2 - SEGUNDO PASO, LUEGO DE QUE INSERTEMOS EL HTML EN EL DOM:
    const boton = document.getElementById(`agregar${producto.id}`)
    //Por cada elemento de mi array, creo un div, lo cuelgo, le pongo un id particular, una vez colgado
    //le hago un get element by id (el de agregar) Obtengo el elemento y a dicho elemento le agregamos
    //el add event listener

    boton.addEventListener('click', () => {
        //esta funcion ejecuta el agregar el carrito con la id del producto
        agregarAlCarrito(producto.id)
        //
    })
})

//TERCER PASO

const contenedorCarrito = document.getElementById('carrito-contenedor')
//SEXTO PASO
const botonVaciar = document.getElementById('vaciar-carrito')
//SEXTIMO PASO, MODIFICAR LOS CONTADORES
const contadorCarrito = document.getElementById('numerito')

//OCTAVO PASO
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//SEXTO PASO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})
// 1- PRIMER PASO

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
            // map encuentre cual es el q igual al que está agregado, le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
        const item = productosArray.find((prod) => prod.id === prodId)//Trabajamos con las ID
        //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
        carrito.push(item)
    }
    //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
    //el carrito y se ve.
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
}
//agregarAlCarrito(1) //Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente

// 5 - QUINTO PASO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    if (!item) {
        console.log(`El producto con ID ${prodId} no existe en el carrito.`)
        return
    }

    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito();
}


const actualizarCarrito = () => {
    //4- CUARTO PASO
    //LOS APPENDS SE VAN ACUMULANDO CON LO QE HABIA ANTES
    contenedorCarrito.innerHTML = "" //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //actualizado
    //3 - TERCER PASO. AGREGAR AL MODAL. Recorremos sobre el array de carrito.

    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.titulo}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="bi bi-trash3"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //SEPTIMO PASO
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    //OCTAVO PASO
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
    //empezando en 0.

}




















