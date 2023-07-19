const tbody = document.getElementById('data-categoria');


if (tbody) {
    fetch("http://localhost:3000/categorias")
        .then(response => response.json())
        .then(prueba => {
            let res = "";

            for (let index = 0; index < prueba.length; index++) {
                const id = prueba[index].id;
                const nombre = prueba[index].nombre_de_categoria;
                res += `<tr>
                    <td>${index + 1}</td>
                    <td>${nombre}</td>
                    <td>
                        <button class="btn-editar" idCategoria="${id}">editar</button>
                        <button class="btn-eliminar" idCategoria="${id}">eliminar</button>
                    </td>
                </tr>`;



            }
            tbody.innerHTML = res;
        }).then(() => {

            let btnseliminar = document.getElementsByClassName("btn-eliminar");
            console.log(`cantidad de categorias :${btnseliminar.length}`)
            for (let index = 0; index < btnseliminar.length; index++) {
                btnseliminar[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idCategoria");
                    borrarCategoria(id)
                })
            }



            let btnsEditar = document.getElementsByClassName("btn-editar");

            for (let index = 0; index < btnsEditar.length; index++) {
                btnsEditar[index].addEventListener('click', (e) => {
                    let id = e.target.getAttribute("idCategoria");
                    window.location = `editar_Categoria.html?idCategoria=${id}`;
                })
            }

        });
}

if (window.location.pathname == "/cliente/editar_categoria.html") {
    let params = window.location.href.split("?");
    if (params.length > 1) {
        let id = params[1].split("=")[1];
        //editarProducto(id);
    }
}

const formAgregarCategoria = document.getElementById('agregar-categoria');

if (formAgregarCategoria) {
    formAgregarCategoria.addEventListener('submit', function (event) {          // Agrego un eventListener al form que se va ejecutar la funcion cuando se dispare un evento de tipo submit 
        let confirmacion = document.getElementById('confirmacion');
        confirmacion.innerText = "";
        event.preventDefault(); //previene el comportamiento por defecto para que no se actualize la pagina cuando recarge la pagina.

        let nombre = document.getElementById('nombre').value;

        if (nombre && !(/\d/.test(nombre.trim()))) {
            let categoria = {
                nombre: nombre
            }

            fetch("http://localhost:3000/categorias", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoria)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);

                    confirmacion.innerText = res.message;
                })
        } else {

            confirmacion.innerText = "Nombre no valido";
        }
    });

}


function borrarCategoria(id) {
    if (confirm("Esta seguro que desea eliminar el item")) {
        fetch(`http://localhost:3000/categorias/${id}`, { method: 'DELETE' })
            .then(response => {
                //valid the response
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }
}