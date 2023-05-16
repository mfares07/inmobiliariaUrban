/* consumir una API para obtener imagenes random de Bs As */


const apiKey = "36302400-6143fac907803f294da8caefe";
const query = "buenos+aires+arquitectura";
const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&lang=es&image_type=photo&per_page=200`;
console.log(url);

fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data.totalHits);
        indice = Math.round(Math.random() * data.totalHits);
        urlImagen = data.hits[indice].webformatURL;
        autorImagen = "Autor: " + data.hits[indice].user;

        articuloSomos = document.getElementById("imagenRandom");
        articuloSomos.innerHTML = `<img src="${urlImagen}" alt="${autorImagen}">`;

        console.log(autorImagen);
        console.log(urlImagen);

    })
    .catch(error => console.log(error))
