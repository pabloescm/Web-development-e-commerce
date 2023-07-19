//Formulario de productos para el admin
const tbody = document.getElementById('data-products');

//El select de agregar producto
const selectCategoria = document.getElementById("categoria");


//select de AGREGAR PRODUCTO que hace fetch a la tabla y trae las categorias para mostrarlas en el select
if (selectCategoria) {
    fetch("http://localhost:3000/categorias")
        .then(response => response.json())
        .then(result => {
            let res = `<option class="default";>Seleccione una categoria</option> `;
            for (let index = 0; index < result.length; index++) {
                res += `<option value="${result[index].id}">${result[index].nombre_de_categoria}</option>`;
            }
            selectCategoria.innerHTML = res;
        })
}

if (tbody) {
    fetch("http://localhost:3000/productos")
        .then(response => response.json())
        .then(prueba => {
            let res = "";
            //div.innerHTML=prueba.get[0];
            for (let index = 0; index < prueba.length; index++) {
                console.log(prueba[index]);
                const nombre = prueba[index].nombre;
                const precio = prueba[index].precio;
                const categoria = prueba[index].id_categoria_producto;
                const imagen = prueba[index].imagen_de_producto;
                const descripcion = prueba[index].descripcion;
                const id = prueba[index].id;
                res += `<tr>
                    <td>${nombre}</td>
                    <td>${precio}</td>
                    <td>${categoria}</td>
                    <td><img width="120px" src="http://localhost:3000/uploads/${imagen}"/></td>
                    <td>
                        <button class="btn-detalle" idProduct="${id}">Detalles</button>
                        <button class="btn-editar" idProduct="${id}">Editar</button>
                        <button class="btn-eliminar" idProduct="${id}" rutaFoto="${imagen}">Eliminar</button>
                    </td>
                </tr>`;
            }
            tbody.innerHTML = res;
        }).then(() => {

            let btnseliminar = document.getElementsByClassName("btn-eliminar");
            console.log(btnseliminar.length)
            for (let index = 0; index < btnseliminar.length; index++) {
                btnseliminar[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idProduct");
                    let ruta = e.target.getAttribute("rutaFoto");
                    borrarProducto(id, ruta)
                })
            }

            let btnsDetalles = document.getElementsByClassName("btn-detalle");

            for (let index = 0; index < btnsDetalles.length; index++) {
                btnsDetalles[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idProduct");
                    detalleProducto(id)
                })
            }

            let btnsEditar = document.getElementsByClassName("btn-editar");

            for (let index = 0; index < btnsEditar.length; index++) {
                btnsEditar[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idProduct");
                    window.location = `editar_producto.html?idProducto=${id}`;
                })
            }

        });
}

if (window.location.pathname == "/cliente/admin/editar_producto.html") {
    let params = window.location.href.split("?");
    if (params.length > 1) {
        let id = params[1].split("=")[1];
        editarProducto(id);
    }
}


const formAgregarProducto = document.getElementById('agregar-producto');

if (formAgregarProducto) {
    formAgregarProducto.addEventListener('submit', function (event) {          // Agrego un eventListener al form que se va ejecutar la funcion cuando se dispare un evento de tipo submit 

        event.preventDefault(); //previene el comportamiento por defecto para que no se actualize la pagina cuando recarge la pagina.
        const formData = new FormData();
        // Get the form data
        const nombre = document.getElementById('nombre').value;
        const des = document.getElementById('descripcion').value;
        const categoria = document.getElementById('categoria').value;
        const precio = document.getElementById('precio').value;
        const foto = document.getElementById('foto').files[0];
        formData.append('nombre', nombre);
        formData.append('descripcion', des);
        formData.append('precio', precio);
        formData.append('categoria', categoria);
        formData.append('foto', foto);

        //verify if the fields are empty
        const errorCategoria = document.getElementById('error-categoria');
        const errorNombre = document.getElementById('error-nombre');
        const errorDescripcion = document.getElementById('error-descripcion');
        const errorPrecio = document.getElementById('error-precio');
        const errorFoto = document.getElementById('error-foto');

        errorCategoria.innerText = "";
        errorNombre.innerText = "";
        errorDescripcion.innerText = "";
        errorPrecio.innerText = "";
        errorFoto.innerText = "";

        if (nombre == "") {
            /*make errorCategoria not none*/
            errorNombre.style.display = "block";
            errorNombre.innerText = "Por favor ingrese un nombre";
        }
        if (des == "") {
            errorDescripcion.style.display = "block";
            errorDescripcion.innerText = "Por favor ingrese una descripcion";
        }

        /*verify if errorPrecio is a number*/

        if (precio == "" || precio == 0 || precio < 0 || precio == undefined || precio == null || precio == NaN  || isNaN(precio)) {
            errorPrecio.style.display = "block";
            errorPrecio.innerText = "Por favor ingrese un precio";
        }
        if (foto == undefined) {
            errorFoto.style.display = "block";
            errorFoto.innerText = "Por favor ingrese una foto";
        }
        if (categoria == "Seleccione una categoria") {
            errorCategoria.style.display = "block";
            errorCategoria.innerText = "Por favor seleccione una categoria";
        }

        if (nombre == "" || des == "" || precio == "" || foto == undefined || categoria == "Seleccione una categoria" || precio == 0 || precio < 0 || precio == undefined || precio == null || precio == NaN) {
            return;
        }




        fetch("http://localhost:3000/productos", {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                //console.log(res);
                document.querySelector('#notificacion-agregar-producto>span').innerText = JSON.parse(res).message;
                const nombres = document.getElementById('nombre');
                const descripcion = document.getElementById('descripcion');
                const categorias = document.getElementById('categoria');
                const precios = document.getElementById('precio');
                const fotos = document.getElementById('foto');
                /*make nombres descripcion categorias precios fotos values empty*/
                nombres.value = "";
                descripcion.value = "";
                categorias.value = "";
                precios.value = "";
                fotos.value = "";

            })
            .catch(err => {
                console.log(err);
            })
    });
}


const formEditarProducto = document.getElementById('editar-producto');


if (formEditarProducto) {
    formEditarProducto.addEventListener('submit', function (event) {          // Agrego un eventListener al form que se va ejecutar la funcion cuando se dispare un evento de tipo submit 
        console.log("HOLA");
        event.preventDefault(); //previene el comportamiento por defecto para que no se actualize la pagina cuando recarge la pagina.

        const formData = new FormData();
        // Get the form data
        const id = document.getElementById('id').value;
        console.log(id);
        const nombre = document.getElementById('nombre').value;
        console.log(nombre);
        const des = document.getElementById('descripcion').value;
        const categoria = document.getElementById('ed_categoria').value;
        const precio = document.getElementById('precio').value;
        const rutaFoto = document.getElementById('rutaFoto').value;


        const foto = document.getElementById('foto').files[0];

        formData.append('id', id);
        formData.append('nombre', nombre);
        formData.append('descripcion', des);
        formData.append('precio', precio);
        formData.append('categoria', categoria);
        formData.append('foto', foto);
        formData.append('rutaFoto', rutaFoto);


        fetch("http://localhost:3000/productos/", {
            method: 'PUT',
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if (foto) {
                    fetch("http://localhost:3000/productos/photo/" + rutaFoto, {
                        method: 'DELETE'

                    }).then(res => {
                        console.log(res)
                    })
                }

                document.querySelector('#notificacion>span').innerText = JSON.parse(res).message;
            })
            .catch(err => {
                console.log(err);
            })
    });
}




function borrarProducto(id, ruta) {
    if (confirm("Esta seguro que desea eliminar el item")) {
        fetch(`http://localhost:3000/productos/photo/${ruta}`, { method: 'DELETE' })
            .then(response => {
                //valid the response
                console.log(response);
            })
        fetch(`http://localhost:3000/productos/${id}`, { method: 'DELETE' })
            .then(response => {
                //valid the response
                window.location = "productos.html";
            })
    }
}

function detalleProducto(id) {
    fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            const detalleTag = document.getElementById("detalle-producto");
            let res = `<p>${result.descripcion}</p>`;
            detalleTag.innerHTML = res;
        })

}

function editarProducto(id) {
    fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            const idTag = document.getElementById("id");
            const nombreTag = document.getElementById("nombre");
            const precioTag = document.getElementById("precio");
            const descripcionTag = document.getElementById("descripcion");
            const rutaFotoTag = document.getElementById("rutaFoto");
            const categoriaTag = document.getElementById("ed_categoria");

            idTag.value = result.id;
            nombreTag.value = result.nombre;
            precioTag.value = result.precio;
            descripcionTag.value = result.descripcion;
            rutaFotoTag.value = result.imagen_de_producto;


            fetch(`http://localhost:3000/categorias/${result.id_categoria_producto}`, { method: 'GET' })
                .then(response => response.json())
                .then(resultCategoria => {
                    categoriaTag.innerHTML = `<option value="${resultCategoria.id}">${resultCategoria.nombre_de_categoria}</option>`;
                })

            fetch(`http://localhost:3000/categorias`, { method: 'GET' })
                .then(response => response.json())
                .then(resultAll => {
                    for (let index = 0; index < resultAll.length; index++) {
                        if (resultAll[index].id != result.id_categoria_producto)
                            categoriaTag.innerHTML += `<option value="${resultAll[index].id}">${resultAll[index].nombre_de_categoria}</option>`;
                    }

                })

        })

}

const cerraAdmin = document.getElementById("cerrar-admin");
if (cerraAdmin) {
    console.log("hola");
    cerraAdmin.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "../index.html";
    })
}

/*
const btnGuardarProducto = document.getElementById("btn__guardar__producto");
if (btnGuardarProducto) {
    btnGuardarProducto.addEventListener("click", () => {
        window.location.href = "cliente/admin/productos.html";
    })
}*/