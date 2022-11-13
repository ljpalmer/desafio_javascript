//Variables globales para la busqueda
const texto_buscar = document.getElementById("texto_buscar");
//Agregamos el evento fnc_js_filtrarProductos a la caja de texto de busqueda en el evento keyup
texto_buscar.addEventListener('keyup', fnc_js_filtrarProductos);

//Llamamos la funciones para iniciar la pagina del carrito
fnc_js_filtrarProductos();
fnc_js_calcularTotalCarrito();