   //Condicional
let ingresar = prompt("Vas a comprar algo el día de hoy? SI NO");

if (ingresar == "Si" || ingresar == "si" || ingresar == "SI") {
    alert("Genial!  empezemos!");
} else {
    alert(":(")
} 

//bucle do while
let contraseña = "computadora"
do{
    contraseña = prompt("Ingrese su contraseña");
}
while(contraseña != "computadora")