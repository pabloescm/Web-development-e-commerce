let btnRegistrar = document.getElementById("btn__registrar__cliente");
let verificarUsuario = sessionStorage.getItem("usuario");
let mensajeVerificacion = document.getElementById("btn-verificacion");

console.log(verificarUsuario);
if (verificarUsuario != null) {

    let login = document.getElementById("login__pagina");
    login.innerHTML =
        ` <a href="carrito.html">
                <i class="fa-solid fa-right-to-bracket"></i>
                <span id="login">Mi Perfil</span>
            </a>`
}

if (btnRegistrar) {
    btnRegistrar.addEventListener("click", (e) => {
        let correo = document.getElementById("correo").value;
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let contraseña = document.getElementById("contraseña").value;
        let telefono = document.getElementById("telefono").value;
        let direccion = document.getElementById("direccion").value;


        e.preventDefault();
        validarCorreo(correo);
        validarContrasena(contraseña);
        validarTelefono(telefono);
        validarDireccion(direccion);
        validarApellido(apellido);
        validarNombre(nombre);
        validarCorreoExistente(correo);
         
        console.log(validarCorreo(correo));
        console.log(validarContrasena(contraseña));
        console.log(validarTelefono(telefono));
        console.log(validarDireccion(direccion));
        console.log(validarApellido(apellido));
        console.log(validarNombre(nombre));
        console.log(validarCorreoExistente(correo));

        if (validarCorreo(correo) && validarContrasena(contraseña) && validarTelefono(telefono) && validarDireccion(direccion) && validarApellido(apellido) && validarNombre(nombre) && validarCorreoExistente(correo)) {
            // const formData = new FormData();
            //  formData.append('correo', correo);
            // formData.append('nombre', nombre);
            //  formData.append('apellido', apellido);
            // formData.append('contraseña', contraseña);
            //  formData.append('telefono', telefono);
            //  formData.append('direccion', direccion);
            console.log(correo, nombre, apellido, contraseña, telefono, direccion);

            fetch("http://localhost:3000/usuarios", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: correo, nombre: nombre, apellido: apellido, contraseña: contraseña, telefono: telefono, direccion: direccion }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                })

                .catch(err => {
                    console.log(err);
                })

            // alert("Usuario registrado con exito");
            // window.location.href = "acceso.html";
            window.location.href = "verificacionRegistro.html";
        } else {
            console.log("error");
            return;
        }
    });

}
if (mensajeVerificacion) {
    mensajeVerificacion.addEventListener("click", (e) => {
        window.location.href = "acceso.html";
    })
}




function validarCorreo(correo) {
    let verificacionCorreo = document.getElementById("verificacion__correo");
    //exprecion para verificar que el campo contenga @ y .
    let expresion = /\w+@\w+\.+[a-z]/;
    if (correo != "") {
        if (!expresion.test(correo)) {
            verificacionCorreo.innerHTML = "El correo no es valido";
            verificacionCorreo.style.display = "block";
            return false;
        } else {
            verificacionCorreo.style.display = "none";
            return true;
        }
    } else {
        verificacionCorreo.innerHTML = "El campo correo no puede estar vacio";
        verificacionCorreo.style.display = "block";
        return false;
    }
}

function validarTelefono(telefono) {
    let verificacionTelefono = document.getElementById("verificacion__telefono");
    //expresion para verificar que el campo contenga entre 7 y 10 numeros 
    let expresion = /^\d{7,10}$/;
    if (telefono != "") {
        if (!expresion.test(telefono)) {
            verificacionTelefono.innerHTML = "El telefono debe contener entre 7 y 10 numeros";
            verificacionTelefono.style.display = "block";
            return false;
        } else {
            verificacionTelefono.style.display = "none";
            return true;
        }
    } else {
        verificacionTelefono.innerHTML = "El campo telefono no puede estar vacio";
        verificacionTelefono.style.display = "block";
        return false;
    }
}

function validarContrasena(contrasena) {

    let verificacionContrasena = document.getElementById("verificacion__contraseña");
    //expresion para verificar que el campo contenga entre 5 y 10 caracteres, al menos un digito y al menos una mayuscula
    let expresion = /^(?=\w*\d)(?=\w*[A-Z])\S{5,10}$/;
    if (contrasena != "") {
        if (!expresion.test(contrasena)) {
            verificacionContrasena.innerHTML = "La contraseña debe contener entre 5 y 10 caracteres, al menos un digito y al menos una mayuscula";
            verificacionContrasena.style.display = "block";
            return false;
        } else {
            verificacionContrasena.style.display = "none";
            return true;
        }
    } else {
        verificacionContrasena.innerHTML = "El campo contraseña no puede estar vacio";
        verificacionContrasena.style.display = "block";
        return false;
    }

}

function validarDireccion(direccion) {
    let verificacionDireccion = document.getElementById("verificacion__direccion");
    if (direccion != "") {
        verificacionDireccion.style.display = "none";
        return true;
    } else {
        verificacionDireccion.innerHTML = "El campo direccion no puede estar vacio";
        verificacionDireccion.style.display = "block";
        return false;
    }
}

function validarNombre(nombre) {
    let verificacionNombre = document.getElementById("verificacion__nombre");
    if (nombre != "") {
        verificacionNombre.style.display = "none";
        return true;
    } else {
        verificacionNombre.innerHTML = "El campo nombre no puede estar vacio";
        verificacionNombre.style.display = "block";
        return false;
    }
}

function validarApellido(apellido) {
    let verificacionApellido = document.getElementById("verificacion__apellido");
    if (apellido != "") {
        verificacionApellido.style.display = "none";
        return true;
    } else {
        verificacionApellido.innerHTML = "El campo apellido no puede estar vacio";
        verificacionApellido.style.display = "block";
        return false;
    }
}

//validar si el correo ya existe en la base de datos
/*
function validarCorreoExistente(correo) {
    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(res => {
            let correoExistente = res.find(usuario => usuario.correo == correo);
            console.log("correo existente " + correoExistente);
            if (typeof correoExistente !== "undefined" ) {
                let verificacionCorreo = document.getElementById("verificacion__correo");
                verificacionCorreo.innerHTML = "El correo ya existe";   
                verificacionCorreo.style.display = "block";
                return false;
            } else {
                return true;

            }
        })
        .catch(err => {
            console.log(err);
            

        })
}
*/
async function validarCorreoExistente(correo) {
    try {
        const response = await fetch("http://localhost:3000/usuarios");
        const usuarios = await response.json();
        const correoExistente = usuarios.find(usuario => usuario.correo === correo);

        if (typeof correoExistente !== "undefined") {
            let verificacionCorreo = document.getElementById("verificacion__correo");
            verificacionCorreo.innerHTML = "El correo ya existe";
            verificacionCorreo.style.display = "block";
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false; // Return false in case of any error during the fetch request
    }
}



let verificarUsuarioLogo = sessionStorage.getItem("usuario");
console.log(verificarUsuarioLogo);
if (verificarUsuarioLogo != null) {

    let login = document.getElementById("login__pagina");
    login.innerHTML =
        ` <a href="perfil.html">
        <i class="fa-solid fa-user"></i>
            <span id="login">Mi Perfil</span>
        </a>`
}