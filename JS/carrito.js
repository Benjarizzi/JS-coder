let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito)

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorTotal = document.querySelector("#total")

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.lenght > 0){
       

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
       
    
        productosEnCarrito.forEach(producto => {
    
        const div = document.createElement("div");
        div.classList.add("carrito-productos");
        div.innerHTML = `
        <div class="carrito-producto">
        <img class="img-carrito" src="${producto.imagen}" alt="">
        <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cant">
            <small>cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>precio</small>
            <p>${"$" + producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>${"$" + producto.precio * producto.cantidad}</p>
            </div>
          <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
        `;
        carritoProductos.append(div);
    })
        
    }else{
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
    acualizarBotonesEliminar();
    actulizarTotal();
}

cargarProductosCarrito();

function acualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(button => {
        button.addEventListener("click", eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.lenght = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

botonComprar.addEventListener("click", finalizarCompra);
function finalizarCompra(){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    carritoComprado.classList.remove("disabled");
}
function actulizarTotal(){
const totalCalculado = productosEnCarrito.reduce((ac, producto) => ac + (producto.precio * producto.cantidad),0)
totalCalculado.innerText = `$${totalCalculado}`;
}