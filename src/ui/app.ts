import type { Participants, RaffleService } from '../raffle';
import type { AppElements } from './elements';
import {
  MIN_PARTICIPANTS_HINT,
  addParticipantErrorMessage,
  removeParticipantLabel,
} from './messages';

export function mountApp(elements: AppElements, raffle: RaffleService): void {
  let participants: Participants = [];

  const setParticipants = (next: Participants): void => {
    participants = next;
    hideResult();
    render();
  };

  function hideResult(): void {
    elements.result.hidden = true;
  }

  function showError(message: string): void {
    elements.formError.textContent = message;
  }

  function createParticipantItem(name: string, index: number): HTMLLIElement {
    const item = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = name;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-btn';
    removeButton.textContent = '✕';
    removeButton.setAttribute('aria-label', removeParticipantLabel(name));
    removeButton.addEventListener('click', () => {
      setParticipants(raffle.removeParticipant(participants, index));
    });

    item.append(label, removeButton);
    return item;
  }

  function render(): void {
    const hasParticipants = participants.length > 0;
    const canDraw = raffle.canDraw(participants);

    elements.list.replaceChildren(...participants.map(createParticipantItem));
    elements.count.textContent = String(participants.length);
    elements.emptyMessage.hidden = hasParticipants;
    elements.clearButton.hidden = !hasParticipants;
    elements.drawButton.disabled = !canDraw;
    elements.drawButton.title = canDraw ? '' : MIN_PARTICIPANTS_HINT;
  }

  function showWinner(name: string): void {
    elements.winnerName.textContent = name;
    elements.result.hidden = false;
    // Reinicia la animación en cada sorteo
    elements.result.classList.remove('pop');
    void elements.result.offsetWidth;
    elements.result.classList.add('pop');
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const outcome = raffle.addParticipant(participants, elements.input.value);

    if (!outcome.ok) {
      showError(addParticipantErrorMessage(outcome.error));
      return;
    }

    showError('');
    elements.input.value = '';
    elements.input.focus();
    setParticipants(outcome.value);
  });

  elements.clearButton.addEventListener('click', () => {
    setParticipants([]);
  });

  elements.drawButton.addEventListener('click', () => {
    const outcome = raffle.drawWinner(participants);
    if (outcome.ok) {
      showWinner(outcome.value);
    }
  });

  render();
}
