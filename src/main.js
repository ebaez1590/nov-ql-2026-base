import './style.css';

const participants = [];

const form = document.querySelector('#participant-form');
const input = document.querySelector('#participant-input');
const formError = document.querySelector('#form-error');
const list = document.querySelector('#participant-list');
const count = document.querySelector('#count');
const emptyMsg = document.querySelector('#empty-msg');
const clearBtn = document.querySelector('#clear-btn');
const drawBtn = document.querySelector('#draw-btn');
const result = document.querySelector('#result');
const winnerName = document.querySelector('#winner-name');

function render() {
  list.replaceChildren(
    ...participants.map((name, index) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = name;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'remove-btn';
      remove.textContent = '✕';
      remove.setAttribute('aria-label', `Quitar a ${name}`);
      remove.addEventListener('click', () => {
        participants.splice(index, 1);
        hideResult();
        render();
      });
      li.append(span, remove);
      return li;
    }),
  );

  count.textContent = participants.length;
  emptyMsg.hidden = participants.length > 0;
  clearBtn.hidden = participants.length === 0;
  drawBtn.disabled = participants.length < 2;
  drawBtn.title = participants.length < 2 ? 'Agrega al menos 2 participantes' : '';
}

function hideResult() {
  result.hidden = true;
}

function showError(message) {
  formError.textContent = message;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = input.value.trim();

  if (!name) {
    showError('Escribe un nombre.');
    return;
  }
  if (participants.some((p) => p.toLowerCase() === name.toLowerCase())) {
    showError(`"${name}" ya está en la lista.`);
    return;
  }

  showError('');
  participants.push(name);
  input.value = '';
  input.focus();
  hideResult();
  render();
});

clearBtn.addEventListener('click', () => {
  participants.length = 0;
  hideResult();
  render();
});

function randomIndex(max) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

drawBtn.addEventListener('click', () => {
  if (participants.length < 2) return;

  const winner = participants[randomIndex(participants.length)];
  winnerName.textContent = winner;
  result.hidden = false;
  // Reinicia la animación en cada sorteo
  result.classList.remove('pop');
  void result.offsetWidth;
  result.classList.add('pop');
});

render();
