/* consumir una API para obtener imagenes random de Bs As */

urlImagen = "";
autorImagen = "Autor: ";
imagenes = {};
articuloSomos = document.getElementById("imagenRandom")
fetch("https://pixabay.com/api/?key=36302400-6143fac907803f294da8caefe&q=buenos+aires+arquitectura&lang=es&image_type=photo")
.then(imagenes => imagenes.json())
.then(data => {
    console.log(data.totalHits);
    indice = Math.round(Math.random() * data.totalHits);
    imagenes = data.hits;    
    urlImagen = imagenes[indice].webformatURL;
    autorImagen = autorImagen + imagenes[indice].user;
    console.log(autorImagen);
    console.log(urlImagen);

    articuloSomos.innerHTML = `<img src="${urlImagen}" alt="${autorImagen}">`;
})
.catch(err => console.log(err))
