function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
// Obținem elementele DOM
const form = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

// Funcția care creează și returnează un promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3; // 70% șanse să fie îndeplinit

      const message = { position, delay };
      if (shouldResolve) {
        resolve(message); // Promise îndeplinit
      } else {
        reject(message); // Promise respins
      }
    }, delay);
  });
}

// Funcția care procesează formularul și creează promise-uri
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne reîncărcarea paginii la submit

  // Preluăm valorile din formular
  let delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  // Creăm promise-uri
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Promise ${position} fulfilled after ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Promise ${position} rejected after ${delay}ms`);
      });

    // Actualizăm întârzierea pentru următorul promise
    delay += step;
  }

  // Resetăm formularul
  form.reset();
});
