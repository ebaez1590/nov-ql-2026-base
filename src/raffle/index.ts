import { canDraw, pickWinner } from './draw';
import { addParticipant, removeParticipant } from './participants';
import type { RaffleService, RandomGenerator } from './types';

export type * from './types';
export { MIN_PARTICIPANTS } from './draw';

export function createRaffleService(random: RandomGenerator): RaffleService {
  return {
    addParticipant,
    removeParticipant,
    canDraw,
    drawWinner: (participants) => pickWinner(participants, random),
  };
}
