let slideActual = 0;
const slides = document.querySelectorAll(".slide");

function cambiarSlide(direccion) {
  slides[slideActual].classList.remove("active");
  slideActual = (slideActual + direccion + slides.length) % slides.length;
  slides[slideActual].classList.add("active");
}

function cargarVoces() {
  const selector = document.getElementById("selectVoz");
  const voces = speechSynthesis.getVoices();
  selector.innerHTML = ""; // Limpiar opciones

  // Solo mostrar voces en español
  const vocesES = voces.filter(v => v.lang.startsWith("es"));
  vocesES.forEach((voz, index) => {
    const opcion = document.createElement("option");
    opcion.value = index;
    opcion.textContent = `${voz.name} (${voz.lang})`;
    selector.appendChild(opcion);
  });
}

function leerTexto(idTexto) {
  const texto = document.getElementById(idTexto).innerText;
  const utterance = new SpeechSynthesisUtterance(texto);
  const voces = speechSynthesis.getVoices();
  const selector = document.getElementById("selectVoz");
  const vocesES = voces.filter(v => v.lang.startsWith("es"));

  // Obtener la voz seleccionada
  const vozSeleccionada = vocesES[selector.value];
  if (vozSeleccionada) {
    utterance.voice = vozSeleccionada;
  }

  utterance.lang = "es-ES";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function toggleContraste() {
  document.body.classList.toggle("contraste");
}

// Asegurar que las voces se carguen correctamente
if (speechSynthesis.getVoices().length === 0) {
  speechSynthesis.onvoiceschanged = cargarVoces;
} else {
  cargarVoces();
}
