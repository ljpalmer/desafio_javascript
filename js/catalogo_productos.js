//Datos obtenidos del api -> https://dummyjson.com/products
const productos = []
const urlProductosJSON = '../js/json/productos.json';

fetch(urlProductosJSON)
.then((response)=> response.json())
.then((data) => {
    data.forEach((producto) => {
        productos.push(producto)
    });
}).catch((error) => console.log(error))
  .finally(() => fnc_js_filtrarProductos());

//funcion para filtrar los productos
function fnc_js_filtrarProductos(){    
    const resultado = document.getElementById("resultado");
    let resultadoHTML ='';
    let texto = texto_buscar.value.toLowerCase();    
    productos.forEach(producto => {
        let nombre = producto.title.toLowerCase();
        if (nombre.indexOf(texto) !== -1){       
            let index = carrito_compras.map(x => x.id).indexOf(producto.id);           
            if(index==-1){
                resultadoHTML += `
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
    });
    resultado.innerHTML = resultadoHTML;
};