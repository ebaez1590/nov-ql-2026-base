import { describe, expect, it } from 'vitest';
import { addParticipant, removeParticipant } from './participants';
import type { Participants } from './types';

function addAll(names: readonly string[]): Participants {
  return names.reduce<Participants>((list, name) => {
    const outcome = addParticipant(list, name);
    if (!outcome.ok) throw new Error(`No se pudo agregar ${name}`);
    return outcome.value;
  }, []);
}

describe('participantes: agregar participantes', () => {
  it('agrega varios participantes al final, en orden', () => {
    expect(addAll(['Ana', 'Pedro', 'María', 'Luis', 'Sofía'])).toEqual([
      'Ana',
      'Pedro',
      'María',
      'Luis',
      'Sofía',
    ]);
  });

  it('quita los espacios del inicio y del final', () => {
    expect(addParticipant([], '  Ana  ')).toEqual({ ok: true, value: ['Ana'] });
  });

  it('no modifica la lista recibida', () => {
    const list: Participants = Object.freeze(['Ana']);
    addParticipant(list, 'Pedro');
    expect(list).toEqual(['Ana']);
  });
});

describe('participantes: rechazar nombres vacíos', () => {
  it.each(['', '   ', '\t'])('rechaza %j', (name) => {
    expect(addParticipant(['Ana'], name)).toEqual({ ok: false, error: { kind: 'empty-name' } });
  });
});

describe('participantes: rechazar nombres repetidos', () => {
  it('rechaza un nombre repetido sin distinguir mayúsculas y conserva lo escrito', () => {
    expect(addParticipant(['Ana'], ' ana ')).toEqual({
      ok: false,
      error: { kind: 'duplicate-name', name: 'ana' },
    });
  });
});

describe('participantes: quitar un participante', () => {
  it('quita solo al participante indicado', () => {
    const list: Participants = Object.freeze(['Ana', 'Pedro', 'María']);
    expect(removeParticipant(list, 1)).toEqual(['Ana', 'María']);
    expect(list).toEqual(['Ana', 'Pedro', 'María']);
  });
});
