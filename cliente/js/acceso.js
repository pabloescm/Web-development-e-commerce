let login = document.getElementById("btn__login");
console.log(login);
login.addEventListener("click", e => {
    e.preventDefault();
    let correo = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contraseña").value;


    fetch("http://localhost:3000/usuarios")
        .then(response => response.json())
        .then(result => {
            let res = "";
            for (let index = 0; index < result.length; index++) {
                console.log(result[index]);
                const id = result[index].id;
                const correoUsuario = result[index].correo;
                const contraseñaUsuario = result[index].contraseña;
                const nombre = result[index].nombre;
                const apellido = result[index].apellido;
                const telefono = result[index].telefono;
                const direccion = result[index].direccion;
                const admin = result[index].isadmin;
                console.log("admin es: " + admin);


                if (correoUsuario == correo && contraseñaUsuario == contrasena) {
                    let usuario = {
                        id: id,
                        correo: correoUsuario,
                        contraseña: contraseñaUsuario,
                        telefono: telefono,
                        direccion: direccion,
                        nombre: nombre,
                        apellido: apellido,
                        admin: admin

                    }
                    sessionStorage.setItem("usuario", JSON.stringify(usuario));
                    if (admin) {
                        window.location.href = "admin/indexAdmin.html";
                        return;
                    }
                    window.location.href = "index.html";
                    return;
                }
            }

            let mensajeError = document.getElementById("mensaje__error");
            mensajeError.innerHTML = "Usuario o contraseña incorrectos";
            mensajeError.style.display = "block";
            mensajeError.style.color = "red";
            mensajeError.style.padding = "10px";
            mensajeError.style.marginTop = "10px";
            mensajeError.style.fontSize = "12px";




        });
});



