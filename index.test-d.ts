import {expectType} from 'tsd';
import Color, {
	type ColorInstance, type ColorJson, type ColorObject,
} from './index.js';

// String constructor
expectType<ColorInstance>(Color('rgb(255, 255, 255)'));
expectType<ColorInstance>(Color('hsl(194, 53%, 79%)'));
expectType<ColorInstance>(Color('hsl(194, 53%, 79%, 0.5)'));
expectType<ColorInstance>(Color('#FF0000'));
expectType<ColorInstance>(Color('#FF000033'));
expectType<ColorInstance>(Color('lightblue'));
expectType<ColorInstance>(Color('purple'));
// RGB
expectType<ColorInstance>(Color({r: 255, g: 255, b: 255}));
expectType<ColorInstance>(Color({
	r: 255, g: 255, b: 255, alpha: 0.5,
}));
expectType<ColorInstance>(Color.rgb(255, 255, 255));
expectType<ColorInstance>(Color.rgb(255, 255, 255, 0.5));
expectType<ColorInstance>(Color.rgb(0xFF, 0x00, 0x00, 0.5));
expectType<ColorInstance>(Color.rgb([255, 255, 255]));
expectType<ColorInstance>(Color.rgb([0xFF, 0x00, 0x00, 0.5]));
// HSL
expectType<ColorInstance>(Color({h: 194, s: 53, l: 79}));
expectType<ColorInstance>(Color({
	h: 194, s: 53, l: 79, alpha: 0.5,
}));
expectType<ColorInstance>(Color.hsl(194, 53, 79));
// HSV
expectType<ColorInstance>(Color({h: 195, s: 25, v: 99}));
expectType<ColorInstance>(Color({
	h: 195, s: 25, v: 99, alpha: 0.5,
}));
expectType<ColorInstance>(Color.hsv(195, 25, 99));
expectType<ColorInstance>(Color.hsv([195, 25, 99]));
// CMYK
expectType<ColorInstance>(Color({
	c: 0, m: 100, y: 100, k: 0,
}));
expectType<ColorInstance>(Color({
	c: 0, m: 100, y: 100, k: 0, alpha: 0.5,
}));
expectType<ColorInstance>(Color.cmyk(0, 100, 100, 0));
expectType<ColorInstance>(Color.cmyk(0, 100, 100, 0, 0.5));
// Hwb
expectType<ColorInstance>(Color({h: 180, w: 0, b: 0}));
expectType<ColorInstance>(Color.hwb(180, 0, 0));
// Lch
expectType<ColorInstance>(Color({l: 53, c: 105, h: 40}));
expectType<ColorInstance>(Color.lch(53, 105, 40));
// Lab
expectType<ColorInstance>(Color({l: 53, a: 80, b: 67}));
expectType<ColorInstance>(Color.lab(53, 80, 67));
// Hcg
expectType<ColorInstance>(Color({h: 0, c: 100, g: 0}));
expectType<ColorInstance>(Color.hcg(0, 100, 0));
// Ansi16
expectType<ColorInstance>(Color.ansi16(91));
expectType<ColorInstance>(Color.ansi16(91, 0.5));
// Ansi256
expectType<ColorInstance>(Color.ansi256(196));
expectType<ColorInstance>(Color.ansi256(196, 0.5));
// Apple
expectType<ColorInstance>(Color.apple(65535, 65535, 65535));
expectType<ColorInstance>(Color.apple([65535, 65535, 65535]));

// Getters
const color = Color('#00ccff');
expectType<ColorInstance>(color.hsl());
expectType<ColorJson>(color.toJSON());
expectType<ColorObject>(color.object());
expectType<number[]>(color.rgb().array());
expectType<number>(color.rgbNumber());
expectType<string>(color.hex());
expectType<ColorInstance>(color.hex('#00ccff'));
expectType<number>(color.red());
expectType<ColorInstance>(color.red(255));

// CSS strings
expectType<string>(color.hsl().string());

// Luminosity
expectType<number>(color.luminosity());
expectType<number>(color.contrast(Color('blue')));
expectType<boolean>(color.isLight());
expectType<boolean>(color.isDark());

// Manipulation
expectType<ColorInstance>(color.negate());
expectType<ColorInstance>(color.lighten(0.5));
expectType<ColorInstance>(color.lighten(0.5));
expectType<ColorInstance>(color.darken(0.5));
expectType<ColorInstance>(color.darken(0.5));
expectType<ColorInstance>(color.lightness(50));
expectType<ColorInstance>(color.saturate(0.5));
expectType<ColorInstance>(color.desaturate(0.5));
expectType<ColorInstance>(color.grayscale());
expectType<ColorInstance>(color.whiten(0.5));
expectType<ColorInstance>(color.blacken(0.5));
expectType<ColorInstance>(color.fade(0.5));
expectType<ColorInstance>(color.opaquer(0.5));
expectType<ColorInstance>(color.rotate(180));
expectType<ColorInstance>(color.rotate(-90));
expectType<ColorInstance>(color.mix(Color('yellow')));
expectType<ColorInstance>(color.mix(Color('yellow'), 0.3));

// Chaining
expectType<ColorInstance>(color.green(100).grayscale().lighten(0.6));
expectType<string>(color.hsl().rgb().hex());
expectType<number>(color.hsl().rgb().gray());
