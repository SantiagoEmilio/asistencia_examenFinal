async function obtenergrados() {
    try {
        const response = await fetch("http://localhost:5000/grados");

        // Comprobar si la respuesta no fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }

        // Si la respuesta es exitosa, devolver los datos en formato JSON
        return await response.json();
    } catch (error) {
        console.error("Error al obtener grados:", error);
        return []; // Retornar un arreglo vacío en caso de error
    }
}