import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = form.elements[0].value,
    step = form.elements[1].value,
    amount = form.elements[2].value;

  for (let i = 1; i <= amount; i += 1) {
    const promise = createPromise(i, Number(delay) + Number(step) * (i - 1))
      .then(result => {
        Notify.success(result);
      })
      .catch(error => {
        Notify.failure(error);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
