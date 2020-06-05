// Our colors are saved as HEX
// We allow them to be converted to RGB so we can do CSS transisions
const _hexToRgb = (hex: string) => {
  const arr = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_m: string, r: string, g: string, b: string) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g);

  return arr ? arr.map((x: string) => x && parseInt(x, 16)) : null;
};

// Tint and Shade functions for js: https://stackoverflow.com/a/13542669
const _logShade = (co: string, p: number) => {
  const i = parseInt,
    r = Math.round,
    [a, b, c, d] = co.split(','),
    P: boolean = p < 0,
    t = P ? 0 : p * 255 ** 2,
    X: number = P ? 1 + p : 1 - p;
  return (
    'rgb' +
    (d ? 'a(' : '(') +
    r((X * i(a[3] === 'a' ? a.slice(5) : a.slice(4)) ** 2 + t) ** 0.5) +
    ',' +
    r((X * i(b) ** 2 + t) ** 0.5) +
    ',' +
    r((X * i(c) ** 2 + t) ** 0.5) +
    (d ? ',' + d : ')')
  );
};

const _logBlend = (p: number, c0: string, c1: string) => {
  const i = parseInt,
    r = Math.round,
    P = 1 - p,
    [a, b, c, d] = c0.split(','),
    [e, f, g, h] = c1.split(','),
    x = d || h,
    j = x
      ? ',' + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')')
      : ')';
  return (
    'rgb' +
    (x ? 'a(' : '(') +
    r(
      (P * i(a[3] === 'a' ? a.slice(5) : a.slice(4)) ** 2 +
        p * i(e[3] === 'a' ? e.slice(5) : e.slice(4)) ** 2) **
        0.5
    ) +
    ',' +
    r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) +
    ',' +
    r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) +
    j
  );
};

export const rgba = (value: string, opacity = 1) => {
  const rgbValue = _hexToRgb(value);
  return `rgba(${rgbValue}, ${opacity})`;
};

export const tint = (color: string, percent: number) => {
  const rgbValue = _hexToRgb(color);
  return _logShade(`rgb(${rgbValue})`, percent);
};

export const shade = (color: string, percent: number) => {
  const rgbValue = _hexToRgb(color);
  return _logShade(`rgb(${rgbValue})`, Math.abs(percent) * -1);
};

// Blend 2 colors together for a solid mixed color
export const mix = (color: string, color2: string, percent: number) => {
  const rgbValue = _hexToRgb(color);
  const rgbValue2 = _hexToRgb(color2);
  return _logBlend(percent, `rgb(${rgbValue})`, `rgb(${rgbValue2})`);
};

export const gradient = (startColor: string, endColor: string) => {
  return `background: ${startColor};
    background: -moz-linear-gradient(45deg,  ${startColor} 0%, ${endColor} 100%);
    background: -webkit-linear-gradient(45deg,  ${startColor} 0%, ${endColor} 100%);
    background: linear-gradient(45deg,  ${startColor} 0%, ${endColor} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${startColor}', endColorstr='${endColor}', GradientType=1 );`;
};
