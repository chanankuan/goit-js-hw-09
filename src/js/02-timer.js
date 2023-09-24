import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Swal from 'sweetalert2';
import 'flatpickr/dist/flatpickr.min.css';

import nyanCat from '../assets/cat-space.gif';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  audio: document.querySelector('audio'),
  img: document.querySelector('.nyan-cat'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const msDiff = selectedDates[0] - Date.now();

    if (msDiff < 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () =>
        startTimer(selectedDates[0])
      );
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer(selectedTime) {
  const remainingTime = selectedTime - Date.now();
  const convertedTime = convertMs(remainingTime);

  updateTimerDisplay(convertedTime);

  const timerId = setInterval(() => {
    const remainingTime = selectedTime - Date.now();
    const convertedTime = convertMs(remainingTime);

    if (remainingTime <= 1) {
      clearInterval(timerId);
      refs.audio.play();

      Swal.fire({
        width: 600,
        backdrop: 'rgba(0,0,123,0.4)',
        background: '#043264',
        imageUrl: nyanCat,
        imageWidth: 600,
        imageAlt: 'Custom image',
        showConfirmButton: false,
      }).then(() => {
        refs.audio.pause();
        refs.audio.currentTime = 0;
      });
    } else {
      updateTimerDisplay(convertedTime);
    }
  }, 1000);
}

function updateTimerDisplay(obj) {
  const { days, hours, minutes, seconds } = obj;
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
