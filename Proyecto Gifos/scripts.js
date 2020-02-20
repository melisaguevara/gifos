const apiKey = "B0JDGe3FFIpBzvTs8PwZwzT7CxlCvHhc";

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
        var titulo = data.data.title.slice(0, 10);
        var gif = data.data.images.original.url;
        divs[i].style.backgroundImage = "url(" + gif + ")";
        spans[i].innerHTML = "#" + titulo + "<button class='x'></button>";
        ver_mas[i].addEventListener("click", e => {
          getSearchResults(titulo);
        });
      });
  }
}

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

// function mostrarBusqueda() {
//   var div = document.getElementsByClassName("buscador2")[0];
//   div.style.display = "block";
// }

function mostrarEstilos() {
  var div = document.getElementsByClassName("estilos")[0];
  if (div.style.display == "block") {
    div.style.display = "none";
  } else {
    div.style.display = "block";
  }
}

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

function sailorDay() {
  localStorage.setItem("estilo", "day");
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo-tema1.css";
  var div = document.getElementsByClassName("estilos")[0];
  div.style.display = "none";
}

function sailorNight() {
  localStorage.setItem("estilo", "night");
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo-tema2.css";
  var div = document.getElementsByClassName("estilos")[0];
  div.style.display = "none";
}

recomendaciones();
tendencias();
