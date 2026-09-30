let paginaActual = 1;


document.addEventListener("DOMContentLoaded", () => {
    cargarSeriesIniciales();

    const botonAnterior = document.getElementById("anterior");
    const botonSiguiente = document.getElementById("siguiente");

    if (botonAnterior) {
        botonAnterior.addEventListener("click", paginaAnterior);
    }
    if (botonSiguiente) {
        botonSiguiente.addEventListener("click", paginaSiguiente);
    }
});

async function cargarSeriesIniciales(){
    const contenedorSeries = document.getElementById("series");

    contenedorSeries.innerHTML = "";
    
    const idInicial = (paginaActual - 1) * 6 + 1;
    const idFinal = paginaActual * 6;

    for (let id = idInicial; id <= idFinal; id++){
        try{
            const devolucion = await fetch(`https://api.tvmaze.com/shows/${id}`);
            
            if(devolucion.ok){
                const datos = await devolucion.json();

                const nuevaSerie = new Serie(
                    datos.id,
                    datos.url,
                    datos.name,
                    datos.language,
                    datos.genres,
                    datos.image ? datos.image.medium : ""
                );
                
                const elementoHtml = nuevaSerie.createHtmlElement();
                contenedorSeries.appendChild(elementoHtml);
            }
        } catch(error){
            console.log(error);
        }
    }
}
    

function paginaSiguiente() {
    paginaActual++;
    cargarSeriesIniciales();
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarSeriesIniciales();
    }
}
