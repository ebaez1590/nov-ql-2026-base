import { MIN_PARTICIPANTS, type AddParticipantError } from '../raffle';

export function addParticipantErrorMessage(error: AddParticipantError): string {
  switch (error.kind) {
    case 'empty-name':
      return 'Escribe un nombre.';
    case 'duplicate-name':
      return `"${error.name}" ya está en la lista.`;
  }
}

export const MIN_PARTICIPANTS_HINT = `Agrega al menos ${MIN_PARTICIPANTS} participantes`;

export function removeParticipantLabel(name: string): string {
  return `Quitar a ${name}`;
}
