//Definimos la Clase Cliente
class Cliente {
    constructor(id, dni, nombre, apellido, edad) {
        this.id = id;
        this.dni =  dni;
        this.nombre = nombre; 
        this.apellido = apellido;
        this.edad = edad;        
    }
};

//Almacenamos en un objeto todos los clientes por defecto
const clientes = fnc_js_cargarClientes();

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
        const cliente_01 = new Cliente (1, "12345678", "Luis", "Palmer", 34 );
        const cliente_02 = new Cliente (2, "87654321", "Mario", "Garcia", 30 );
        const cliente_03 = new Cliente (3, "10293847", "Cesar", "Mendoza", 32 );
        const cliente_04 = new Cliente (4, "56473829", "Oscar", "Quenta", 29 );
        clientes = [cliente_01, cliente_02, cliente_03, cliente_04];
        localStorage.setItem("clientes", JSON.stringify(clientes));   
        return clientes;
    } else {        
      return clientes;
    }    
  }
  //funcion para la busqueda del cliente
function fnc_js_busquedaCliente(dni){
    const posicion_cliente = clientes.findIndex(x => x.dni == dni);    
    if(posicion_cliente!=-1){
        let textoNombreCliente = document.getElementById("nombre_cliente");
        let textoDniCliente = document.getElementById("documento_cliente");
        let textoEdadCliente = document.getElementById("edad_cliente");
        textoNombreCliente.innerHTML = clientes[posicion_cliente].nombre+' '+clientes[posicion_cliente].apellido;
        textoDniCliente.innerHTML = clientes[posicion_cliente].dni;
        textoEdadCliente.innerHTML = clientes[posicion_cliente].edad;
        let sesionCliente = document.getElementById("sesion_cliente");
        sesionCliente.innerHTML = "";  
        Swal.fire(
            'Bienvenido a Mercado - Perú',
            clientes[posicion_cliente].nombre+' '+clientes[posicion_cliente].apellido+ ' ha iniciado sesión',
            'success'
          );        
    }else{        
        Swal.fire(
            'Cliente no encontrado',
            '¡Intente de nuevo!',
            'warning'
          );         
    }
}