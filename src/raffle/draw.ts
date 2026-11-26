import type { DrawError, Participants, RandomGenerator, Result } from './types';

export const MIN_PARTICIPANTS = 2;

export function canDraw(participants: Participants): boolean {
  return participants.length >= MIN_PARTICIPANTS;
}

export function pickWinner(
  participants: Participants,
  random: RandomGenerator,
): Result<string, DrawError> {
  const winner = canDraw(participants)
    ? participants[random.nextInt(participants.length)]
    : undefined;

  if (winner === undefined) {
    return { ok: false, error: { kind: 'not-enough-participants', minimum: MIN_PARTICIPANTS } };
  }

  return { ok: true, value: winner };
}
