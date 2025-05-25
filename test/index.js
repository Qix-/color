/* eslint-env node, mocha */

import assert from 'node:assert';
import Color from '../index.js';

const {deepEqual} = assert;
const {equal} = assert;
const {ok} = assert;
const {notStrictEqual} = assert;
const {throws} = assert;

it('Color() instance', () => {
	equal(new Color('red').red(), 255);
	ok((new Color()) instanceof Color);
	const c = Color();
	notStrictEqual(c.rgb(), c.rgb());
});

it('Color() instance (null)', () => {
	ok((new Color(null)) instanceof Color);
});

it('Color() instance (undefined)', () => {
	ok((new Color(undefined)) instanceof Color);
});

it('Immutability', () => {
	const c = Color(0xFF0000);
	ok(c !== c.rgb());
	ok(c != c.rgb()); // eslint-disable-line eqeqeq
});

it('Colors to JSON', () => {
	deepEqual(Color('#0A1E19').rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('rgb(10, 30, 25)').rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('rgba(10, 30, 25, 0.4)').rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 0.4,
	});
	deepEqual(Color('rgb(4%, 12%, 10%)').rgb().toJSON(), {
		color: [10, 31, 26],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('rgba(4%, 12%, 10%, 0.4)').rgb().toJSON(), {
		color: [10, 31, 26],
		model: 'rgb',
		valpha: 0.4,
	});
	deepEqual(Color('blue').rgb().toJSON(), {
		color: [0, 0, 255],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color('hsl(120, 50%, 60%)').hsl().toJSON(), {
		color: [120, 50, 60],
		model: 'hsl',
		valpha: 1,
	});
	deepEqual(Color('hsla(120, 50%, 60%, 0.4)').hsl().toJSON(), {
		color: [120, 50, 60],
		model: 'hsl',
		valpha: 0.4,
	});
	deepEqual(Color('hwb(120, 50%, 60%)').hwb().toJSON(), {
		color: [120, 50, 60],
		model: 'hwb',
		valpha: 1,
	});
	deepEqual(Color('hwb(120, 50%, 60%, 0.4)').hwb().toJSON(), {
		color: [120, 50, 60],
		model: 'hwb',
		valpha: 0.4,
	});

	deepEqual(Color({
		r: 10,
		g: 30,
		b: 25,
	}).rgb().toJSON(), {
		color: [10, 30, 25],
		model: 'rgb',
		valpha: 1,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		l: 25,
	}).hsl().toJSON(), {
		color: [10, 30, 25],
		model: 'hsl',
		valpha: 1,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		v: 25,
	}).hsv().toJSON(), {
		color: [10, 30, 25],
		model: 'hsv',
		valpha: 1,
	});
	deepEqual(Color({
		h: 10,
		w: 30,
		b: 25,
	}).hwb().toJSON(), {
		color: [10, 30, 25],
		model: 'hwb',
		valpha: 1,
	});
	deepEqual(Color({
		c: 10,
		m: 30,
		y: 25,
		k: 10,
	}).cmyk().toJSON(), {
		color: [10, 30, 25, 10],
		model: 'cmyk',
		valpha: 1,
	});
});

it('Color() argument', () => {
	deepEqual(Color('#0A1E19').rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color('rgb(10, 30, 25)').rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color('rgba(10, 30, 25, 0.4)').rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});
	deepEqual(Color('rgb(4%, 12%, 10%)').rgb().object(), {
		r: 10,
		g: 31,
		b: 26,
	});
	deepEqual(Color('rgba(4%, 12%, 10%, 0.4)').rgb().object(), {
		r: 10,
		g: 31,
		b: 26,
		alpha: 0.4,
	});
	deepEqual(Color('blue').rgb().object(), {
		r: 0,
		g: 0,
		b: 255,
	});
	deepEqual(Color('hsl(120, 50%, 60%)').hsl().object(), {
		h: 120,
		s: 50,
		l: 60,
	});
	deepEqual(Color('hsla(120, 50%, 60%, 0.4)').hsl().object(), {
		h: 120,
		s: 50,
		l: 60,
		alpha: 0.4,
	});
	deepEqual(Color('hwb(120, 50%, 60%)').hwb().object(), {
		h: 120,
		w: 50,
		b: 60,
	});
	deepEqual(Color('hwb(120, 50%, 60%, 0.4)').hwb().object(), {
		h: 120,
		w: 50,
		b: 60,
		alpha: 0.4,
	});

	deepEqual(Color({
		r: 10,
		g: 30,
		b: 25,
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		l: 25,
	}).hsl().object(), {
		h: 10,
		s: 30,
		l: 25,
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		v: 25,
	}).hsv().object(), {
		h: 10,
		s: 30,
		v: 25,
	});
	deepEqual(Color({
		h: 10,
		w: 30,
		b: 25,
	}).hwb().object(), {
		h: 10,
		w: 30,
		b: 25,
	});
	deepEqual(Color({
		c: 10,
		m: 30,
		y: 25,
		k: 10,
	}).cmyk().object(), {
		c: 10,
		m: 30,
		y: 25,
		k: 10,
	});
});

it('Setters', () => {
	deepEqual(Color.rgb(10, 30, 25).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb(10, 30, 25, 0.4).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});
	deepEqual(Color.rgb([10, 30, 25]).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb([10, 30, 25, 0.4]).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});
	deepEqual(Color.rgb({
		r: 10,
		g: 30,
		b: 25,
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb({
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4,
	});

	deepEqual(Color.hsl([260, 10, 10]).hsl().object(), {
		h: 260,
		s: 10,
		l: 10,
	});
	deepEqual(Color.hsv([260, 10, 10]).hsv().object(), {
		h: 260,
		s: 10,
		v: 10,
	});
	deepEqual(Color.hwb([260, 10, 10]).hwb().object(), {
		h: 260,
		w: 10,
		b: 10,
	});
	deepEqual(Color.cmyk([10, 10, 10, 10]).cmyk().object(), {
		c: 10,
		m: 10,
		y: 10,
		k: 10,
	});
});

it('Retain Alpha', () => {
	equal(Color.rgb(1, 2, 3, 0.4).ansi256().rgb().alpha(), 0.4);
});

it('Translations', () => {
	deepEqual(Color.rgb(10, 30, 25).rgb().round().object(), {
		r: 10,
		g: 30,
		b: 25,
	});
	deepEqual(Color.rgb(10, 30, 25).hsl().round().object(), {
		h: 165,
		s: 50,
		l: 8,
	});
	deepEqual(Color.rgb(10, 30, 25).hsv().round().object(), {
		h: 165,
		s: 67,
		v: 12,
	});
	deepEqual(Color.rgb(10, 30, 25).hwb().round().object(), {
		h: 165,
		w: 4,
		b: 88,
	});
	deepEqual(Color.rgb(10, 30, 25).cmyk().round().object(), {
		c: 67,
		m: 0,
		y: 17,
		k: 88,
	});
});

it('Output to string (default rounding to 1)', () => {
	deepEqual(Color.rgb(10, 30, 25).rgb().string(), 'rgb(10, 30, 25)');
	deepEqual(Color.rgb(10, 30, 25).hsl().string(), 'hsl(165, 50%, 7.8%)');
	deepEqual(Color.rgb(10, 30, 25).hwb().string(), 'hwb(165, 3.9%, 88.2%)');
});

it('Output to string (rounding to 0)', () => {
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hsl().string(0), 'hsl(164, 48%, 8%)');
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hwb().string(0), 'hwb(164, 4%, 88%)');
});

it('Output to string (rounding to 1)', () => {
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hsl().string(1), 'hsl(164.5, 48.5%, 8%)');
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hwb().string(1), 'hwb(164.5, 4.1%, 88.1%)');
});

it('Output to string (rounding to 2)', () => {
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hsl().string(2), 'hsl(164.5, 48.46%, 7.99%)');
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hwb().string(2), 'hwb(164.5, 4.12%, 88.14%)');
});

it('Output to string (rounding to 3)', () => {
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hsl().string(3), 'hsl(164.499, 48.46%, 7.99%)');
	deepEqual(Color.hsl(164.4992, 48.46, 7.99).hwb().string(3), 'hwb(164.499, 4.118%, 88.138%)');
	deepEqual(Color.hsl(165, 50, 8).hwb().string(3), 'hwb(165, 4%, 88%)'); // No superfluous zeros.
});

it('Output to string (rgba)', () => {
	equal(Color.rgb(10, 30, 25, 0.5).toString(), 'rgba(10, 30, 25, 0.5)');
});

it('Output to string (hsl)', () => {
	equal(Color.hsl(165, 50, 8).toString(), 'hsl(165, 50%, 8%)');
});

it('Output to string (hsla)', () => {
	equal(Color.hsl(165, 50, 8, 0.3).toString(), 'hsla(165, 50%, 8%, 0.3)');
});

it('Output to string (hwb)', () => {
	equal(Color.hwb(165, 4, 88).toString(), 'hwb(165, 4%, 88%)');
});

it('Output to string (hwb with alpha)', () => {
	equal(Color.hwb(165, 4, 88, 0.7).toString(), 'hwb(165, 4%, 88%, 0.7)');
});

it('Output to string (toString and string consistency)', () => {
	const color = Color.rgb(255, 128, 64, 0.8);
	equal(color.toString(), color.string());
});

it('Array getters', () => {
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30,
	}).rgb().array(), [10, 20, 30]);
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30,
	}).unitArray(), [10 / 255, 20 / 255, 30 / 255]);
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.5,
	}).unitArray(), [10 / 255, 20 / 255, 30 / 255, 0.5]);
	deepEqual(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hsl().array(), [10, 20, 30]);
	deepEqual(Color({
		h: 10,
		s: 20,
		v: 30,
	}).hsv().array(), [10, 20, 30]);
	deepEqual(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hwb().array(), [10, 20, 30]);
	deepEqual(Color({
		c: 10,
		m: 20,
		y: 30,
		k: 40,
	}).cmyk().array(), [10, 20, 30, 40]);
});

it('Multiple times', () => {
	const color = Color({
		r: 10,
		g: 20,
		b: 30,
	});
	deepEqual(color.rgb().array(), [10, 20, 30]);
	deepEqual(color.rgb().array(), [10, 20, 30]);
});

it('Channel getters/setters', () => {
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.4,
	}).alpha(), 0.4);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.4,
	}).alpha(0.7).alpha(), 0.7);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).red(), 10);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).red(100).red(), 100);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).green(), 20);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).green(200).green(), 200);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).blue(), 30);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
	}).blue(60).blue(), 60);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(100).hue(), 100);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(100).hue(), 100);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		s: 20,
		l: 30,
	}).hue(460).hue(), 100);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(), 10);
	equal(Color({
		h: 10,
		w: 20,
		b: 30,
	}).hue(-260).hue(), 100);
});

it('Setting the same value', () => {
	const colorString = '#BADA55';
	const color = Color(colorString);
	const alpha = color.alpha();
	const red = color.red();
	const green = color.green();
	const blue = color.blue();
	const hue = color.hue();
	const saturation = color.saturationl();
	const saturationv = color.saturationv();
	const lightness = color.lightness();
	const whiteness = color.white();
	const blackness = color.wblack();
	const cyan = color.cyan();
	const magenta = color.magenta();
	const yellow = color.yellow();
	const black = color.black();

	equal(color.hex(), colorString);

	color.alpha(alpha);
	equal(color.alpha(), alpha);
	equal(color.hex(), colorString);

	color.red(red);
	equal(color.red(), red);
	equal(color.hex(), colorString);

	color.green(green);
	equal(color.green(), green);
	equal(color.hex(), colorString);

	color.blue(blue);
	equal(color.blue(), blue);
	equal(color.hex(), colorString);

	color.hue(hue);
	equal(color.hue(), hue);
	equal(color.hex(), colorString);

	color.saturationl(saturation);
	equal(color.saturationl(), saturation);
	equal(color.hex(), colorString);

	color.saturationv(saturationv);
	equal(color.saturationv(), saturationv);
	equal(color.hex(), colorString);

	color.lightness(lightness);
	equal(color.lightness(), lightness);
	equal(color.hex(), colorString);

	color.white(whiteness);
	equal(color.white(), whiteness);
	equal(color.hex(), colorString);

	color.wblack(blackness);
	equal(color.wblack(), blackness);
	equal(color.hex(), colorString);

	color.cyan(cyan);
	equal(color.cyan(), cyan);
	equal(color.hex(), colorString);

	color.magenta(magenta);
	equal(color.magenta(), magenta);
	equal(color.hex(), colorString);

	color.yellow(yellow);
	equal(color.yellow(), yellow);
	equal(color.hex(), colorString);

	color.black(black);
	equal(color.black(), black);
	equal(color.hex(), colorString);
});

it('Capping values', () => {
	equal(Color({
		h: 400,
		s: 50,
		l: 10,
	}).hue(), 40);
	equal(Color({
		h: 100,
		s: 50,
		l: 80,
	}).lighten(0.5).lightness(), 100);
	equal(Color({
		h: -400,
		s: 50,
		l: 10,
	}).hue(), 320);

	// 0 == 360
	equal(Color({
		h: 400,
		w: 50,
		b: 10,
	}).hue(), 40);
	equal(Color({
		h: 100,
		w: 50,
		b: 80,
	}).blacken(0.5).wblack(), 100);
	equal(Color({
		h: -400,
		w: 50,
		b: 10,
	}).hue(), 320);

	equal(Color().red(400).red(), 255);
	equal(Color().red(-400).red(), 0);
	equal(Color.rgb(10, 10, 10, 12).alpha(), 1);
	equal(Color.rgb(10, 10, 10, -200).alpha(), 0);
	equal(Color().alpha(-12).alpha(), 0);
	equal(Color().alpha(3).alpha(), 1);
});

it('Translate with channel setters', () => {
	deepEqual(Color({
		r: 0,
		g: 0,
		b: 0,
	}).lightness(50).hsl().object(), {
		h: 0,
		s: 0,
		l: 50,
	});
	deepEqual(Color({
		r: 0,
		g: 0,
		b: 0,
	}).red(50).green(50).hsv().round().object(), {
		h: 60,
		s: 100,
		v: 20,
	});
});

it('CSS String getters', () => {
	equal(Color('rgb(10, 30, 25)').hex(), '#0A1E19');
	equal(Color('rgb(10, 30, 25, .5)').hex(), '#0A1E19');
	equal(Color('rgb(10, 30, 25, 1)').hexa(), '#0A1E19FF');
	equal(Color('rgb(10, 30, 25, 0.4)').hexa(), '#0A1E1966');
	equal(Color('rgb(10, 30, 25, 0)').hexa(), '#0A1E1900');
	equal(Color('rgb(10, 30, 25, 0.01)').hexa(), '#0A1E1903');
	equal(Color('rgb(10, 30, 25)').rgb().string(), 'rgb(10, 30, 25)');
	equal(Color('rgb(10, 30, 25, 0.4)').rgb().string(), 'rgba(10, 30, 25, 0.4)');
	equal(Color('rgb(10, 30, 25)').percentString(), 'rgb(4%, 12%, 10%)');
	equal(Color('rgb(10, 30, 25, 0.3)').percentString(), 'rgba(4%, 12%, 10%, 0.3)');
	equal(Color('rgb(10, 30, 25)').hsl().string(), 'hsl(165, 50%, 7.8%)');
	equal(Color('rgb(10, 30, 25, 0.3)').hsl().string(), 'hsla(165, 50%, 7.8%, 0.3)');
	equal(Color({
		h: 0,
		s: 0,
		v: 100,
	}).hsl().string(), 'hsl(0, 0%, 100%)');
	equal(Color('rgb(10, 30, 25)').hwb().string(0), 'hwb(165, 4%, 88%)');
	equal(Color('rgb(10, 30, 25, 0.3)').hwb().string(0), 'hwb(165, 4%, 88%, 0.3)');
	equal(Color('rgb(0, 0, 255)').keyword(), 'blue');
	equal(Color.rgb(155.5, 243.1555, 88.1999).string(), 'rgb(156, 243, 88)');
});

it('Number getters', () => {
	equal(Color('rgb(10, 30, 25)').rgbNumber(), 0xA_1E_19);
});

it('luminosity, etc.', () => {
	equal(Color('white').luminosity(), 1);
	equal(Color('black').luminosity(), 0);
	equal(Color('red').luminosity(), 0.2126);
	equal(Color('white').contrast(Color('black')), 21);
	equal(Math.round(Color('white').contrast(Color('red'))), 4);
	equal(Math.round(Color('red').contrast(Color('white'))), 4);
	equal(Color('blue').contrast(Color('blue')), 1);
	ok(Color('black').isDark());
	ok(!Color('black').isLight());
	ok(Color('white').isLight());
	ok(!Color('white').isDark());
	ok(Color('blue').isDark());
	ok(Color('darkgreen').isDark());
	ok(Color('pink').isLight());
	ok(Color('goldenrod').isLight());
	ok(Color('red').isDark());
});

it('Manipulators wo/ mix', () => {
	deepEqual(Color({
		r: 67,
		g: 122,
		b: 134,
	}).grayscale().rgb().round().object(), {
		r: 107,
		g: 107,
		b: 107,
	});
	deepEqual(Color({
		r: 67,
		g: 122,
		b: 134,
	}).negate().rgb().round().object(), {
		r: 188,
		g: 133,
		b: 121,
	});
	equal(Color({
		h: 100,
		s: 50,
		l: 60,
	}).lighten(0.5).lightness(), 90);
	equal(Color({
		h: 100,
		s: 50,
		l: 60,
	}).darken(0.5).lightness(), 30);
	equal(Color({
		h: 100,
		w: 50,
		b: 60,
	}).whiten(0.5).white(), 75);
	equal(Color({
		h: 100,
		w: 50,
		b: 60,
	}).blacken(0.5).wblack(), 90);
	equal(Color({
		h: 100,
		s: 40,
		l: 50,
	}).saturate(0.5).saturationl(), 60);
	equal(Color({
		h: 100,
		s: 80,
		l: 60,
	}).desaturate(0.5).saturationl(), 40);
	equal(Color({
		r: 10,
		g: 10,
		b: 10,
		alpha: 0.8,
	}).fade(0.5).alpha(), 0.4);
	equal(Color({
		r: 10,
		g: 10,
		b: 10,
		alpha: 0.5,
	}).opaquer(0.5).alpha(), 0.75);
	equal(Color({
		h: 60,
		s: 0,
		l: 0,
	}).rotate(180).hue(), 240);
	equal(Color({
		h: 60,
		s: 0,
		l: 0,
	}).rotate(-180).hue(), 240);
});

it('Mix: basic', () => {
	equal(Color('#f00').mix(Color('#00f')).hex(), '#800080');
});

it('Mix: weight', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.25).hex(), '#BF0040');
});

it('Mix: alpha', () => {
	equal(Color('rgba(255, 0, 0, 0.5)').mix(Color('#00f')).rgb().string(0), 'rgba(64, 0, 191, 0.75)');
});

it('Mix: 0%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0).hex(), '#FF0000');
});

it('Mix: 25%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.25).hex(), '#BF0040');
});

it('Mix: 50%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.5).hex(), '#800080');
});

it('Mix: 75%', () => {
	equal(Color('#f00').mix(Color('#00f'), 0.75).hex(), '#4000BF');
});

it('Mix: 100%', () => {
	equal(Color('#f00').mix(Color('#00f'), 1).hex(), '#0000FF');
});

it('Level', () => {
	equal(Color('white').level(Color('black')), 'AAA');
	equal(Color('grey').level(Color('black')), 'AA');
});

it('Exceptions', () => {
	throws(() => {
		Color('unknow');
	}, /Unable to parse color from string/);

	throws(() => {
		Color({});
	}, /Unable to parse color from object/);

	throws(() => {
		Color('');
	}, /Unable to parse color from string/);
});

it('Should parse alphas in RGBA hex notation correctly', () => {
	// Tests for regression of #174
	notStrictEqual(
		Color('#000000ab').alpha(),
		Color('#000000aa').alpha(),
	);
});

it('Should round to integers with round', () => {
	deepEqual(Color.rgb(10.7, 30.2, 25.9).round().rgb().object(), {
		r: 11,
		g: 30,
		b: 26,
	});

	deepEqual(Color.rgb(255.4, 128.6, 0.1).round().rgb().object(), {
		r: 255,
		g: 129,
		b: 0,
	});

	deepEqual(Color.rgb(10.7, 30.2, 25.9, 0.456).round().rgb().object(), {
		r: 11,
		g: 30,
		b: 26,
		alpha: 0.456,
	});

	deepEqual(Color.hsl(164.7, 48.3, 7.8).round().hsl().object(), {
		h: 165,
		s: 48,
		l: 8,
	});

	deepEqual(Color.hsv(164.7, 48.3, 7.8).round().hsv().object(), {
		h: 165,
		s: 48,
		v: 8,
	});

	deepEqual(Color.hwb(164.7, 48.3, 7.8).round().hwb().object(), {
		h: 165,
		w: 48,
		b: 8,
	});

	deepEqual(Color.cmyk(10.7, 30.2, 25.9, 15.4).round().cmyk().object(), {
		c: 11,
		m: 30,
		y: 26,
		k: 15,
	});
});

it('Should round deterministically', () => {
	const color = Color.rgb(10.7, 30.2, 25.9);
	const rounded1 = color.round();
	const rounded2 = color.round();
	ok(rounded1 !== rounded2);
	deepEqual(rounded1.rgb().object(), rounded2.rgb().object());
});

it('Should return arbitrary-precision strings with toFixed (precision 0)', () => {
	deepEqual(Color.rgb(10.789, 30.234, 25.567).toFixed(0), ['11', '30', '26']);
});

it('Should return arbitrary-precision strings with toFixed (precision 1, default)', () => {
	deepEqual(Color.rgb(10.789, 30.234, 25.567).toFixed(1), ['10.8', '30.2', '25.6']);

	// eslint-disable-next-line unicorn/require-number-to-fixed-digits-argument
	deepEqual(Color.rgb(10.789, 30.234, 25.567).toFixed(), ['10.8', '30.2', '25.6']);
});

it('Should return arbitrary-precision strings with toFixed (precision 2)', () => {
	deepEqual(Color.rgb(10.789, 30.234, 25.567).toFixed(2), ['10.79', '30.23', '25.57']);
});

it('Should return arbitrary-precision strings with toFixed (precision 3)', () => {
	deepEqual(Color.rgb(10.789, 30.234, 25.567).toFixed(3), ['10.789', '30.234', '25.567']);
});

it('Should remove trailing zeros when using toFixed', () => {
	// eslint-disable-next-line unicorn/no-zero-fractions
	deepEqual(Color.rgb(10.0, 30.100, 25.000).toFixed(2), ['10', '30.1', '25']);
});

it('Should return arbitrary-precision strings with toFixed regardless of the color model', () => {
	deepEqual(Color.hsl(164.789, 48.234, 7.567).toFixed(1), ['164.8', '48.2', '7.6']);
	deepEqual(Color.hsv(164.789, 48.234, 7.567).toFixed(2), ['164.79', '48.23', '7.57']);
	deepEqual(Color.hwb(164.789, 48.234, 7.567).toFixed(0), ['165', '48', '8']);
	deepEqual(Color.cmyk(10.789, 30.234, 25.567, 15.123).toFixed(1), ['10.8', '30.2', '25.6', '15.1']);
});

it('Should not mutate the original color when calling toFixed', () => {
	const color = Color.rgb(10.789, 30.234, 25.567);
	const fixed = color.toFixed(2);
	deepEqual(fixed, ['10.79', '30.23', '25.57']);
	equal(color.red(), 10.789);
});
