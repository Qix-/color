/* eslint-env node, mocha */

var assert = require('assert');
var Color = require('..');

var deepEqual = assert.deepEqual;
var equal = assert.equal;
var ok = assert.ok;
var notStrictEqual = assert.notStrictEqual;
var throws = assert.throws;

it('Color() instance', function () {
	equal(new Color('red').red(), 255);
	ok((new Color()) instanceof Color);
	var c = Color();
	notStrictEqual(c.rgb(), c.rgb());
});

it('Color() instance (null)', function () {
	ok((new Color(null)) instanceof Color);
});

it('Color() instance (undefined)', function () {
	ok((new Color(undefined)) instanceof Color);
});

it('Immutability', function () {
	var c = Color(0xFF0000);
	ok(c !== c.rgb());
	ok(c != c.rgb()); // eslint-disable-line eqeqeq
});

it('Color() argument', function () {
	deepEqual(Color('#0A1E19').rgb().object(), {
		r: 10,
		g: 30,
		b: 25
	});
	deepEqual(Color('rgb(10, 30, 25)').rgb().object(), {
		r: 10,
		g: 30,
		b: 25
	});
	deepEqual(Color('rgba(10, 30, 25, 0.4)').rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4
	});
	deepEqual(Color('rgb(4%, 12%, 10%)').rgb().object(), {
		r: 10,
		g: 31,
		b: 26
	});
	deepEqual(Color('rgba(4%, 12%, 10%, 0.4)').rgb().object(), {
		r: 10,
		g: 31,
		b: 26,
		alpha: 0.4
	});
	deepEqual(Color('blue').rgb().object(), {
		r: 0,
		g: 0,
		b: 255
	});
	deepEqual(Color('hsl(120, 50%, 60%)').hsl().object(), {
		h: 120,
		s: 50,
		l: 60
	});
	deepEqual(Color('hsla(120, 50%, 60%, 0.4)').hsl().object(), {
		h: 120,
		s: 50,
		l: 60,
		alpha: 0.4
	});
	deepEqual(Color('hwb(120, 50%, 60%)').hwb().object(), {
		h: 120,
		w: 50,
		b: 60
	});
	deepEqual(Color('hwb(120, 50%, 60%, 0.4)').hwb().object(), {
		h: 120,
		w: 50,
		b: 60,
		alpha: 0.4
	});

	deepEqual(Color({
		r: 10,
		g: 30,
		b: 25
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		l: 25
	}).hsl().object(), {
		h: 10,
		s: 30,
		l: 25
	});
	deepEqual(Color({
		h: 10,
		s: 30,
		v: 25
	}).hsv().object(), {
		h: 10,
		s: 30,
		v: 25
	});
	deepEqual(Color({
		h: 10,
		w: 30,
		b: 25
	}).hwb().object(), {
		h: 10,
		w: 30,
		b: 25
	});
	deepEqual(Color({
		c: 10,
		m: 30,
		y: 25,
		k: 10
	}).cmyk().object(), {
		c: 10,
		m: 30,
		y: 25,
		k: 10
	});
});

it('Setters', function () {
	deepEqual(Color.rgb(10, 30, 25).rgb().object(), {
		r: 10,
		g: 30,
		b: 25
	});
	deepEqual(Color.rgb(10, 30, 25, 0.4).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4
	});
	deepEqual(Color.rgb([10, 30, 25]).rgb().object(), {
		r: 10,
		g: 30,
		b: 25
	});
	deepEqual(Color.rgb([10, 30, 25, 0.4]).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4
	});
	deepEqual(Color.rgb({
		r: 10,
		g: 30,
		b: 25
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25
	});
	deepEqual(Color.rgb({
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4
	}).rgb().object(), {
		r: 10,
		g: 30,
		b: 25,
		alpha: 0.4
	});

	deepEqual(Color.hsl([260, 10, 10]).hsl().object(), {
		h: 260,
		s: 10,
		l: 10
	});
	deepEqual(Color.hsv([260, 10, 10]).hsv().object(), {
		h: 260,
		s: 10,
		v: 10
	});
	deepEqual(Color.hwb([260, 10, 10]).hwb().object(), {
		h: 260,
		w: 10,
		b: 10
	});
	deepEqual(Color.cmyk([10, 10, 10, 10]).cmyk().object(), {
		c: 10,
		m: 10,
		y: 10,
		k: 10
	});
});

it('Retain Alpha', function () {
	equal(Color.rgb(1, 2, 3, 0.4).ansi256().rgb().alpha(), 0.4);
});

it('Translations', function () {
	deepEqual(Color.rgb(10, 30, 25).rgb().round().object(), {
		r: 10,
		g: 30,
		b: 25
	});
	deepEqual(Color.rgb(10, 30, 25).hsl().round().object(), {
		h: 165,
		s: 50,
		l: 8
	});
	deepEqual(Color.rgb(10, 30, 25).hsv().round().object(), {
		h: 165,
		s: 67,
		v: 12
	});
	deepEqual(Color.rgb(10, 30, 25).hwb().round().object(), {
		h: 165,
		w: 4,
		b: 88
	});
	deepEqual(Color.rgb(10, 30, 25).cmyk().round().object(), {
		c: 67,
		m: 0,
		y: 17,
		k: 88
	});
});

it('Array getters', function () {
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30
	}).rgb().array(), [10, 20, 30]);
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30
	}).unitArray(), [10 / 255, 20 / 255, 30 / 255]);
	deepEqual(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.5
	}).unitArray(), [10 / 255, 20 / 255, 30 / 255, 0.5]);
	deepEqual(Color({
		h: 10,
		s: 20,
		l: 30
	}).hsl().array(), [10, 20, 30]);
	deepEqual(Color({
		h: 10,
		s: 20,
		v: 30
	}).hsv().array(), [10, 20, 30]);
	deepEqual(Color({
		h: 10,
		w: 20,
		b: 30
	}).hwb().array(), [10, 20, 30]);
	deepEqual(Color({
		c: 10,
		m: 20,
		y: 30,
		k: 40
	}).cmyk().array(), [10, 20, 30, 40]);
});

it('Multiple times', function () {
	var color = Color({
		r: 10,
		g: 20,
		b: 30
	});
	deepEqual(color.rgb().array(), [10, 20, 30]);
	deepEqual(color.rgb().array(), [10, 20, 30]);
});

it('Channel getters/setters', function () {
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.4
	}).alpha(), 0.4);
	equal(Color({
		r: 10,
		g: 20,
		b: 30,
		alpha: 0.4
	}).alpha(0.7).alpha(), 0.7);
	equal(Color({
		r: 10,
		g: 20,
		b: 30
	}).red(), 10);
	equal(Color({
		r: 10,
		g: 20,
		b: 30
	}).red(100).red(), 100);
	equal(Color({
		r: 10,
		g: 20,
		b: 30
	}).green(), 20);
	equal(Color({
		r: 10,
		g: 20,
		b: 30
	}).green(200).green(), 200);
	equal(Color({
		r: 10,
		g: 20,
		b: 30
	}).blue(), 30);
	equal(Color({
		r: 10,
		g: 20,
		b: 30
	}).blue(60).blue(), 60);
	equal(Color({
		h: 10,
		s: 20,
		l: 30
	}).hue(), 10);
	equal(Color({
		h: 10,
		s: 20,
		l: 30
	}).hue(100).hue(), 100);
	equal(Color({
		h: 10,
		w: 20,
		b: 30
	}).hue(), 10);
	equal(Color({
		h: 10,
		w: 20,
		b: 30
	}).hue(100).hue(), 100);
	equal(Color({
		h: 10,
		s: 20,
		l: 30
	}).hue(), 10);
	equal(Color({
		h: 10,
		s: 20,
		l: 30
	}).hue(460).hue(), 100);
	equal(Color({
		h: 10,
		w: 20,
		b: 30
	}).hue(), 10);
	equal(Color({
		h: 10,
		w: 20,
		b: 30
	}).hue(-260).hue(), 100);
});

it('Setting the same value', function () {
	var colorString = '#BADA55';
	var color = Color(colorString);
	var alpha = color.alpha();
	var red = color.red();
	var green = color.green();
	var blue = color.blue();
	var hue = color.hue();
	var saturation = color.saturationl();
	var saturationv = color.saturationv();
	var lightness = color.lightness();
	var whiteness = color.white();
	var blackness = color.wblack();
	var cyan = color.cyan();
	var magenta = color.magenta();
	var yellow = color.yellow();
	var black = color.black();

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

it('Capping values', function () {
	equal(Color({
		h: 400,
		s: 50,
		l: 10
	}).hue(), 40);
	equal(Color({
		h: 100,
		s: 50,
		l: 80
	}).lighten(0.5).lightness(), 100);
	equal(Color({
		h: -400,
		s: 50,
		l: 10
	}).hue(), 320);

	// 0 == 360
	equal(Color({
		h: 400,
		w: 50,
		b: 10
	}).hue(), 40);
	equal(Color({
		h: 100,
		w: 50,
		b: 80
	}).blacken(0.5).wblack(), 100);
	equal(Color({
		h: -400,
		w: 50,
		b: 10
	}).hue(), 320);

	equal(Color().red(400).red(), 255);
	equal(Color().red(-400).red(), 0);
	equal(Color.rgb(10, 10, 10, 12).alpha(), 1);
	equal(Color.rgb(10, 10, 10, -200).alpha(), 0);
	equal(Color().alpha(-12).alpha(), 0);
	equal(Color().alpha(3).alpha(), 1);
});

it('Translate with channel setters', function () {
	deepEqual(Color({
		r: 0,
		g: 0,
		b: 0
	}).lightness(50).hsl().object(), {
		h: 0,
		s: 0,
		l: 50
	});
	deepEqual(Color({
		r: 0,
		g: 0,
		b: 0
	}).red(50).green(50).hsv().round().object(), {
		h: 60,
		s: 100,
		v: 20
	});
});

it('CSS String getters', function () {
	equal(Color('rgb(10, 30, 25)').hex(), '#0A1E19');
	equal(Color('rgb(10, 30, 25)').rgb().string(), 'rgb(10, 30, 25)');
	equal(Color('rgb(10, 30, 25, 0.4)').rgb().string(), 'rgba(10, 30, 25, 0.4)');
	equal(Color('rgb(10, 30, 25)').percentString(), 'rgb(4%, 12%, 10%)');
	equal(Color('rgb(10, 30, 25, 0.3)').percentString(), 'rgba(4%, 12%, 10%, 0.3)');
	equal(Color('rgb(10, 30, 25)').hsl().string(), 'hsl(165, 50%, 7.8%)');
	equal(Color('rgb(10, 30, 25, 0.3)').hsl().string(), 'hsla(165, 50%, 7.8%, 0.3)');
	equal(Color({
		h: 0,
		s: 0,
		v: 100
	}).hsl().string(), 'hsl(0, 0%, 100%)');
	equal(Color('rgb(10, 30, 25)').hwb().string(0), 'hwb(165, 4%, 88%)');
	equal(Color('rgb(10, 30, 25, 0.3)').hwb().string(0), 'hwb(165, 4%, 88%, 0.3)');
	equal(Color('rgb(0, 0, 255)').keyword(), 'blue');
	equal(Color.rgb(155.5, 243.1555, 88.1999).string(), 'rgb(156, 243, 88)');
});

it('Number getters', function () {
	equal(Color('rgb(10, 30, 25)').rgbNumber(), 0xA1E19);
});

it('luminosity, etc.', function () {
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

it('Manipulators wo/ mix', function () {
	deepEqual(Color({
		r: 67,
		g: 122,
		b: 134
	}).grayscale().rgb().round().object(), {
		r: 107,
		g: 107,
		b: 107
	});
	deepEqual(Color({
		r: 67,
		g: 122,
		b: 134
	}).negate().rgb().round().object(), {
		r: 188,
		g: 133,
		b: 121
	});
	equal(Color({
		h: 100,
		s: 50,
		l: 60
	}).lighten(0.5).lightness(), 90);
	equal(Color({
		h: 100,
		s: 50,
		l: 60
	}).darken(0.5).lightness(), 30);
	equal(Color({
		h: 100,
		w: 50,
		b: 60
	}).whiten(0.5).white(), 75);
	equal(Color({
		h: 100,
		w: 50,
		b: 60
	}).blacken(0.5).wblack(), 90);
	equal(Color({
		h: 100,
		s: 40,
		l: 50
	}).saturate(0.5).saturationl(), 60);
	equal(Color({
		h: 100,
		s: 80,
		l: 60
	}).desaturate(0.5).saturationl(), 40);
	equal(Color({
		r: 10,
		g: 10,
		b: 10,
		alpha: 0.8
	}).fade(0.5).alpha(), 0.4);
	equal(Color({
		r: 10,
		g: 10,
		b: 10,
		alpha: 0.5
	}).opaquer(0.5).alpha(), 0.75);
	equal(Color({
		h: 60,
		s: 0,
		l: 0
	}).rotate(180).hue(), 240);
	equal(Color({
		h: 60,
		s: 0,
		l: 0
	}).rotate(-180).hue(), 240);
});

it('Mix: basic', function () {
	equal(Color('#f00').mix(Color('#00f')).hex(), '#800080');
});

it('Mix: weight', function () {
	equal(Color('#f00').mix(Color('#00f'), 0.25).hex(), '#BF0040');
});

it('Mix: alpha', function () {
	equal(Color('rgba(255, 0, 0, 0.5)').mix(Color('#00f')).rgb().string(0), 'rgba(64, 0, 191, 0.75)');
});

it('Mix: 0%', function () {
	equal(Color('#f00').mix(Color('#00f'), 0).hex(), '#FF0000');
});

it('Mix: 25%', function () {
	equal(Color('#f00').mix(Color('#00f'), 0.25).hex(), '#BF0040');
});

it('Mix: 50%', function () {
	equal(Color('#f00').mix(Color('#00f'), 0.5).hex(), '#800080');
});

it('Mix: 75%', function () {
	equal(Color('#f00').mix(Color('#00f'), 0.75).hex(), '#4000BF');
});

it('Mix: 100%', function () {
	equal(Color('#f00').mix(Color('#00f'), 1.0).hex(), '#0000FF');
});

it('Gradient in RGB', function () {
	deepEqual(Color('#f10').gradientRGB(Color('#02f'), 5).map(c => c.string()), [
		'rgb(255, 17, 0)',
		'rgb(191, 21, 64)',
		'rgb(128, 26, 128)',
		'rgb(64, 30, 191)',
		'rgb(0, 34, 255)'
	]);
});

it('Gradient in RGBA', function () {
	deepEqual(Color('#f30').gradientRGB(Color('#04f').alpha(0), 5).map(c => c.string()), [
		'rgb(255, 51, 0)',
		'rgba(191, 55, 64, 0.75)',
		'rgba(128, 60, 128, 0.5)',
		'rgba(64, 64, 191, 0.25)',
		'rgba(0, 68, 255, 0)'
	]);
});

it('Gradient in HSL', function () {
	deepEqual(Color('#f00').gradientHSL(Color('#080'), 4).map(c => c.string()), [
		'hsl(0, 100%, 50%)',
		'hsl(40, 100%, 42.2%)',
		'hsl(80, 100%, 34.4%)',
		'hsl(120, 100%, 26.7%)'
	]);
});

it('Gradient in HSLA', function () {
	deepEqual(Color('#f00').gradientHSL(Color('#080').alpha(0.85), 4).map(c => c.string()), [
		'hsl(0, 100%, 50%)',
		'hsla(40, 100%, 42.2%, 0.95)',
		'hsla(80, 100%, 34.4%, 0.9)',
		'hsla(120, 100%, 26.7%, 0.85)'
	]);
});

it('Gradient in HSL counterclokwise', function () {
	deepEqual(Color('#f00').gradientHSL(Color('#080'), 4, -1).map(c => c.string()), [
		'hsl(0, 100%, 50%)',
		'hsl(280, 100%, 42.2%)',
		'hsl(200, 100%, 34.4%)',
		'hsl(120, 100%, 26.7%)'
	]);
});

it('Level', function () {
	equal(Color('white').level(Color('black')), 'AAA');
	equal(Color('grey').level(Color('black')), 'AA');
});

it('Exceptions', function () {
	throws(function () {
		Color('unknow');
	}, /Unable to parse color from string/);

	throws(function () {
		Color({});
	}, /Unable to parse color from object/);

	throws(function () {
		Color('');
	}, /Unable to parse color from string/);
});
