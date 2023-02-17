
   //bucle do while
let contraseña = "computadora"
do{
    contraseña = prompt("Ingrese su contraseña");
}
while(contraseña != "computadora")
//Array
const productos = [ "Coca", "Moritas", "Chocolate"]
if (productos.includes("Coca")){
    alert(productos.indexOf("Coca"));
}
//Objeto
const producto1 ={
    tamaño:"Grande",
    cantidad: "un litro y medio",
    color:"Negro"
} 
alert(producto1.cantidad);

//Función 
function saludar (nombre){
    return "hola " + nombre
}
let Saludogral = saludar(prompt("Ingrese su nombre"));
alert(Saludogral);
