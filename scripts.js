const apiKey = "B0JDGe3FFIpBzvTs8PwZwzT7CxlCvHhc";

//Chequea el último estilo usado por el usuario (guardado en localStorage) para seguir mostrando el mismo
if (
  localStorage.getItem("estilo") == "day" ||
  localStorage.getItem("estilo") == undefined
) {
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo-tema1.css";
} else {
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo-tema2.css";
}

//Usa el endpoint random para traer recomendaciones al usuario
function recomendaciones() {
  var divs = document.getElementsByClassName("container");
  var spans = document.getElementsByClassName("hashtag");
  var ver_mas = document.getElementsByClassName("ver-mas");
  for (let i = 0; i < 4; i++) {
    const found = fetch(
      "http://api.giphy.com/v1/gifs/random" + "?api_key=" + apiKey
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        //Usa la info del título para el contenido de la barra superior
        var titulo = data.data.title.slice(0, 10);
        var gif = data.data.images.original.url;
        divs[i].style.backgroundImage = "url(" + gif + ")";
        spans[i].innerHTML = "#" + titulo + "<button class='x'></button>";
        //Usa el titulo para buscar gifs relacionados al clickear 'ver mas'
        ver_mas[i].addEventListener("click", e => {
          getSearchResults(titulo);
        });
      });
  }
}

//Usa el endpoint tendencias para traer los gifs más usados actualmente
function tendencias() {
  var search = document.getElementById("input-busqueda").value;

  const found = fetch(
    "http://api.giphy.com/v1/gifs/trending" + "?api_key=" + apiKey
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      var gifs = data.data;
      var divs = document.getElementsByClassName("container2");

      for (i = 0; i < 12; i++) {
        gif = gifs[i].images.original.url;
        divs[i].style.backgroundImage = "url(" + gif + ")";
      }
      return data;
    })
    .catch(error => {
      return error;
    });
  return found;
}

//Función que realiza la búsqueda con el input del usuario
function getSearchResults(search) {
  if (search == undefined) {
    var search = document.getElementById("input-busqueda").value;
  }

  const found = fetch(
    "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      var gifs = data.data;
      var divs = document.getElementsByClassName("container2");

      for (i = 0; i < 12; i++) {
        gif = gifs[i].images.original.url;
        divs[i].style.backgroundImage = "url(" + gif + ")";
      }
      return data;
    })
    .catch(error => {
      return error;
    });
  return found;
}

//Muestra los estilos disponibles al clickear 'cambiar estilo'
function mostrarEstilos() {
  var div = document.getElementsByClassName("estilos")[0];
  if (div.style.display == "block") {
    div.style.display = "none";
  } else {
    div.style.display = "block";
  }
}

//Estila los botones del buscador de acuerdo al evento y de acuerdo al tema actual de la pag
boton = document.getElementsByClassName("search")[0];
lupa = document.getElementsByClassName("lupa")[0];

boton.addEventListener("mouseenter", e => {
  if (
    localStorage.getItem("estilo") == "day" ||
    localStorage.getItem("estilo") == undefined
  ) {
    lupa.src = "./Imagenes/lupa.svg";
  } else {
    lupa.src = "./Imagenes/lupa_light.svg";
  }
});

boton.addEventListener("mouseleave", e => {
  if (
    localStorage.getItem("estilo") == "day" ||
    localStorage.getItem("estilo") == undefined
  ) {
    lupa.src = "./Imagenes/lupa_inactive.svg";
  } else {
    lupa.src = "./Imagenes/combinedshape.svg";
  }
});

//Aplica el estilo Day y setea en el localStorage el estado del tema
function sailorDay() {
  localStorage.setItem("estilo", "day");
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo-tema1.css";
  var div = document.getElementsByClassName("estilos")[0];
  div.style.display = "none";
}

//Aplica el estilo Night y setea en el localStorage el estado del tema
function sailorNight() {
  localStorage.setItem("estilo", "night");
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo-tema2.css";
  var div = document.getElementsByClassName("estilos")[0];
  div.style.display = "none";
}

//Llama a las funciones para que el contenido se muestre automáticamente
recomendaciones();
tendencias();
