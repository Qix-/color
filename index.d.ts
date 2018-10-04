import * as convert from 'color-convert';

type ModelName = keyof typeof convert;
type NotValidModel<M extends ModelName> = Exclude<M, 'keyword' | 'gray' | 'hex'>;
interface ColorPODMap {
  'rgb': { [K in 'r' | 'g' | 'b']: number };
  'hsl': { [K in 'h' | 's' | 'l']: number };
  'hsv': { [K in 'h' | 's' | 'v']: number };
  'hwb': { [K in 'h' | 'w' | 'b']: number };
  'cmyk': { [K in 'c' | 'm' | 'y' | 'k']: number };
  'xyz': { [K in 'x' | 'y' | 'z']: number };
  'lab': { [K in 'l' | 'a' | 'b']: number };
  'lch': { [K in 'l' | 'c' | 'h']: number };
  'hex': { [K in 'hex']: number };
  'keyword': { [K in 'keyword']: number };
  'ansi16': { [K in 'ansi16']: number };
  'ansi256': { [K in 'ansi256']: number };
  'hcg': { [K in 'h' | 'c' | 'g']: number };
  'apple': { [K in 'r16' | 'g16' | 'b16']: number };
  'gray': { [K in 'gray']: number };
}
type ColorPOD<M extends ModelName = any> = ColorPODMap[M] & { alpha?: number };
type ColorArgument<M extends ModelName = any> = string | number[] | number | Color<M> | ColorPOD<M>;

type ColorConverter = {
  [M in NotValidModel<ModelName>]: () => Color<M>;
} & {
  [M in NotValidModel<ModelName>]: (color: ColorArgument<M>) => Color<M>;
};
type ColorCreators = {
  [M in NotValidModel<ModelName>]: (...channels: number[]) => Color<M>;
} & {
  [M in NotValidModel<ModelName>]: (color: number[]) => Color<M>;
};

interface Color<M extends ModelName = any> extends ColorConverter {
  readonly model: M;
  readonly color: number[];
  readonly valpha: number;

  toString(): string;
  toJSON(): Color<M>;
  string(places?: number): string;
  percentString(places?: number): string;
  array(): number[];
  object(): ColorPOD<M>;
  unitArray(): ReturnType<Color<M>['array']>;
  unitObject(): ReturnType<Color<M>['object']>;
  round(places?: number): Color<M>;
  alpha(): number;
  alpha(val: number): Color<M>;

  red: M extends 'rgb' ? number : undefined;
  green: M extends 'rgb' ? number : undefined;
  blue: M extends 'rgb' ? number : undefined;

  hue: M extends 'hsl' | 'hsv' | 'hsl' | 'hwb' | 'hcg' ? number : undefined;

  saturationl: M extends 'hsl' ? number : undefined;
  lightness: M extends 'hsl' ? number : undefined;

  saturationv: M extends 'hsv' ? number : undefined;
  value: M extends 'hsv' ? number : undefined;

  white: M extends 'hwb' ? number : undefined;
  wblack: M extends 'hwb' ? number : undefined;

  chroma: M extends 'hcg' ? number : undefined;
  gray: M extends 'hcg' ? number : undefined;

  cyan: M extends 'cmyk' ? number : undefined;
  magenta: M extends 'cmyk' ? number : undefined;
  yellow: M extends 'cmyk' ? number : undefined;
  black: M extends 'cmyk' ? number : undefined;

  x: M extends 'xyz' ? number : undefined;
  y: M extends 'xyz' ? number : undefined;
  z: M extends 'xyz' ? number : undefined;
  
  l: M extends 'lab' ? number : undefined;
  a: M extends 'lab' ? number : undefined;
  b: M extends 'lab' ? number : undefined;
}
interface ColorConstructor {
  new <M extends ModelName = any>(color: ColorArgument<M>, model?: NotValidModel<M>): Color<M>;
  <M extends ModelName = any>(color: ColorArgument<M>, model?: NotValidModel<M>): Color<M>;
}
declare const constr: ColorConstructor & ColorCreators;
export default constr;
