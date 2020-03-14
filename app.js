const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>However, that is not a valid number!</div>';
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `<h2>Congrats! you have guessed the number! <br><br>
    It was ${num}</h2>
    <button id="play-again" class="play-again">Play Again</button>`;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

function writeMessage(msg) {
  msgEl.innerHTML = `<div>You said: </div><span class="box">${msg}</span>`;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function onSpeak(e) {
  const { transcript, confidence } = e.results[0][0];
  const confidenceStr = Math.ceil(confidence * 100) + '%';

  writeMessage(`${confidenceStr} confident you said "${transcript}"`);
  checkNumber(transcript);
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener(
  'speechstart',
  () => (msgEl.innerHTML = '<div>Checking...</div>')
);

recognition.addEventListener('end', () => {
  recognition.start();
});

document.body.addEventListener('click', e => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});
