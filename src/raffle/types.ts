/** Fuente de aleatoriedad inyectable. */
export interface RandomGenerator {
  /** Devuelve un entero en el rango [0, maxExclusive). */
  nextInt(maxExclusive: number): number;
}

export type Participants = readonly string[];

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export type AddParticipantError =
  | { kind: 'empty-name' }
  | { kind: 'duplicate-name'; name: string };

export type DrawError = { kind: 'not-enough-participants'; minimum: number };

/** Contrato que usa la interfaz gráfica para trabajar con la lógica del sorteo. */
export interface RaffleService {
  addParticipant(
    participants: Participants,
    name: string,
  ): Result<Participants, AddParticipantError>;
  removeParticipant(participants: Participants, index: number): Participants;
  drawWinner(participants: Participants): Result<string, DrawError>;
  canDraw(participants: Participants): boolean;
}
