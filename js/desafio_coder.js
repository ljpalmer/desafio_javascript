//Variables globales para la busqueda
const texto_buscar = document.getElementById("texto_buscar");
const boton_iniciar_sesion = document.getElementById("boton_iniciar_sesion");
//Agregamos el evento fnc_js_filtrarProductos a la caja de texto de busqueda en el evento keyup
texto_buscar.addEventListener('keyup', fnc_js_filtrarProductos);
boton_iniciar_sesion.addEventListener('click', fnc_js_pedirNombreCliente);

//Llamamos la funciones para iniciar la pagina del carrito
fnc_js_filtrarProductos();
fnc_js_pedirNombreCliente();
fnc_js_calcularTotalCarrito();