const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  audio: document.querySelector('audio'),
  timerId: null,
};

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', handleStart);
refs.stopBtn.addEventListener('click', handleStop);

function handleStart() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();
  refs.audio.play();

  refs.timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handleStop() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  refs.audio.pause();
  clearInterval(refs.timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
