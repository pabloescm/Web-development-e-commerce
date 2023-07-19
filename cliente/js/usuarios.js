
const tbody = document.getElementById('data-usuarios');
if (tbody) {
    fetch("http://localhost:3000/usuarios")
        .then(response => response.json())
        .then(prueba => {
            let res = "";
            //div.innerHTML=prueba.get[0];
            for (let index = 0; index < prueba.length; index++) {
                console.log(prueba[index]);
                const nombre = prueba[index].nombre;
                const apellido = prueba[index].apellido;
                const direccion = prueba[index].direccion;
                const telefono = prueba[index].telefono;
                const correo = prueba[index].correo;

                const id = prueba[index].id;
                res += `<tr>
                    <td>${nombre}</td>
                    <td>${apellido}</td>
                    <td>${correo}</td>
                    <td>${direccion}</td>
                    <td>${telefono}</td>
                   
                    <td>
                        <button class="btn-ordenes" idUsuario="${id}">Ordenes</button>
                        <button class="btn-editar" idUsuario="${id}">Editar</button>
                        <button class="btn-eliminar" idUsuario="${id}" >Eliminar</button>
                    </td>
                </tr>`;



            }
            tbody.innerHTML = res;
        }).then(() => {

            let btnseliminar = document.getElementsByClassName("btn-eliminar");
            console.log(btnseliminar.length)
            for (let index = 0; index < btnseliminar.length; index++) {
                btnseliminar[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idUsuario");

                    //borrarUsuario(id, ruta)
                })
            }

            let btnsOrdenes = document.getElementsByClassName("btn-ordenes");
            let noOrden = document.getElementById("noOrden");
            for (let index = 0; index < btnsOrdenes.length; index++) {
                btnsOrdenes[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idUsuario");
                    let productos = document.getElementById("productos");
                    /*show in the table with id productos all the orders of the user with id = id*/
                    fetch("http://localhost:3000/ordenes/usuario/" + id)
                        .then(response => response.json())
                        .then(prueba => {
                            console.log(prueba.length);
                            let res = "";
                            let previousId = null;
                            let currentTable = null;
                            if (prueba.length != 0) {
                                for (let index = 0; index < prueba.length; index++) {
                                    const id = prueba[index].id;
                                    const fechaOrden = prueba[index].fecha_orden;
                                    const nombreProducto = prueba[index].nombre;
                                    const cantidad = prueba[index].cantidad;
                                    const precio = prueba[index].precio;
                                    var date = new Date(fechaOrden);
                                    var dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                    let total = precio * cantidad;



                                    if (previousId != id) {
                                        if (previousId != null) {
                                            currentTable += "</table>";
                                            res += currentTable;
                                        }
                                        previousId = id;
                                        currentTable = `<table class= tabla-orden-usuario>
                                    <tr>
                                        <th>Orden Nº</th>
                                        <th>Fecha</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr>
                                        <td>${id}</td>
                                        <td>${dateFormat}</td>
                                        <td>${nombreProducto}</td>
                                        <td>${cantidad}</td>
                                        <td>${precio}</td>
                                        <td>${total}</td>
                                    </tr>`;
                                    } else {
                                        currentTable += `<tr>
                                    <td>${id}</td>
                                    <td>${dateFormat}</td>
                                    <td>${nombreProducto}</td>
                                    <td>${cantidad}</td>
                                    <td>${precio}</td>
                                    <td>${total}</td>
                                </tr>`;
                                    }
                                }
                                currentTable += "</table>";
                                res += currentTable;
                                productos.innerHTML = res;





                            }

                            if (prueba.length == 0) {

                                noOrden.innerHTML = "Este usuario no tiene ordenes asociadas";
                                noOrden.style.display = "block";



                                productos.style.display = "none";
                            } else {

                                productos.style.display = "block";
                                noOrden.innerHTML = "";


                            }

                        })

                })
            }

            let btnsEditar = document.getElementsByClassName("btn-editar");

            for (let index = 0; index < btnsEditar.length; index++) {
                btnsEditar[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idUsuario");
                    //window.location = `editar_producto.html?idProducto=${id}`;
                })
            }

        });
}



const tagInfoPerfil = document.getElementById('info-perfil');
if (tagInfoPerfil) {
    let sesionUsuario = sessionStorage.getItem("usuario");
    sesionUsuario = JSON.parse(sesionUsuario);
    let userId;
    if (sesionUsuario && sesionUsuario.id) {
        userId = sesionUsuario.id;

    } else {
        console.log("No se encuentra la propiedad 'id'");
    }
    if (sesionUsuario == null) {
        window.location.href = "acceso.html";
        console.log("no sesion")
    }


    document.getElementById("correo").value = sesionUsuario.correo;
    //  document.getElementById("contrasena").value = sesionUsuario.contraseña;
    document.getElementById("nombre").value = sesionUsuario.nombre;
    document.getElementById("direccion").value = sesionUsuario.direccion;
    document.getElementById("telefono").value = sesionUsuario.telefono;
    document.getElementById("apellido").value = sesionUsuario.apellido;
    tagInfoPerfil.addEventListener("submit", (e) => {
        e.preventDefault();
        let sesionUsuario = sessionStorage.getItem("usuario");
        sesionUsuario = JSON.parse(sesionUsuario);
        if (sesionUsuario == null) {
            window.location.href = "acceso.html";
            console.log("no sesion")
        }
        let id = userId;
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let direccion = document.getElementById("direccion").value;
        let telefono = document.getElementById("telefono").value;
        let correo = document.getElementById("correo").value;
        //   let contraseña = document.getElementById("contrasena").value;
        let usuario = {
            id: id,
            correo: correo,
            telefono: telefono,
            //   contraseña: contraseña,
            direccion: direccion,
            nombre: nombre,
            apellido: apellido
        }
        fetch("http://localhost:3000/usuarios/", {
            method: 'PUT',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                alert("Usuario actualizado correctamente");
                sessionStorage.setItem("usuario", JSON.stringify(usuario));
                document.getElementById("correo").value = sesionUsuario.correo;
                //   document.getElementById("contrasena").value = sesionUsuario.contraseña;
                document.getElementById("nombre").value = sesionUsuario.nombre;
                document.getElementById("direccion").value = sesionUsuario.direccion;
                document.getElementById("telefono").value = sesionUsuario.telefono;
                document.getElementById("apellido").value = sesionUsuario.apellido;
                window.location.href = "perfil.html";

            })
    })
}

const cerrarSesion = document.getElementById("btn-cerrarSesion");

if (cerrarSesion) {
    cerrarSesion.addEventListener('click', (e) => {
        sessionStorage.clear();
        window.location.href = "acceso.html";
    })
}



const tagItems = document.getElementById("historial__compras")

if (tagItems) {
    let sesionUsuario = sessionStorage.getItem("usuario");
    sesionUsuario = JSON.parse(sesionUsuario);
    if (sesionUsuario == null) {
        window.location.href = "acceso.html";
        console.log("no sesion")
    }
    fetch("http://localhost:3000/ordenes/usuario/" + sesionUsuario.id)
        .then(response => response.json())
        .then(prueba => {
            let previousId = null;
            let currentTable = null;

            for (let index = 0; index < prueba.length; index++) {
                const nombre = prueba[index].nombre;
                const precio = prueba[index].precio;
                const cantidad = prueba[index].cantidad;
                const fechaOrden = prueba[index].fecha_orden;
                const imagen = prueba[index].imagen_de_producto;
                const tipoPago = prueba[index].tipo_de_pago;
                const id = prueba[index].id;
                console.log("id" + id);
                var date = new Date(fechaOrden);
                var dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

                //create a new table for every diferent id
                if (previousId != id) {
                    currentTable = document.createElement("table");
                    currentTable.className = "table";

                    currentTable.innerHTML = `
            <thead>
                <tr> 
                <th data-title="orden" colspan="6" > Orden : ${id}</th>
                </tr>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Fecha de orden</th>
                <th scope="col">Imagen</th>
                <th scope="col">Tipo de pago</th>
                </tr>
            </thead>
            <tbody></tbody>
            `;
                    //agrego la tabla al section
                    currentTable.querySelector("tbody").innerHTML += `
            <tr
            <td></td>
                <td data-title="Nombre">${nombre}</td>
                <td data-title="Precio">${precio}</td>
                <td data-title="Cantidad">${cantidad}</td>
                <td data-title="Fecha">${dateFormat}</td>
                <td data-title="Imagen"><img src="http://localhost:3000/uploads/${imagen}" alt="imagen de producto" width="100px"></td>
                <td data-title="Tipo de pago">${tipoPago}</td>    
            </tr>
            `;

                    previousId = id;

                    tagItems.appendChild(currentTable);
                } else {
                    //agrergar filas y datos a la tabla
                    currentTable.querySelector("tbody").innerHTML += `
            <tr>
           
                <td data-title="Nombre">${nombre}</td>
                <td data-title="Precio">${precio}</td>
                <td data-title="Cantidad" >${cantidad}</td>
                <td data-title="Fecha">${dateFormat}</td>
                <td data-title="Imagen"><img src="http://localhost:3000/uploads/${imagen}" alt="imagen de producto" width="100px"></td>
                <td data-title="Tipo de pago">${tipoPago}</td>
            </tr>
            `;
                }
            }
            if (prueba.length == 0) {
                const mensajeSinCompras = document.getElementById("mensaje__sin__compras");
                mensajeSinCompras.innerHTML = `<h2>Aun no tiene compras realizadas </h2>`
                /*  tagItems.innerHTML = `<h2>Aun no tiene </h2>`*/
            }
        });

}







/*
const tagItems = document.getElementById("items-comprados")
if (tagItems) {
    console.log("Hola estoy en items comprados");
    let sesionUsuario = sessionStorage.getItem("usuario");
    sesionUsuario = JSON.parse(sesionUsuario);
    if (sesionUsuario == null) {
        window.location.href = "acceso.html";
        console.log("no sesion")
    }
    fetch("http://localhost:3000/ordenes/usuario/" + sesionUsuario.id)
        .then(response => response.json())
        .then(prueba => {
            let res = "";
            console.log(prueba);
            for (let index = 0; index < prueba.length; index++) {

                const nombre = prueba[index].nombre;
                const precio = prueba[index].precio;
                const cantidad = prueba[index].cantidad;
                const fechaOrden = prueba[index].fecha_orden;
                const imagen = prueba[index].imagen_de_producto;
                const tipoPago = prueba[index].tipo_de_pago;
                var date = new Date(fechaOrden);
                var dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()


                const id = prueba[index].id;
                res += `<tr>
                    <td>${nombre}</td>
                    <td><img width="120px" src="http://localhost:3000/uploads/${imagen}"/></td>
                    <td>${precio}</td>
                    <td>${cantidad}</td>
                    <td>${tipoPago}</td>
                    <td>${dateFormat}</td>
                </tr>`;
            }
            tagItems.innerHTML = res;
        })

}

*/









/*
const tagEditar = document.getElementById("editar-perfil")
tagEditar.addEventListener("click", (e) => {
    let sesionUsuario = sessionStorage.getItem("usuario");
    sesionUsuario = JSON.parse(sesionUsuario);
    console.log(sesionUsuario)
    if (sesionUsuario == null) {
        window.location.href = "acceso.html";

    }

    let myform = `<form id="form-perfil">
                    <input type="hidden" id="idUsuario" value="${sesionUsuario.id}">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" value="${sesionUsuario.nombre}">
                    <label for="apellido">Apellido</label>
                    <input type="text" id="apellido" value="${sesionUsuario.apellido}">
                    <label for="contraseña">Contraseña</label>
                    <input type="password" id="contraseña" value="${sesionUsuario.contraseña}">
                    <label for="correo">Correo</label>
                    <input type="email" id="correo" value="${sesionUsuario.correo}">
                    <label for="direccion">Dirección</label>
                    <input type="text" id="direccion" value="${sesionUsuario.direccion}"> 
                    <label for="telefono">Telefono</label>
                    <input type="number" id="telefono" value="${sesionUsuario.telefono}">
                    <input type="submit" value="Actualizar" id="actualizar-perfil">
                </form>`;

    document.getElementById("formulario-actualizar").innerHTML = myform;
    //let formulario = document.getElementById("form-perfil");


    // formulario.addEventListener("submit", actualizarUsuario(e))

    document.getElementById('actualizar-perfil').addEventListener('click', (e) => {
        e.preventDefault();
    
        const nombre = document.getElementById('nombre').value;
      //  const id = document.getElementById("idUsuario").value;
        const apellido = document.getElementById('apellido').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const pass = document.getElementById('contraseña').value;
        let sesionUsuario = sessionStorage.getItem("usuario");
        sesionUsuario = JSON.parse(sesionUsuario);
        let usuario = {
            id: sesionUsuario.id,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            telefono: telefono,
            correo: correo, 
            contraseña: pass
        }
       //fetch to usuarios end point with put
         fetch("http://localhost:3000/usuarios/", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    alert("Usuario actualizado correctamente");
                    window.location.href = "perfil.html";
                } else {
                    alert("Error al actualizar el usuario");
                }
            })
            .catch(err => console.log(err));
    })

})
 



//const formEditarUsuario = document.getElementById('actualizar-perfil');


function actualizarUsuario(event) {

    event.preventDefault();

    // const formData = new FormData();
    // Get the form data


    const nombre = document.getElementById('nombre').value;
    const id = document.getElementById("idUsuario").value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const pass = document.getElementById('contraseña').value;




    let usuario = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        contraseña: pass
    }

    fetch("http://localhost:3000/usuarios/", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)

    })
        .then(res => res.json())
        .then(res => {


            document.querySelector('#notificacion>span').innerText = JSON.parse(res).message;
        })
        .catch(err => {
            console.log(err);
        })

    //window.location.href = "perfil.html";
    //window.location.reload();
    //change session values
    let sesionUsuario = sessionStorage.getItem("usuario");
    sesionUsuario = JSON.parse(sesionUsuario);
    sesionUsuario.nombre = nombre;
    sesionUsuario.apellido = apellido;
    sesionUsuario.direccion = direccion;        
    sesionUsuario.telefono = telefono;
    sesionUsuario.correo = correo;
    sesionUsuario.contraseña = pass;
    sessionStorage.setItem("usuario", JSON.stringify(sesionUsuario));
  //  window.location.reload();

}*/

