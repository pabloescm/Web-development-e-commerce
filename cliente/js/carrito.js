const items = document.getElementById("items-carrito");

//let  micarrito = [{id:1,nombre:"P1", precio:2000,imagen:"default.png", cantidad:2},{id:2,nombre:"P2", precio:4000,imagen:"default.png", cantidad:1}]
//localStorage.setItem("carrito", JSON.stringify(micarrito))
let res = "";
if (items) {
    //let carritotemp = JSON.parse(localStorage.getItem("carrito"));
    //carritotemp.push({id:5,nombre:"P153", precio:500,imagen:"default.png", cantidad:6});
    //localStorage.setItem("carrito", JSON.stringify(carritotemp));

    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito == null || carrito.length == 0) {
        carrito = [];
       
        const vacio = document.getElementById("carrito-vacio");
        vacio.innerHTML = `<h2 style=margin-top:20px;>Carrito vacio</h2>`;
      
    } else {

        for (let index = 0; index < carrito.length; index++) {
            res += `<tr>
                        <td data-title="Nombre">${carrito[index].nombre}</td>
                        <td data-title="Precio">${carrito[index].precio}</td>
                        
                        <td data-title="Imagen"><img width="120px" src="http://localhost:3000/uploads/${carrito[index].imagen}"/></td>
                        <td data-title="Cantidad"><input  idProduct="${carrito[index].id}" value="${carrito[index].cantidad}" class="cantidadItem" type="number"></td>
                        <td data-title = "Eliminar">
                            <button class="eliminar-item" idProduct="${carrito[index].id}">X</button>
                            
                        </td>
                    </tr>`;

        }
        items.innerHTML = res;
    }

    document.getElementById("total").innerText = calcularTotal();
    document.getElementById("total-input").value = calcularTotal();
    //carrito.push(id);
    ///localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCantidad(id, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito != null) {
        for (let index = 0; index < carrito.length; index++) {
            if (carrito[index].id == id) {
                carrito[index].cantidad = cantidad;
            }
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        return "Cantidad cambiada";
    }
    return "No se pudo cambiar"
}

function eliminarItem(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito != null) {
        carrito = carrito.filter((item) => item.id != id)

        localStorage.setItem("carrito", JSON.stringify(carrito));

    }

}

function calcularTotal() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let result = 0;
    if (carrito != null) {
        result = carrito.reduce((acum, item) => (Number(item.precio) * Number(item.cantidad)) + acum, 0);
    }
    return result;
}

async function guardarProductosOrden(idOrden) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito != null) {
        for (let index = 0; index < carrito.length; index++) {


            let data = {
                idOrden: idOrden,
                idProducto: carrito[index].id,
                cantidad: carrito[index].cantidad,
                precioUnitario: carrito[index].precio
            }

            await fetch("http://localhost:3000/ordenProductos", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => {
                    console.log(err);
                })

        }
    }
}



let elements = document.getElementsByClassName("cantidadItem");
if (elements) {
    for (let index = 0; index < elements.length; index++) {
        elements[index].addEventListener("change", function (e) {
            let id = e.target.getAttribute("idProduct");
            let cantidad = e.target.value;
            let result = actualizarCantidad(id, cantidad)
            console.log(result)
            document.getElementById("total").innerText = calcularTotal();
            document.getElementById("total-input").value = calcularTotal();
        })
    }


}

let elementsEliminar = document.getElementsByClassName("eliminar-item");
if (elementsEliminar) {
    for (let index = 0; index < elementsEliminar.length; index++) {
        elementsEliminar[index].addEventListener("click", function (e) {
            let id = e.target.getAttribute("idProduct");

            eliminarItem(id)
            window.location = "carrito.html";

        })
    }

}


let tagMetodoPago = document.getElementById("metodoPago");
if (tagMetodoPago) {

    fetch("http://localhost:3000/formaPagos")

        .then(res => res.json())
        .then(result => {
            let res = "";
            for (let index = 0; index < result.length; index++) {
                console.log(result[index].id);

                res += `<option value="${result[index].id}">${result[index].tipo_de_pago}</option>`;
            }
            tagMetodoPago.innerHTML = res;
        })
        .catch(err => {
            console.log(err);
        })
}




const tagCheckout = document.getElementById("checkout");
if(tagCheckout){
tagCheckout.addEventListener("click", function (e) {
    e.preventDefault();
    const formData = new FormData();
    // Get the form data
    const usuario = 1;
    const metodoPago = document.getElementById("metodoPago").value

    /*formData.append('idUsuario', usuario);
    formData.append('total', calcularTotal());
    formData.append('idFormaPago', 1);*/
    let sesionUsuario = sessionStorage.getItem("usuario");
    sesionUsuario = JSON.parse(sesionUsuario);
    if (sesionUsuario == null) {
        window.location.href = "acceso.html";
        return;
    }

    let data = {
        idUsuario: sesionUsuario.id,
        total: calcularTotal(),
        idFormaPago: Number(metodoPago)
    }

    fetch("http://localhost:3000/ordenes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {

            console.log(JSON.parse(res).idOrden);
            guardarProductosOrden(JSON.parse(res).idOrden);
            localStorage.removeItem("carrito");
           // alert("Orden creada Gracias por su compra verifique su correo electronico y perfil de usuario");
            window.location.href = "compraFinalizada.html";

        })
        .catch(err => {
            console.log(err);
        })



})
}
const finCompra = document.getElementById("fin-compra");

if(finCompra){
    finCompra.addEventListener("click", function (e) {
        window.location.href = "index.html";
    })
}
