export interface AppElements {
  form: HTMLFormElement;
  input: HTMLInputElement;
  formError: HTMLElement;
  list: HTMLUListElement;
  count: HTMLElement;
  emptyMessage: HTMLElement;
  clearButton: HTMLButtonElement;
  drawButton: HTMLButtonElement;
  result: HTMLElement;
  winnerName: HTMLElement;
}

function requireElement<T extends Element>(
  root: ParentNode,
  selector: string,
  type: abstract new () => T,
): T {
  const element = root.querySelector(selector);
  if (!(element instanceof type)) {
    throw new Error(`No se encontró el elemento "${selector}" del tipo esperado.`);
  }
  return element;
}

export function getAppElements(root: ParentNode): AppElements {
  return {
    form: requireElement(root, '#participant-form', HTMLFormElement),
    input: requireElement(root, '#participant-input', HTMLInputElement),
    formError: requireElement(root, '#form-error', HTMLElement),
    list: requireElement(root, '#participant-list', HTMLUListElement),
    count: requireElement(root, '#count', HTMLElement),
    emptyMessage: requireElement(root, '#empty-msg', HTMLElement),
    clearButton: requireElement(root, '#clear-btn', HTMLButtonElement),
    drawButton: requireElement(root, '#draw-btn', HTMLButtonElement),
    result: requireElement(root, '#result', HTMLElement),
    winnerName: requireElement(root, '#winner-name', HTMLElement),
  };
}
