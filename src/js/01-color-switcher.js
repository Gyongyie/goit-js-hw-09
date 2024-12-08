const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let colorChangeInterval = null;

// Funcție pentru generarea unei culori aleatorii
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

// Funcția care pornește schimbarea culorilor
function startColorChange() {
  // Dezactivează butonul "Start"
  startButton.disabled = true;
  // Pornește intervalul de schimbare a culorii
  colorChangeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Funcția care oprește schimbarea culorilor
function stopColorChange() {
  // Oprește intervalul
  clearInterval(colorChangeInterval);
  // Activează butonul "Start"
  startButton.disabled = false;
}

// Adăugare evenimente pe butoane
startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);
