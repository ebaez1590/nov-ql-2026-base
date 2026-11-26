import { beforeEach, describe, expect, it } from 'vitest';
import html from '../../index.html?raw';
import { createRaffleService, type RandomGenerator } from '../raffle';
import { mountApp } from './app';
import { getAppElements } from './elements';

const bodyMatch = /<body>([\s\S]*)<\/body>/.exec(html);
if (!bodyMatch?.[1]) throw new Error('index.html no tiene <body>');
const BODY = bodyMatch[1];

const FIVE = ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'];

let nextIndex = 0;
const controlledRandom: RandomGenerator = { nextInt: (max) => nextIndex % max };

function el<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Falta ${selector}`);
  return element;
}

const input = () => el<HTMLInputElement>('#participant-input');
const drawButton = () => el<HTMLButtonElement>('#draw-btn');
const clearButton = () => el<HTMLButtonElement>('#clear-btn');
const result = () => el<HTMLElement>('#result');
const formError = () => el<HTMLElement>('#form-error');
const count = () => el<HTMLElement>('#count').textContent;
const names = () =>
  [...document.querySelectorAll('#participant-list li span')].map((item) => item.textContent);

function add(name: string): void {
  input().value = name;
  el<HTMLFormElement>('#participant-form').requestSubmit();
}

function removeButton(name: string): HTMLButtonElement {
  return el<HTMLButtonElement>(`button[aria-label="Quitar a ${name}"]`);
}

beforeEach(() => {
  nextIndex = 0;
  document.body.innerHTML = BODY;
  mountApp(getAppElements(document), createRaffleService(controlledRandom));
});

describe('participantes', () => {
  it('agrega varios participantes en orden y actualiza el contador', () => {
    FIVE.forEach(add);
    expect(names()).toEqual(FIVE);
    expect(count()).toBe('5');
  });

  it('quita los espacios sobrantes', () => {
    add('  Ana  ');
    expect(names()).toEqual(['Ana']);
  });

  it('limpia el campo, mantiene el foco y borra el error anterior al agregar', () => {
    add('');
    add('Ana');
    expect(input().value).toBe('');
    expect(document.activeElement).toBe(input());
    expect(formError().textContent).toBe('');
  });

  it('rechaza un nombre vacío con un mensaje', () => {
    add('Ana');
    add('   ');
    expect(names()).toEqual(['Ana']);
    expect(formError().textContent).toBe('Escribe un nombre.');
  });

  it('rechaza un nombre repetido sin distinguir mayúsculas', () => {
    add('Ana');
    add('ana');
    expect(names()).toEqual(['Ana']);
    expect(formError().textContent).toBe('"ana" ya está en la lista.');
  });

  it('muestra el estado de lista vacía', () => {
    expect(count()).toBe('0');
    expect(el('#empty-msg').hidden).toBe(false);
    expect(el('#empty-msg').textContent).toBe('Todavía no hay participantes.');
    expect(clearButton().hidden).toBe(true);
  });

  it('oculta el mensaje de lista vacía y muestra "Vaciar lista" con participantes', () => {
    add('Ana');
    expect(el('#empty-msg').hidden).toBe(true);
    expect(clearButton().hidden).toBe(false);
    expect(clearButton().textContent).toBe('Vaciar lista');
  });

  it('quita a un participante con su botón "Quitar a <nombre>"', () => {
    ['Ana', 'Pedro', 'María'].forEach(add);
    removeButton('Pedro').click();
    expect(names()).toEqual(['Ana', 'María']);
    expect(count()).toBe('2');
  });

  it('vacía la lista', () => {
    FIVE.forEach(add);
    clearButton().click();
    expect(names()).toEqual([]);
    expect(count()).toBe('0');
  });
});

describe('sorteo', () => {
  it('no se puede sortear sin participantes', () => {
    expect(drawButton().disabled).toBe(true);
    expect(drawButton().title).toBe('Agrega al menos 2 participantes');
  });

  it('no se puede sortear con un solo participante', () => {
    add('Ana');
    expect(drawButton().disabled).toBe(true);
  });

  it('se puede sortear con dos participantes', () => {
    ['Ana', 'Pedro'].forEach(add);
    expect(drawButton().disabled).toBe(false);
  });

  it('muestra un único ganador, destacado, que pertenece a la lista', () => {
    FIVE.forEach(add);
    nextIndex = 2;
    drawButton().click();
    expect(result().hidden).toBe(false);
    expect(el('.result-title').textContent).toBe('¡Tenemos un ganador!');
    expect(el('#winner-name').textContent).toBe('María');
    expect(result().getAttribute('aria-live')).toBe('polite');
  });

  it.each(FIVE.map((name, index) => [index, name] as const))(
    'el ganador siempre es de la lista (índice %i → %s)',
    (index, expected) => {
      FIVE.forEach(add);
      nextIndex = index;
      drawButton().click();
      expect(el('#winner-name').textContent).toBe(expected);
      expect(FIVE).toContain(el('#winner-name').textContent);
    },
  );

  it('sortear no modifica la lista', () => {
    FIVE.forEach(add);
    drawButton().click();
    expect(names()).toEqual(FIVE);
  });

  it('un nuevo sorteo reemplaza el resultado anterior', () => {
    FIVE.forEach(add);
    nextIndex = 0;
    drawButton().click();
    nextIndex = 4;
    drawButton().click();
    expect(el('#winner-name').textContent).toBe('Sofía');
  });

  it('agregar un participante oculta el resultado', () => {
    FIVE.forEach(add);
    drawButton().click();
    add('Carla');
    expect(result().hidden).toBe(true);
  });

  it('quitar un participante oculta el resultado', () => {
    FIVE.forEach(add);
    drawButton().click();
    removeButton('Ana').click();
    expect(result().hidden).toBe(true);
  });

  it('un intento fallido de agregar no oculta el resultado', () => {
    FIVE.forEach(add);
    drawButton().click();
    add('');
    add('ana');
    expect(result().hidden).toBe(false);
  });
});
