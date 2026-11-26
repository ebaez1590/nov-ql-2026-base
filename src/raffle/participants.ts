import type { AddParticipantError, Participants, Result } from './types';

export function addParticipant(
  participants: Participants,
  rawName: string,
): Result<Participants, AddParticipantError> {
  const name = rawName.trim();

  if (name === '') {
    return { ok: false, error: { kind: 'empty-name' } };
  }

  const isDuplicate = participants.some(
    (participant) => participant.toLowerCase() === name.toLowerCase(),
  );
  if (isDuplicate) {
    return { ok: false, error: { kind: 'duplicate-name', name } };
  }

  return { ok: true, value: [...participants, name] };
}

export function removeParticipant(participants: Participants, index: number): Participants {
  return participants.filter((_, i) => i !== index);
}
