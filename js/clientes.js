//Definimos la Clase Cliente
class Cliente {
    constructor(id, dni, nombre, apellido, edad, numeroTarjeta, fechaTarjeta, cvvTarjeta) {
        this.id = id;
        this.dni =  dni;
        this.nombre = nombre; 
        this.apellido = apellido;
        this.edad = edad;     
        this.numeroTarjeta = numeroTarjeta;  
        this.fecha = fechaTarjeta;  
        this.cvv = cvvTarjeta;  
    }
};
//Almacenamos en un objeto todos los clientes por defecto
const clientes = fnc_js_cargarClientes();
var sesion = fnc_js_obtenerSesion();

function fnc_js_obtenerSesion(){
    usuario = JSON.parse(localStorage.getItem("sesion"));
    return (usuario == null)? '' : usuario;
}
function fnc_js_cargarDatosCliente(){
  if (sesion!=''){
    fnc_js_mostrarDatosCliente(sesion.nombre + ' '+ sesion.apellido, sesion.dni, sesion.edad, sesion.numeroTarjeta, sesion.fecha, sesion.cvv);
    let sesionCliente = document.getElementById("sesion_cliente");
    sesionCliente.innerHTML = '<button id="boton_finalizar_sesion" class="btn btn-danger" onclick="fnc_js_finalizar_sesion()">Finalizar Sesión</button>';
  }else{
    boton_iniciar_sesion.addEventListener('click', fnc_js_pedirNombreCliente);
  }
}
function fnc_js_finalizar_sesion(){
  Swal.fire({
      title: 'Confirmar acción',
      text: `¿Deseas cerrar sesión?`,
      showCancelButton: true,
      confirmButtonColor: '#008f39',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
  }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("sesion");
        //Redireccionamos a Carrito para pagar
        window.location.href = "carrito.html";
      }
  });
}
//funcion para pedir el nombre del cliente y cargarlo en el html posterior a su ingreso, del tipo async debido al await de la funcion swal
async function fnc_js_pedirNombreCliente(){
    const inputValue = "";
    const { value: dniCliente } = await Swal.fire({
        title: 'INGRESE SU DNI',
        input: 'text',
        inputLabel: 'NUMERO DOCUMENTO',
        confirmButtonColor: '#008f39',
        confirmButtonText: 'Ingresar',
        inputValue: inputValue,
        showCancelButton: false,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes ingresa un nombre del cliente.'
          }
        }
      });
      if(dniCliente!=""){        
        fnc_js_busquedaCliente(dniCliente);
      }
}
//funcion para obtener los clientes registrados en el localstorage, en caso de no existir devuelve clientes por defecto
function fnc_js_cargarClientes (){
    let clientes = JSON.parse(localStorage.getItem("clientes"));
    if (clientes == null) {
        //Creamos instancias del objetos por defecto
        const cliente_01 = new Cliente (1, "12345678", "Luis", "Palmer",  34, "4009-1753-3280-6176","04/26","123");
        const cliente_02 = new Cliente (2, "87654321", "Mario", "Garcia", 33, "5888-1419-0888-8884","07/23","123");
        const cliente_03 = new Cliente (3, "10293847", "Cesar", "Mendoza",32, "4940-1900-0037-0787","10/28","123");
        const cliente_04 = new Cliente (4, "56473829", "Oscar", "Quenta", 30, "4548-0320-0393-3011","03/24","123");
        clientes = [cliente_01, cliente_02, cliente_03, cliente_04];
        console.log(clientes);
        localStorage.setItem("clientes", JSON.stringify(clientes));   
        return clientes;
    } else {        
      return clientes;
    }    
  }
//funcion para la busqueda del cliente
function fnc_js_busquedaCliente(dni){
    let posicion_cliente = clientes.findIndex(x => x.dni == dni);    
    if(posicion_cliente!=-1){        
        fnc_js_mostrarDatosCliente(clientes[posicion_cliente].nombre+' '+clientes[posicion_cliente].apellido,
                                   clientes[posicion_cliente].dni,
                                   clientes[posicion_cliente].edad,
                                   clientes[posicion_cliente].numeroTarjeta,
                                   clientes[posicion_cliente].fecha,
                                   clientes[posicion_cliente].cvv);
        let sesionCliente = document.getElementById("sesion_cliente");
        sesionCliente.innerHTML = "";  
        Swal.fire(
            'Bienvenido a Mercado - Perú',
            clientes[posicion_cliente].nombre+' '+clientes[posicion_cliente].apellido+ ' ha iniciado sesión',
            'success'
          ); 
          localStorage.setItem("sesion", JSON.stringify(clientes[posicion_cliente]));     
    }else{        
        Swal.fire(
            'Cliente no encontrado',
            '¡Intente de nuevo!',
            'warning'
          );         
    }
}

function fnc_js_mostrarDatosCliente(nombre,documento,edad, numerot,fechat,cvvt){
  let textoNombreCliente = document.getElementById("nombre_cliente");
  let textoDniCliente = document.getElementById("documento_cliente");
  let textoEdadCliente = document.getElementById("edad_cliente");
  let textoNumeroTarjeta = document.getElementById("numero_t");
  let textoFechaTarjeta = document.getElementById("fecha_t");
  let textoCvvTarjeta = document.getElementById("cvv_t");
  textoNombreCliente.innerHTML = nombre;
  textoDniCliente.innerHTML = documento;
  textoEdadCliente.innerHTML = edad;
  textoNumeroTarjeta.value = numerot;
  textoFechaTarjeta.value = fechat;
  textoCvvTarjeta.value = cvvt;
}

fnc_js_cargarDatosCliente();