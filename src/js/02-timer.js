import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Selectarea elementelor din DOM
const dateTimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let selectedDate = null;
let timerInterval = null;

// Configurarea Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate <= now) {
      alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

// Funcție pentru a converti milisecundele în zile, ore, minute și secunde
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Funcție pentru a adăuga un zero în fața numerelor mai mici de 10
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Funcție pentru a actualiza valorile din interfață
function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Funcție pentru a porni cronometrul
function startTimer() {
  timerInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = selectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      alert("Countdown finished!");
      return;
    }

    const timeComponents = convertMs(timeDifference);
    updateTimer(timeComponents);
  }, 1000);
}

// Eveniment pentru butonul Start
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startTimer();
});
