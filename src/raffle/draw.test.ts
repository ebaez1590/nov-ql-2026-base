import { describe, expect, it } from 'vitest';
import { MIN_PARTICIPANTS, canDraw, pickWinner } from './draw';
import type { Participants, RandomGenerator } from './types';

const PARTICIPANTS: Participants = Object.freeze(['Ana', 'Pedro', 'María', 'Luis', 'Sofía']);

function fixedRandom(value: number): RandomGenerator {
  return { nextInt: () => value };
}

describe('sorteo: mínimo de participantes para sortear', () => {
  it('el mínimo es 2', () => {
    expect(MIN_PARTICIPANTS).toBe(2);
  });

  it.each([
    [[], false],
    [['Ana'], false],
    [['Ana', 'Pedro'], true],
  ])('canDraw(%j) es %s', (list, expected) => {
    expect(canDraw(list)).toBe(expected);
  });

  it.each([[[]], [['Ana']]])('no sortea con %j y devuelve el motivo', (list) => {
    expect(pickWinner(list, fixedRandom(0))).toEqual({
      ok: false,
      error: { kind: 'not-enough-participants', minimum: 2 },
    });
  });
});

describe('sorteo: elegir un único ganador al azar', () => {
  it.each(PARTICIPANTS.map((name, index) => [index, name] as const))(
    'con el índice aleatorio %i gana %s, que pertenece a la lista',
    (index, expected) => {
      const outcome = pickWinner(PARTICIPANTS, fixedRandom(index));
      expect(outcome).toEqual({ ok: true, value: expected });
      if (outcome.ok) expect(PARTICIPANTS).toContain(outcome.value);
    },
  );

  it('pide al generador un número entre 0 y la cantidad de participantes', () => {
    const requested: number[] = [];
    pickWinner(PARTICIPANTS, {
      nextInt: (max) => {
        requested.push(max);
        return 0;
      },
    });
    expect(requested).toEqual([PARTICIPANTS.length]);
  });

  it('devuelve un solo ganador y no modifica la lista', () => {
    const outcome = pickWinner(PARTICIPANTS, fixedRandom(2));
    expect(outcome.ok && typeof outcome.value).toBe('string');
    expect(PARTICIPANTS).toEqual(['Ana', 'Pedro', 'María', 'Luis', 'Sofía']);
  });
});
