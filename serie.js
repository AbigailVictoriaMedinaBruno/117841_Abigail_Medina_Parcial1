class Serie{ 
    constructor(id, url, name, language, generes, image){
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.generes = generes;
        this.image = image;
    }

    toJsonString(){
        return JSON.stringify(this);
    }

    static createFromJsonString(json){
        const obj = JSON.parse(json);
        return new Serie(
            obj.id,
            obj.url,
            obj.name,
            obj.language,
            obj.generes,
            obj.image
        );
    }
    createHtmlElement(){
        const contenedor = document.createElement("div");
        contenedor.className = "serie-contenedor";

        const imagen = document.createElement("img");
        imagen.src = this.image;
        imagen.alt = this.name;

        const titulo = document.createElement("h3");
        titulo.textContent = this.name;

        const lang = document.createElement("p");
        lang.textContent = 'Idioma: ${this.language}';

       const gen = document.createElement("p");
        let textoGeneros = "";

        if (Array.isArray(this.generes) && this.generes.length > 0){
            this.generes.forEach((genero, indice) =>{
                if (indice === 0){
                    textoGeneros = genero;
                }
                else{
                    textoGeneros += ", " + genero;
                }
            });
        }
        else{
            textoGeneros = this.generes || "Sin género";
        }
        gen.textContent = 'Generos: ${listaGeneros}';

        card.appendChild(imagen);
        card.appendChild(titulo);
        card.appendChild(lang);
        card.appendChild(gen);

        return contenedor;
    }
}