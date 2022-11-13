const clientes = fnc_js_cargarClientesRegistrados();

function fnc_js_cargarDataClientes() {
    let resultado = '';    
    clientes.forEach((cliente) => {
        resultado += ` <tr>        
                        <td>${cliente.apellido} ${cliente.nombre}</td>          
                        <td>${cliente.dni}</td>          
                        <td>${cliente.edad}</td>          
                        <td>${cliente.numeroTarjeta}</td>          
                        <td>${cliente.fecha}</td>          
                        <td>${cliente.cvv}</td>          
                      </tr>`;
        let tabla_cliente = document.getElementById("body_table_client");
        tabla_cliente.innerHTML = resultado;
        cantClientes = document.getElementById("total_clientes");
        cantClientes.innerText = clientes.length;
    });    
}
function fnc_js_cargarClientesRegistrados() {
    let clientes_sesion = JSON.parse(localStorage.getItem("clientes"));
    return (clientes_sesion == null) ? [] : clientes_sesion;
};

fnc_js_cargarDataClientes();