function crearFormularioLogin(cargarContenidoPrincipal) {
    let contenedorLogin = document.createElement("section");
    contenedorLogin.className = "login-container";

    // Crear el formulario de login
    let formularioLogin = document.createElement("form");
    formularioLogin.id = "login-form";

    let grupoCorreo = document.createElement("div");
    grupoCorreo.className = "input-group";

    let labelCorreo = document.createElement("label");
    labelCorreo.htmlFor = "correo";
    labelCorreo.textContent = "Correo Electrónico";

    let inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.id = "correo";
    inputCorreo.name = "correo";
    inputCorreo.required = true;

    grupoCorreo.appendChild(labelCorreo);
    grupoCorreo.appendChild(inputCorreo);

    let grupoContraseña = document.createElement("div");
    grupoContraseña.className = "input-group";

    let labelContraseña = document.createElement("label");
    labelContraseña.htmlFor = "contraseña";
    labelContraseña.textContent = "Contraseña";

    let inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.id = "contraseña";
    inputContraseña.name = "contraseña";
    inputContraseña.required = true;

    grupoContraseña.appendChild(labelContraseña);
    grupoContraseña.appendChild(inputContraseña);

    let botonEnvio = document.createElement("button");
    botonEnvio.type = "submit";
    botonEnvio.textContent = "Ingresar";

    let botonRegistro = document.createElement("button");
    botonRegistro.type = "button";
    botonRegistro.textContent = "Registrarse";
    botonRegistro.className = "secondary-btn";
    botonRegistro.addEventListener("click", () => {
        contenedorLogin.innerHTML = '';
        contenedorLogin.appendChild(crearFormularioRegistro(cargarContenidoPrincipal));
    });

    formularioLogin.appendChild(grupoCorreo);
    formularioLogin.appendChild(grupoContraseña);
    formularioLogin.appendChild(botonEnvio);
    formularioLogin.appendChild(botonRegistro);

    formularioLogin.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const correo = inputCorreo.value.trim();
        const contraseña = inputContraseña.value.trim();

        if (!correo || !contraseña) {
            mostrarNotificacion("Por favor ingresa tu correo y contraseña", "error");
            return;
        }

        try {
            const respuesta = await fetch('http://localhost:5000/iniciar-sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, contraseña })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem('token', datos.token);
                localStorage.setItem('profesor', JSON.stringify(datos.profesor));
                mostrarNotificacion("Inicio de sesión exitoso", "éxito");
                cargarContenidoPrincipal();
            } else {
                mostrarNotificacion(datos.error || "Credenciales incorrectas", "error");
            }
        } catch (error) {
            console.error("Error en la solicitud de login:", error);
            mostrarNotificacion("Error al conectar con el servidor", "error");
        }
    });

    contenedorLogin.appendChild(formularioLogin);
    return contenedorLogin;
}

function crearFormularioRegistro(cargarContenidoPrincipal) {
    let contenedorRegistro = document.createElement("section");
    contenedorRegistro.className = "login-container";

    let formularioRegistro = document.createElement("form");
    formularioRegistro.id = "register-form";

    let grupoNombre = document.createElement("div");
    grupoNombre.className = "input-group";

    let labelNombre = document.createElement("label");
    labelNombre.htmlFor = "nombre_usuario";
    labelNombre.textContent = "Nombre de Usuario";

    let inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre_usuario";
    inputNombre.name = "nombre_usuario";
    inputNombre.required = true;

    grupoNombre.appendChild(labelNombre);
    grupoNombre.appendChild(inputNombre);

    let grupoCorreo = document.createElement("div");
    grupoCorreo.className = "input-group";

    let labelCorreo = document.createElement("label");
    labelCorreo.htmlFor = "correo";
    labelCorreo.textContent = "Correo Electrónico";

    let inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.id = "correo";
    inputCorreo.name = "correo";
    inputCorreo.required = true;

    grupoCorreo.appendChild(labelCorreo);
    grupoCorreo.appendChild(inputCorreo);

    let grupoContraseña = document.createElement("div");
    grupoContraseña.className = "input-group";

    let labelContraseña = document.createElement("label");
    labelContraseña.htmlFor = "contraseña";
    labelContraseña.textContent = "Contraseña (mínimo 8 caracteres)";

    let inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.id = "contraseña";
    inputContraseña.name = "contraseña";
    inputContraseña.required = true;
    inputContraseña.minLength = 8;

    grupoContraseña.appendChild(labelContraseña);
    grupoContraseña.appendChild(inputContraseña);

    let botonEnvio = document.createElement("button");
    botonEnvio.type = "submit";
    botonEnvio.textContent = "Registrarse";

    let botonLogin = document.createElement("button");
    botonLogin.type = "button";
    botonLogin.textContent = "Volver a Login";
    botonLogin.className = "secondary-btn";
    botonLogin.addEventListener("click", () => {
        contenedorRegistro.innerHTML = '';
        contenedorRegistro.appendChild(crearFormularioLogin(cargarContenidoPrincipal));
    });

    formularioRegistro.appendChild(grupoNombre);
    formularioRegistro.appendChild(grupoCorreo);
    formularioRegistro.appendChild(grupoContraseña);
    formularioRegistro.appendChild(botonEnvio);
    formularioRegistro.appendChild(botonLogin);

    formularioRegistro.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const nombre_usuario = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();
        const contraseña = inputContraseña.value.trim();

        if (!nombre_usuario || !correo || !contraseña) {
            mostrarNotificacion("Por favor completa todos los campos", "error");
            return;
        }

        if (contraseña.length < 8) {
            mostrarNotificacion("La contraseña debe tener al menos 8 caracteres", "error");
            return;
        }

        try {
            const respuesta = await fetch('http://localhost:5000/registrar-profesor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre_usuario, correo, contraseña })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                mostrarNotificacion("Registro exitoso. Por favor inicia sesión", "éxito");
                contenedorRegistro.innerHTML = '';
                contenedorRegistro.appendChild(crearFormularioLogin(cargarContenidoPrincipal));
            } else {
                mostrarNotificacion(datos.error || "Error en el registro", "error");
            }
        } catch (error) {
            console.error("Error en la solicitud de registro:", error);
            mostrarNotificacion("Error al conectar con el servidor", "error");
        }
    });

    contenedorRegistro.appendChild(formularioRegistro);
    return contenedorRegistro;
}

// Función auxiliar para mostrar notificaciones (debes implementarla)
function mostrarNotificacion(mensaje, tipo) {
    // Implementa tu sistema de notificaciones aquí
    alert(`${tipo.toUpperCase()}: ${mensaje}`);
}

export { crearFormularioLogin, crearFormularioRegistro };