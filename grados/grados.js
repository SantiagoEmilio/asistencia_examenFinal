import { obtenergrados } from "./obtenergrados.js";

export async function grados() {
    let contenedor = document.createElement("section");
    contenedor.className = "seccion-grados";

    try {
        let listaGrados = await obtenergrados();

        // Verificar si la lista de grados está vacía
        if (listaGrados.length === 0) {
            let mensaje = document.createElement("p");
            mensaje.textContent = "No hay grados disponibles.";
            contenedor.appendChild(mensaje);
        } else {
            listaGrados.forEach(grado => {
                let divGrado = document.createElement("div");
                divGrado.className = "grado";

                let titulo = document.createElement("h3");
                // Usar el nombre y grado del JSON
                titulo.textContent = `${grado.nombre} - ${grado.grado}`;

                let descripcion = document.createElement("p");
                // Usar más propiedades del JSON, por ejemplo, profesor
                descripcion.textContent = `Profesor: ${grado.profesor_id ? grado.profesor_id : "No asignado"}`;

                divGrado.appendChild(titulo);
                divGrado.appendChild(descripcion);
                contenedor.appendChild(divGrado);
            });
        }

    } catch (error) {
        console.error("Error al obtener grados:", error);
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Hubo un error al cargar los grados.";
        contenedor.appendChild(errorMessage);
    }

    return contenedor;
}