const apiKey = "B0JDGe3FFIpBzvTs8PwZwzT7CxlCvHhc";

if (
  localStorage.getItem("estilo") == "day" ||
  localStorage.getItem("estilo") == undefined
) {
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo-upload.css";
} else {
  let estiloActual = document.getElementsByTagName("link")[0];
  estiloActual.href = "./Estilos/estilo2-upload.css";
}

function getStreamAndRecord() {
  let video = document.getElementsByTagName("video")[0];
  let ventana = document.getElementsByClassName("ventana")[0];
  let ventana_captura = document.getElementsByClassName("ventana-captura")[0];
  let subiendo = document.getElementsByClassName("subiendo")[0];
  ventana.style.display = "none";
  ventana_captura.style.display = "block";
  subiendo.style.display = "none";
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 }
      }
    })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    });
}

function grabar() {
  let video = document.getElementsByTagName("video")[0];
  let stream = video.srcObject;
  let subiendo = document.getElementsByClassName("subiendo")[0];
  let recorder = new RecordRTC(stream, {
    type: "gif",
    frameRate: 0.5,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
      console.log("started");
    }
  });
  recorder.startRecording();

  let botones_grabar = document.getElementsByClassName("botones-grabar")[0];
  let botones_listo = document.getElementsByClassName("botones-listo")[0];
  let texto = document.getElementsByClassName("barra-buscar")[1];

  botones_grabar.style.display = "none";
  botones_listo.style.display = "flex";
  texto.innerHTML = "Capturando tu gifo";

  function parar(stream) {
    // navigator.mediaDevices.getUserMedia({
    //   audio: false,
    //   video: false
    // });

    // stream.stop();

    recorder.stopRecording(function() {
      let blob = recorder.getBlob();
      let urlGif = URL.createObjectURL(blob);

      let video = document.getElementsByTagName("video")[0];
      let div_preview = document.getElementsByClassName("preview")[0];
      let preview = document.getElementsByClassName("preview-gif")[0];
      let botones_subir = document.getElementsByClassName("botones-subir")[0];
      let boton_subir = document.getElementsByClassName("subir")[0];

      botones_listo.style.display = "none";
      botones_subir.style.display = "block";

      video.style.display = "none";
      preview.src = urlGif;
      div_preview.style.display = "flex";

      texto.innerHTML = "Vista Previa";

      let form = new FormData();
      form.append("file", recorder.getBlob(), "myGif.gif");

      function subir() {
        if (localStorage.getItem("ids") == undefined) {
          localStorage.setItem("ids", "[]");
        }

        let ids = JSON.parse(localStorage.getItem("ids"));
        console.log(ids);

        video.style.display = "none";
        preview.style.display = "none";
        subiendo.style.display = "inline";
        botones_subir.style.display = "none";
        let exito = document.getElementsByClassName("exito")[0];
        let div_captura = document.getElementsByClassName("captura")[0];
        let cancelar_subida = document.getElementsByClassName("cancelar2")[0];

        cancelar_subida.addEventListener("click", function() {});

        const upload = fetch(
          "http://upload.giphy.com/v1/gifs" + "?api_key=" + apiKey,
          {
            method: "POST",
            body: form
          }
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data);
            let descargar = document.getElementsByClassName("descargar")[0];
            let copiar = document.getElementsByClassName("copiar")[0];
            div_preview.style.display = "inline";
            preview.style.display = "inline";
            subiendo.style.display = "none";
            exito.style.display = "inline";
            ids.push(data.data.id);
            localStorage.setItem("ids", JSON.stringify(ids));
            mostrarGifosPrevios();

            descargar.addEventListener("click", function() {
              fetch(
                "http://api.giphy.com/v1/gifs/" +
                  data.data.id +
                  "?api_key=" +
                  apiKey
              )
                .then(response => {
                  return response.json();
                })
                .then(data => {
                  let url_newGif = data.data.images.downsized.url;
                  window.open(url_newGif, "_blank");
                });
            });

            copiar.addEventListener("click", function() {
              fetch(
                "http://api.giphy.com/v1/gifs/" +
                  data.data.id +
                  "?api_key=" +
                  apiKey
              )
                .then(response => {
                  return response.json();
                })
                .then(data => {
                  let url_newGif = data.data.images.downsized.url;
                  console.log(url_newGif);
                  let texto = document.createElement("textarea");
                  texto.value = url_newGif;
                  document.body.appendChild(texto);
                  texto.select();
                  document.execCommand("copy");
                  document.body.removeChild(texto);
                  alert("El link de tu gif se ha copiado al portapapeles :)");
                });
            });
          })
          .catch(error => alert("Ha ocurrido un error al subir el gifo"));
      }

      boton_subir.addEventListener("click", subir);
    });
  }

  botones_listo.addEventListener("click", parar);
}

function repetirCaptura() {
  console.log("en repeitr captura");
  let div_preview = document.getElementsByClassName("preview")[0];
  let video = document.getElementsByTagName("video")[0];
  let botones_subir = document.getElementsByClassName("botones-subir")[0];

  div_preview.style.display = "none";
  video.style.display = "block";
  botones_subir.style.display = "none";

  grabar();
}

function mostrarGifosPrevios() {
  let ids = JSON.parse(localStorage.getItem("ids"));
  let divs = document.getElementsByClassName("container2");

  if (ids != undefined && ids.length > 0) {
    for (let i = 0; i < ids.length; i++) {
      fetch("http://api.giphy.com/v1/gifs/" + ids[i] + "?api_key=" + apiKey)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          var gif = data.data.images.original.url;
          divs[i].style.display = "inline-block";
          divs[i].style.backgroundImage = "url(" + gif + ")";
        });
    }
  }
}

function cerrarVentana() {
  let ventana = document.getElementsByClassName("ventana")[0];
  let ventana2 = document.getElementsByClassName("ventana-captura")[0];
  ventana2.style.display = "none";
  ventana.style.display = "none";
}

let repetir = document.getElementsByClassName("repetir")[0];

repetir.addEventListener("click", repetirCaptura);
