import { describe, expect, it } from 'vitest';
import rawCss from './style.css?raw';

const css = rawCss.replace(/\/\*[\s\S]*?\*\//g, '');

function ruleBody(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`).exec(css);
  if (!match?.[1]) throw new Error(`No existe la regla ${selector}`);
  return match[1];
}

function declaration(selector: string, property: string): string {
  const match = new RegExp(`(?:^|;|\\s)${property}\\s*:\\s*([^;]+);`).exec(ruleBody(selector));
  if (!match?.[1]) throw new Error(`${selector} no define ${property}`);
  return match[1].trim();
}

const rootBody = ruleBody(':root');
const outsideRoot = css.replace(rootBody, '').replace(/var\(--[\w-]+\)/g, 'VAR');

describe('tema-visual: color base verde', () => {
  it('define el verde primario --green-600 como #16a34a en :root', () => {
    expect(rootBody).toMatch(/--green-600:\s*#16a34a;/i);
  });

  it('el botón "Sortear ganador" usa el verde primario de fondo', () => {
    expect(declaration('.btn-primary', 'background')).toBe('var(--green-600)');
  });

  it('el panel del ganador usa un degradado con el verde primario', () => {
    expect(declaration('.result', 'background')).toMatch(
      /^linear-gradient\(.*var\(--green-600\).*\)$/,
    );
  });
});

describe('tema-visual: colores definidos en un solo lugar', () => {
  it('no hay colores literales fuera de :root', () => {
    const literals = outsideRoot.match(
      /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?)\(|(?<![\w-])(?:white|black|red|green|blue|gr[ae]y)(?![\w-])/gi,
    );
    expect(literals).toBeNull();
  });
});
