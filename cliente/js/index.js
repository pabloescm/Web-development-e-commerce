const navTipos = document.getElementById("nav-tipos")
if (navTipos) {
    fetch("http://localhost:3000/categorias")
        .then(response => response.json())
        .then(result => {
            let res = "";
            for (let index = 0; index < result.length; index++) {

                // res += `<li><a href="productos.html?tipo=${result[index].id}">${result[index].nombre_de_categoria}</a></li>`;
                res += `<li><a href="productos.html?tipo=${result[index].id}?nombre=${result[index].nombre_de_categoria}">${result[index].nombre_de_categoria}</a></li>`;
            }
            navTipos.innerHTML += res;
        })
}





if (window.location.pathname == "/cliente/productos.html") {
    /*  let params = window.location.href.split("?");
      if (params.length > 1) {
          let idTipo = params[1].split("=")[1];
          mostrarTipoProducto(idTipo);
      }*/
    let params = window.location.href.split("?");
    if (params.length > 1) {
        // let sinEspacion = params[1].split("%20");
        let idTipo = params[1].split("=")[1];
        let nombreTipo = params[2].split("=")[1];

        mostrarTipoProducto(idTipo, nombreTipo);
    }

}

if (window.location.pathname == "/cliente/producto.html") {
    let params = window.location.href.split("?");
    if (params.length > 1) {
        let id = params[1].split("=")[1];
        detalleProducto(id);
    }
}



//MOSTRAR LOS ULTIMOS 3 PRODUCTOS EN EL INDEX//
if (window.location.pathname == "/cliente/index.html") {


    fetch("http://localhost:3000/productos")
        .then(response => response.json())
        .then(prueba => {
            let res = "";

            if (prueba.length < 3) {
                for (let index = 0; index < prueba.length; index++) {
                    console.log(prueba[index]);
                    const nombre = prueba[index].nombre;
                    const precio = prueba[index].precio;
                    const categoria = prueba[index].id_categoria_producto;
                    const imagen = prueba[index].imagen_de_producto;
                    const descripcion = prueba[index].descripcion;
                    const id = prueba[index].id;
                    console.log(categoria)

                    res += `<article class="muestras-uno-item">
            <h2><a href="producto.html?idProducto=${id}">${nombre}</a></h2>
            <figure>
                <img src="http://localhost:3000/uploads/${imagen}" alt="">
                <figcaption>
                    <p>${precio}</p>
                </figcaption>
            </figure>
        </article>`

                }
            } else {
                for (let index = prueba.length - 1; index > prueba.length - 4; index--) {
                    console.log(prueba[index]);
                    const nombre = prueba[index].nombre;
                    const precio = prueba[index].precio;
                    const categoria = prueba[index].id_categoria_producto;
                    const imagen = prueba[index].imagen_de_producto;
                    const descripcion = prueba[index].descripcion;
                    const id = prueba[index].id;
                    console.log(categoria)

                    res += `<article class="muestras-uno-item">
            <h2><a href="producto.html?idProducto=${id}">${nombre}</a></h2>
            <figure>
                <img src="http://localhost:3000/uploads/${imagen}" alt="">
                <figcaption>
                    <p>$${precio}</p>
                </figcaption>
            </figure>
        </article>`

                }
            }
            let section = document.getElementsByClassName("muestras-uno");
            console.log(section);
            section[0].innerHTML = res;

        })

    //hacer fecth para mostrar los 2 productos mas vendidos//
    fetch("http://localhost:3000/productos/masVendido")
        .then(response => response.json())
        .then(prueba => {
            let res = "";

            for (let index = 0; index < prueba.length; index++) {
                console.log(prueba[index]);
                const nombre = prueba[index].nombre;
                const precio = prueba[index].precio;
                const categoria = prueba[index].id_categoria_producto;
                const imagen = prueba[index].imagen_de_producto;
                const descripcion = prueba[index].descripcion;
                const id = prueba[index].id;
                console.log(categoria)

                res += `<article class="muestras-dos-item">
            <h2><a href="producto.html?idProducto=${id}">${nombre}</a></h2>
            <figure>
                <img src="http://localhost:3000/uploads/${imagen}" alt="">
                <figcaption>

                    <p>$${precio}</p>
                </figcaption>
            </figure>
        </article>`

            }
            let sectionDos = document.getElementsByClassName("muestras-dos");

            sectionDos[0].innerHTML = res;

        })


    let verificarUsuario = sessionStorage.getItem("usuario");

    if (verificarUsuario != null) {

        let login = document.getElementById("login__pagina");
        let logOut = document.getElementById("register-pagina");
        console.log(login);
        console.log(logOut);
        login.innerHTML =
            ` <a href="perfil.html">
                <i class="fa-solid fa-user"></i>
                    <span id="login">Mi Perfil</span>
                </a>`

        logOut.innerHTML =
            `<a href="index.html" id="register-pagina">
                <i class="fa-solid fa-sign-out"></i>
                    <span id="register">Log Out</span>
                </a>`

        logOut.addEventListener("click", function () {

            sessionStorage.clear();
        })
    }
}



//FUNCION PARA MOSTRAR LOS PRODUCTOS DE UNA CATEGORIA//
function mostrarTipoProducto(idCategoria, nombreCategoria) {

    const tituloCategoria = document.getElementById("nombre__categoria");
    /*verifico si nombre de categoria tiene mas de una palabra o espacio*/
    if (nombreCategoria.includes("%20") == true) {
        nombreCategoria = nombreCategoria.replace(/%20/g, " ");
    }
    tituloCategoria.innerHTML = `Catalogo de : ${nombreCategoria}`
    fetch("http://localhost:3000/productos/categoria/" + idCategoria)
        .then(response => response.json())
        .then(prueba => {
            let res = "";
            //div.innerHTML=prueba.get[0];
            for (let index = 0; index < prueba.length; index++) {

                const nombre = prueba[index].nombre;
                const precio = prueba[index].precio;
                const categoria = "categoriatest";
                const imagen = prueba[index].imagen_de_producto;
                const descripcion = prueba[index].descripcion;
                const id = prueba[index].id;
                console.log(prueba[index])

                res += `<article class="catalogo-item">
                <p class="nombre__producto">
                    <a href="producto.html?idProducto=${id}" id="articulo-uno">${nombre}</a>
                </p>
                <figure>
                    <img src="http://localhost:3000/uploads/${imagen}" alt="">
                    <figcaption>
                        <p>$${precio}</p>
                    </figcaption>
                </figure>
            </article>`

            }

            document.getElementById('mostrar-productos').innerHTML = res;

        })
}


//FUNCION PARA MOSTRAR EL DETALLE DE UN PRODUCTO//
function detalleProducto(id) {
    let nombre = "";
    let idP = "";
    let precio = 0;
    let imagen = "";

    fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            nombre = result.nombre;
            precio = result.precio;
            idP = result.id;
            imagen = result.imagen_de_producto;
            const detalleTag = document.getElementById("detalle-producto");
            const nombreDeProducto = document.getElementById("nombre__de__producto");
            nombreDeProducto.innerHTML = result.nombre;
            let res =

                ` <figure class="contenedor__imagen__producto">
                <img src="http://localhost:3000/uploads/${result.imagen_de_producto}" alt="">
                <figcaption>
                    <p>$ ${result.precio}</p>
                </figcaption>
            </figure>
            <div class="contenedor__titulo__descripcion">
            <span class="titulo__descripcion">Descripcion:</span>
            </div>        
            <div class="descripcion">
            <p>${result.descripcion}</p>
            </div> `

            detalleTag.innerHTML = res;


        })

        .then(() => {

            let btnCarrito = document.getElementById("btn__carrito");
            btnCarrito.addEventListener("click", function () {
                let carrito = JSON.parse(localStorage.getItem("carrito"));
                if (carrito == null) {
                    carrito = [];
                }
                let myItem = { id: idP, nombre: nombre, precio: precio, imagen: imagen, cantidad: 1 }
                let buscar = buscarItem(idP);

                if (!buscar) {
                    carrito.push(myItem);

                } else {
                    for (let index = 0; index < carrito.length; index++) {
                        if (carrito[index].id == idP) {
                            carrito[index].cantidad = Number(carrito[index].cantidad) + 1;
                        }
                    }
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                location.href = "productoACarrito.html";
            })
            //alert("Producto agregado al carrito :" +nombre);


        })

    let verificarUsuario = sessionStorage.getItem("usuario");
    if (verificarUsuario != null) {

        let login = document.getElementById("login__pagina");
        let logOut = document.getElementById("register-pagina");
        console.log(login);
        console.log(logOut);
        login.innerHTML =
            ` <a href="perfil.html">
            <i class="fa-solid fa-user"></i> 
                <span id="login">Mi Perfil</span>
            </a>`

        logOut.innerHTML =
            `<a href="index.html" id="register-pagina">
            <i class="fa-solid fa-sign-out"></i>
                <span id="register">Log Out</span>
            </a>`

        logOut.addEventListener("click", function () {

            sessionStorage.clear();
        })

    }
}

const btnSeguirComprando = document.getElementById("btn__comprar");
if (btnSeguirComprando) {
    btnSeguirComprando.addEventListener("click", function () {
        location.href = "index.html";
    })
}

const btnPagar = document.getElementById("btn__pagar");
if (btnPagar) {
    btnPagar.addEventListener("click", function () {
        location.href = "carrito.html";
    })
}


function buscarItem(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let result = "";
    if (carrito != null) {
        result = carrito.find((item) => item.id == id)
        console.log(result)
    }
    return result;
}

