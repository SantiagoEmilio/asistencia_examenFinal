import { crearFormularioLogin } from "./componentes/login/login.js"; // Asegúrate de importar correctamente

// Función para cargar el contenido principal
async function cargarContenidoPrincipal() {
    let DOM = document.getElementById("root");
    DOM.innerHTML = ""; // Limpiar contenido actual
    console.log('Cargando header...');
    DOM.appendChild(crearHeader());
    console.log('Cargando formulario...');
    const formularioElement = await formulario();
    DOM.appendChild(formularioElement); // Asegurarte de que se espera correctamente el formulario
    console.log('Cargando formulario de tarea...');
    DOM.appendChild(crearFormularioTarea());
}

// Función que maneja la carga del formulario de login
function cargarDOM() {
    let DOM = document.getElementById("root");
    console.log('Cargando formulario de login...');
    const formularioLogin = crearFormularioLogin(cargarContenidoPrincipal); // Pasar la función como parámetro
    DOM.appendChild(formularioLogin);
}

// Ejecutar la carga inicial
cargarDOM();