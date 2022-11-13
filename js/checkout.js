//INICIO DEL MANEJO DE DEL DOM
let carrito_compras = fnc_js_cargarCarritoCompras();
let section_Carrito = document.getElementById("carrito");
const boton_iniciar_sesion = document.getElementById("boton_iniciar_sesion");

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

let botonFinalizarCompra = document.getElementById("btn_pagar_compra");

function fnc_js_validarInicioSesion() {
    let documentoCliente = document
        .getElementById("documento_cliente")
        .innerText;
    console.log(documentoCliente);
    if (documentoCliente != '-') {
        return true;
    } else {
        return false;
    }
}
function fnc_js_checkOutCarritoCompras() {
    if (fnc_js_validarInicioSesion() == false) {
        Swal
            .fire(
                'Debe iniciar sesión',
                '¡Inicie sesión con el número de DNI!',
                'warning'
            )
            .then(x => {
                fnc_js_pedirNombreCliente();
            });
        // fnc_js_pedirNombreCliente();
    } else {
        $("#exampleTarjeta").modal('show');
    }
};
function fnc_js_cerrarCheckOutCarritoCompras() {
    $("#exampleTarjeta").modal('hide');
};
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
                fnc_js_filtrarProductos();
                fnc_js_calcularTotalCarrito();
            }
        })
};
function fnc_js_cargarCarritoCompras() {
    let carrito = JSON.parse(localStorage.getItem("carrito_compras"));
    return (carrito == null) ? [] : carrito;
};
function fnc_js_cargarDataCarrito() {
    let sumatoria = 0.00;
    let resultado = '';
    carrito_compras.forEach((producto) => {
        resultado += `<tr>
                        <th scope="row">${producto.id}</th>
                        <td>${producto.title}</td>          
                        <td>$ ${producto.price.toFixed(2)}</td>          
                        <td>
                          <button href="#" class="btn btn-danger" id="btn_quitar_producto" name="btn_quitar_producto" onclick="fnc_js_quitarProductoCarrito(${producto.id})">Quitar del Carrito</button>
                        </td>          
                      </tr>`;
        sumatoria += producto.price;
    });
    let tabla_producto = document.getElementById("body_table_product");
    tabla_producto.innerHTML = resultado;
    let sumatoria_carrito = document.getElementById("sumatoria_carrito");
    sumatoria_carrito.innerText = "$ " + sumatoria.toFixed(2);
    montoTotalCompra.innerText = "$ " + sumatoria.toFixed(2);
    cantProductos.innerText = carrito_compras.length;
};
function fnc_js_quitarProductoCarrito(id) {
    Swal.fire({
            title: '¿Deseas quitar producto de tu carrito?',
            text: `Se eliminara el producto seleccionado`,
            showCancelButton: true,
            confirmButtonColor: '#008f39',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Producto eliminado',
                    '¡Se ha eliminado correctamente de su carrito!',
                    'success'
                );
                let index = carrito_compras.map(x => x.id).indexOf(id);
                if (index != -1) {
                    carrito_compras.splice(index, 1);
                    let tabla_producto = document.getElementById("body_table_product");
                    tabla_producto.innerHTML = '';
                    localStorage.setItem("carrito_compras", JSON.stringify(carrito_compras));
                    fnc_js_cargarDataCarrito();
                }
            }
        })
}
function fnc_js_procesarCompras() {
    const precioFinal = montoTotalCompra.innerText;
    // uso sweet alert para que el usuario confirme su compra, cuando toca si se
    // vacia el carrito
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
                Swal.fire('Compra confirmada', '¡Que lo disfrutes!', 'success')
                    .then(x => {
                        localStorage.removeItem("carrito_compras");
                        //Redireccionamos a una pagina de procesamiento
                        setTimeout("fnc_js_redireccionar()", 500);
                    });
            }
        })
};
function fnc_js_redireccionar() {
    window.location.href = "loader.html";
}

botonFinalizarCompra.addEventListener('click', fnc_js_procesarCompras);
botonFinalizar.addEventListener('click', fnc_js_checkOutCarritoCompras);
fnc_js_cargarDataCarrito();
