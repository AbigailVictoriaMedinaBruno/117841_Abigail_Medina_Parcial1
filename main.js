document.addEventListener("DOMContentLoaded", () => {
    cargarSeriesIniciales();
});

async function cargarSeriesIniciales(){
    const contenedorSeries = document.getElementById("series");

    
    for (let id = 1; id <= 6; id++){
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