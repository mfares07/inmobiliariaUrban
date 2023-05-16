/* consumir una API para obtener imagenes random de Bs As */

const apiKey = "36302400-6143fac907803f294da8caefe";
const query = "buenos+aires+arquitectura";
const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&lang=es&image_type=photo&per_page=200`;
const articuloSomos = document.getElementById("imagenRandom");

fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        indice = Math.round(Math.random() * data.totalHits);
        urlImagen = data.hits[indice].webformatURL;
        autorImagen = "Autor: " + data.hits[indice].user;

        articuloSomos.innerHTML = `<img src="${urlImagen}" alt="${autorImagen}">`;
    })
    .catch(error => console.log(error))
