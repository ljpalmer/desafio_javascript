//Variables globales para la busqueda y variable del carrito de compras
const resultado = document.getElementById("resultado");
let carrito_compras = fnc_js_cargarCarritoCompras();

//DOM: Procedemos a crear la seccion del carrito
let section_Carrito = document.getElementById("carrito");

let botonReiniciar = document.createElement("button");
botonReiniciar.innerText = "Reiniciar Carrito";
section_Carrito.appendChild(botonReiniciar);
botonReiniciar.setAttribute("class", "btn btn-warning btn-block");
botonReiniciar.addEventListener('click', fnc_js_reiniciarCarritoCompras);

let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total Carrito:</h2>";
section_Carrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("p");
montoTotalCompra.innerText = "$ 0.00";
totalCompra.appendChild(montoTotalCompra);

let cantidadProductos = document.createElement("div");
cantidadProductos.innerHTML = "<h3>Cantidad de productos: </h3>";
section_Carrito.appendChild(cantidadProductos);

let cantProductos = document.createElement("p");
cantProductos.innerText = "0";
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
                    <p class="card__price">Precio: $ ${producto.price.toFixed(2)}</p>
                </div>
                <div class="card__boton row"><div class="col-6"><button type="button" class="btn btn-primary btn-block" onclick="fnc_js_preguntarAgregarProductoCarrito(${producto.id})">Agregar</button></div><div class="col-6"><button class="btn btn-warning btn-block" onclick="fnc_js_abrirDetalleProducto(${producto.id})">Ver</button></div></div>
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
      title: '¿Deseas finalizar tu compra?',
      text: `Total a pagar: ${precioFinal}`,
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
        fnc_js_vaciarCarritoCompras();         
        fnc_js_calcularTotalCarrito();
      }
    })
};
//funcion para reinicializar el carrito y calcular el precio total a pagar
function fnc_js_reiniciarCarritoCompras() {    
    //uso sweet alert para que el usuario confirme el reinicio del carrito
    Swal.fire({
      title: '¿Deseas reiniciar tu carrito?',
      text: `Se perdera los productos agregados`,
      showCancelButton: true,
      confirmButtonColor: '#008f39',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {        
        Swal.fire(
          'Carrito de Compras Vacio',
          '¡Empieza a buscar los productos de tu preferencia!',
          'success'
        );        
        fnc_js_vaciarCarritoCompras();        
        fnc_js_calcularTotalCarrito();
      }
    })
};
//funcion para agregar el producto al carrito de compras
function fnc_js_agregarCarritoCompras(id){    
        carrito_compras.push(productos.find(p => p.id == id));     
        localStorage.setItem("carrito_compras", JSON.stringify(carrito_compras));   
        fnc_js_calcularTotalCarrito();      
};
//funcion para calcular el nuevo total a pagar del carrito de compras asi como la cantidad de productos en el carrito
function fnc_js_calcularTotalCarrito() {
    let totalPagar = 0;
    for (const producto of carrito_compras) {
        totalPagar += producto.price;
    }
    montoTotalCompra.innerText = '$ '+ totalPagar.toFixed(2);
    cantProductos.innerText = carrito_compras.length;
};
//Obtenemos la informacion del localStorage, en caso de no existir se devuelve un array vacio
function fnc_js_cargarCarritoCompras (){
  let carrito = JSON.parse(localStorage.getItem("carrito_compras"));
  return (carrito == null) ? [] : carrito;
};
//funcion para reiniciar sumadores y remover del localstorage la informacion de carrito de compras
function fnc_js_vaciarCarritoCompras () {
  montoTotalCompra.innerText = "$ 0.00";
  cantProductos.innerText = "0";
  //Eliminamos del localstorage solo lo que corresponde al carrito, 
  //manteniendo la data de los clientes
  localStorage.removeItem("carrito_compras");
  carrito_compras = [];
};
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
          Toastify({
            text: "Producto agregado al carrito, ¡Sigue Comprando!",
            duration: 2000,            
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover                     
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            },
            className: "mensaje__alerta"
          }).showToast(); 
        }
      });
};
function fnc_js_abrirDetalleProducto(id){
    $("#exampleModalCenter").modal('show');
    let pos_producto = productos.findIndex(x => x.id== id);
    //Obtenemos del DOM los elementos    
    let nombreProducto = $("producto_nombre");
    let descripcionProducto = document.getElementById("producto_descripcion");
    let precioProducto = document.getElementById("producto_precio");
    //Seteamos los valores
    nombreProducto.innerHTML = productos[pos_producto].title;
    descripcionProducto.innerHTML = productos[pos_producto].description;
    precioProducto.innerHTML = productos[pos_producto].price;
    //Obtenemos una imagen aleatoria dentro de las imagenes del producto
    let imagenProducto = getRandomIndex(0,productos[pos_producto].images.length - 1); 
    console.log(imagenProducto);
    //Con JQuery asignamos el atributo source
    $("#producto_imagen").attr("src", productos[pos_producto].images[imagenProducto]);
};
//Oculta el modal detalle del producto
function fnc_js_cerrarDetalleProducto(){
    $("#exampleModalCenter").modal('hide');  
};
//Calcula un random para obtener una imagen aleatoria, recibe un intervalo para generar numeros aleatorios
function getRandomIndex(min, max) {
    return (max==0)  ? 0 : Math.round(Math.random() * (max - min) + min, 0);     
}