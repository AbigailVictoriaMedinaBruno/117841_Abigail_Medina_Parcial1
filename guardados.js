document.addEventListener("DOMContentLoaded", () => {
    mostrarSeriesGuardadas();

    const botonOrdenarLetra = document.getElementById("ordenar-letra");
    const botonOrdenarId = document.getElementById("ordenar-id");

    if (botonOrdenarLetra) {
        botonOrdenarLetra.addEventListener("click", ordenarPorNombre);
    }

    if (botonOrdenarId) {
        botonOrdenarId.addEventListener("click", ordenarPorId);
    }
});

function obtenerGuardadas() {
    const datosGuardados = localStorage.getItem("seriesGuardadas");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
}

function mostrarSeriesGuardadas(listaCustom = null) {
    const contenedor = document.getElementById("series");
    contenedor.innerHTML = "";
    const series = listaCustom || obtenerGuardadas();

    if (series.length === 0) {
        contenedor.innerHTML = "<p>No hay series guardadas en favoritos.</p>";
        return;
    }

    series.forEach((datos) => {
        const serieObj = new Serie(
            datos.id,
            datos.url,
            datos.name,
            datos.language,
            datos.generes,
            datos.image
        );

        const elementoHtml = serieObj.createHtmlElement();
        contenedor.appendChild(elementoHtml);
    });
}

function ordenarPorNombre() {
    const series = obtenerGuardadas();
    series.sort((a, b) => a.name.localeCompare(b.name));
    mostrarSeriesGuardadas(series);
}
function ordenarPorId() {
    const series = obtenerGuardadas();
    series.sort((a, b) => a.id - b.id);
    mostrarSeriesGuardadas(series);
}