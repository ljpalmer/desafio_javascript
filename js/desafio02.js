//Variables globales para la busqueda y variable del carrito de compras
const resultado = document.getElementById("resultado");
const texto_buscar = document.getElementById("texto_buscar");
let carrito_compras = [];

//DOM: Procedemos a crear la seccion del carrito
let section_Carrito = document.getElementById("carrito");

let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total Carrito:</h2>";
section_Carrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("p");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadProductos = document.createElement("div");
cantidadProductos.innerHTML = "<h3>Cantidad de productos: </h3>";
section_Carrito.appendChild(cantidadProductos);

let cantProductos = document.createElement("p");
cantProductos.innerText = "$ 0";
cantidadProductos.appendChild(cantProductos);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
section_Carrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "btn btn-primary btn-block");
botonFinalizar.addEventListener('click', fnc_js_finalizarCarritoCompras);

//funcion para filtrar los productos
function fnc_js_filtrarProductos(){
    resultado.innerHTML = '';
    const texto = texto_buscar.value.toLowerCase();
    for ( let producto of productos ){
        let nombre = producto.title.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <div class="card__product" style="width: 20rem;" id="resultado-producto${producto.id}">
                <img src="${producto.thumbnail}" class="card-img" alt="${producto.title}">
                <div class="card__body">
                    <p class="card__title">Producto: ${producto.title}</h5>
                    <p class="card__category">Categoría: ${producto.category}</p>
                    <p class="card__price">Precio: $ ${producto.price}</p>
                </div>
                <div class="card__boton col-12"><button type="button" class="btn btn-primary btn-block" onclick="fnc_js_preguntarAgregarProductoCarrito(${producto.id})">Agregar</button></div>
            </div>
            `
        }
    }
    if ( resultado.innerHTML === '' ){
        resultado.innerHTML = `Producto no encontrado`
    }
};
//funcion para reinicializar el carrito y calcular el precio total a pagar
function fnc_js_finalizarCarritoCompras() {
    const precioFinal = montoTotalCompra.innerText;
    //uso sweet alert para que el usuario confirme su compra, cuando toca si se vacia el carrito
    Swal.fire({
      title: '¿Seguro que queres finalizar tu compra?',
      text: `Total a pagar: $ ${precioFinal}`,
      showCancelButton: true,
      confirmButtonColor: '#008f39',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {        
        Swal.fire(
          'Compra confirmada',
          '¡Que lo disfrutes!',
          'success'
        );        
        fnc_js_iniciarCarritoCompras();
        fnc_js_calcularTotalCarrito();
      }
    })
}
//funcion para iniciar el carrito de compras
function fnc_js_iniciarCarritoCompras() {    
    carrito_compras = [];
}
//funcion para agregar el producto al carrito de compras
function fnc_js_agregarCarritoCompras(id){    
        carrito_compras.push(productos.find(p => p.id == id));        
        fnc_js_calcularTotalCarrito();      
}
//funcion para calcular el nuevo total a pagar del carrito de compras asi como la cantidad de productos en el carrito
function fnc_js_calcularTotalCarrito() {
    let totalPagar = 0;
    for (const producto of carrito_compras) {
        totalPagar += producto.price;
    }
    montoTotalCompra.innerText = '$ '+ totalPagar;
    cantProductos.innerText = carrito_compras.length;
}
//funcion para pedir el nombre del cliente y cargarlo en el html posterior a su ingreso, del tipo async debido al await de la funcion swal
async function fnc_js_PedirNombreCliente(){
    const inputValue = "";
    const { value: nombreCliente } = await Swal.fire({
        title: 'INGRESE SU NOMBRE',
        input: 'text',
        inputLabel: 'BIENVENIDO',
        inputValue: inputValue,
        showCancelButton: false,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes ingresa un nombre del cliente.'
          }
        }
      });
      if(nombreCliente!=""){
        let textoCliente = document.getElementById("nombre__cliente");
        textoCliente.innerHTML = "CLIENTE: " + nombreCliente.toUpperCase();
      }
}
//funcion para preguntar si desea agregar el producto al carrito, si se confirma llama a la funcion fnc_js_agregarCarritoCompras
function fnc_js_preguntarAgregarProductoCarrito(id){
    Swal.fire({
        title: 'Confirmar',
        text: `¿Esta seguro de agregar el producto al carrito?`,
        showCancelButton: true,
        confirmButtonColor: '#008f39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          fnc_js_agregarCarritoCompras(id);
          Swal.fire(
            'Producto agregado',
            '¡Sigue comprando!',
            'success'
          )          
        }
      });
}
//Agregamos el evento fnc_js_filtrarProductos a la caja de texto de busqueda en el evento keyup
texto_buscar.addEventListener('keyup', fnc_js_filtrarProductos);

//Llamamos la funciones para iniciar la pagina
fnc_js_filtrarProductos();
fnc_js_iniciarCarritoCompras();
fnc_js_PedirNombreCliente();