import colorString from 'color-string';
import colorConvert from 'color-convert';

import { ColorModel, ColorObject, RgbColorObject } from "./types";
import { maxfn, zeroArray } from "./utils";

const convert = colorConvert as unknown as Record<string, { channels: number, labels: string[] }>;

const skippedModels = [
	// To be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// Gray conflicts with some method names, and has its own method defined.
	'gray',

	// Shouldn't really be in color-convert either...
	'hex',
];

const hashedModelKeys = {};
for (const model of Object.keys(convert)) {
	hashedModelKeys[[...convert[model].labels].sort().join('')] = model;
}

const limiters: Record<string, number[]> = {};

class Color {
	model = 'rgb';
	color: number[] = [0, 0, 0];
	valpha: number = 1;

	constructor (object: unknown, model?: string | null) {
		if (model && model in skippedModels) {
			model = null;
		}

		if (model && !(model in convert)) {
			throw new Error('Unknown model: ' + model);
		}

		let i: number;
		let channels: number;

		if (object === null || object === undefined) { // eslint-disable-line no-eq-null,eqeqeq
			this.model = 'rgb';
			this.color = [0, 0, 0];
			this.valpha = 1;
		} else if (object instanceof Color) {
			this.model = object.model;
			this.color = [...object.color];
			this.valpha = object.valpha;
		} else if (typeof object === 'string') {
			const result = colorString.get(object);
			if (result === null) {
				throw new Error('Unable to parse color from string: ' + object);
			}

			this.model = result.model;
			channels = convert[this.model].channels;
			this.color = result.value.slice(0, channels);
			this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
		} else if (Array.isArray(object) && object.length > 0) {
			this.model = model || 'rgb';
			channels = convert[this.model].channels;
			const newArray = Array.prototype.slice.call(object, 0, channels);
			this.color = zeroArray(newArray, channels) as number[];
			this.valpha = typeof object[channels] === 'number' ? object[channels] : 1;
		} else if (typeof object === 'number') {
			// This is always RGB - can be converted later on.
			this.model = 'rgb';
			this.color = [
				(object >> 16) & 0xFF,
				(object >> 8) & 0xFF,
				object & 0xFF,
			];
			this.valpha = 1;
		} else if (typeof object === 'object') {
			this.valpha = 1;

			const keys = Object.keys(object);
			if ('alpha' in object) {
				keys.splice(keys.indexOf('alpha'), 1);
				this.valpha = typeof object.alpha === 'number' ? object.alpha : 0;
			}

			const hashedKeys = keys.sort().join('');
			if (!(hashedKeys in hashedModelKeys)) {
				throw new Error('Unable to parse color from object: ' + JSON.stringify(object));
			}

			this.model = hashedModelKeys[hashedKeys];

			const {labels} = convert[this.model];
			const color = [];
			for (i = 0; i < labels.length; i++) {
				color.push((object as Record<string, Record<string, number[]>>)[labels[i]]);
			}

			this.color = zeroArray(color) as number[];
		}

		// Perform limitations (clamping, etc.)
		if (limiters[this.model]) {
			channels = convert[this.model].channels;
			for (i = 0; i < channels; i++) {
				const limit = limiters[this.model][i];
				if (limit) {
					this.color[i] = limit(this.color[i]);
				}
			}
		}

		this.valpha = Math.max(0, Math.min(1, this.valpha));

		if (Object.freeze) {
			Object.freeze(this);
		}
	}

	toString() {
		return this.string();
	}

	toJSON() {
		return this[this.model]();
	}

	colorStringTo (model: string, ...args: Array<number | number[]>): string {
		const to = colorString.to as Record<string, (...args: Array<number | number[]>) => string>;
		return to[model](...args);
	}

	string (places?: number) {
		let self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		const args = self.valpha === 1 ? self.color : [...self.color, this.valpha];
		return this.colorStringTo(self.model, args); //   (colorString.to as Record<string, (...args: Array<number | number[]>) => {}>)[this.model](args);
	}

	percentString( places: number) {
		const self = this.rgb().round(typeof places === 'number' ? places : 1);
		const args = self.valpha === 1 ? self.color : [...self.color, this.valpha];
		return colorString.to.rgb.percent(args);
	}

	array () {
		return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
	}

	object () {
		const result = {};
		const {channels} = convert[this.model];
		const {labels} = convert[this.model];

		for (let i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	}

	unitArray() {
		const rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	}

	unitObject() {
		const rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	}

	round (places: number) {
		places = Math.max(places || 0, 0);
		return new Color([...this.color.map(roundToPlace(places)), this.valpha], this.model);
	}

	alpha (value: unknown) {
		if (value !== undefined) {
			return new Color([...this.color, Math.max(0, Math.min(1, value))], this.model);
		}

		return this.valpha;
	},

	// Rgb
	red = getset('rgb', 0, maxfn(255));
	green = getset('rgb', 1, maxfn(255));
	blue = getset('rgb', 2, maxfn(255));

	hue = getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, value => ((value % 360) + 360) % 360);

	saturationl = getset('hsl', 1, maxfn(100));
	lightness = getset('hsl', 2, maxfn(100));

	saturationv = getset('hsv', 1, maxfn(100));
	value = getset('hsv', 2, maxfn(100));

	chroma = getset('hcg', 1, maxfn(100));
	gray = getset('hcg', 2, maxfn(100));

	white = getset('hwb', 1, maxfn(100));
	wblack = getset('hwb', 2, maxfn(100));

	cyan = getset('cmyk', 0, maxfn(100));
	magenta = getset('cmyk', 1, maxfn(100));
	yellow = getset('cmyk', 2, maxfn(100));
	black = getset('cmyk', 3, maxfn(100));

	x = getset('xyz', 0, maxfn(95.047));
	y = getset('xyz', 1, maxfn(100));
	z = getset('xyz', 2, maxfn(108.833));

	l = getset('lab', 0, maxfn(100));
	a = getset('lab', 1);
	b = Color.getset('lab', 2),

	hex (value: ColorObject) {
		if (value !== undefined) {
			return new Color(value);
		}

		return colorString.to.hex(this.rgb().round().color);
	}

	hexa (value: ColorObject) {
		if (value !== undefined) {
			return new Color(value);
		}

		const rgbArray = this.rgb().round().color;

		let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
		if (alphaHex.length === 1) {
			alphaHex = '0' + alphaHex;
		}

		return colorString.to.hex(rgbArray) + alphaHex;
	}

	rgbNumber () {
		const rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	}

	luminosity () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		const rgb = this.rgb().color;

		const lum = [];
		for (const [i, element] of rgb.entries()) {
			const chan = element / 255;
			lum[i] = (chan <= 0.04045) ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	}

	contrast (color2: Color) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		const lum1 = this.luminosity();
		const lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	}

	level (color2: Color) {
		// https://www.w3.org/TR/WCAG/#contrast-enhanced
		const contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	}

	isDark (): boolean {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		const rgb = this.rgb().color;
		const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 10000;
		return yiq < 128;
	}

	isLight (): boolean {
		return !this.isDark();
	}

	negate () {
		const rgb = this.rgb();
		for (let i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}

		return rgb;
	}

	lighten (ratio: number) {
		const hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	}

	darken (ratio: number) {
		const hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	}

	saturate (ratio: number) {
		const hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	}

	desaturate (ratio: number) {
		const hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	}

	whiten (ratio: number) {
		const hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	}

	blacken (ratio) {
		const hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	}

	grayscale () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_colour_to_grayscale
		const rgb = this.rgb().color;
		const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(value, value, value);
	}

	fade (ratio: number) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	}

	opaquer (ratio: number) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	}

	rotate (degrees: number) {
		const hsl = this.hsl();
		let hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	}

	mix (mixinColor: Color, weight: number) {
		// Ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}

		const color1 = mixinColor.rgb();
		const color2 = this.rgb();
		const p = weight === undefined ? 0.5 : weight;

		const w = 2 * p - 1;
		const a = color1.alpha() - color2.alpha();

		const w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2;
		const w2 = 1 - w1;

		return Color.rgb(
			w1 * color1.red() + w2 * color2.red(),
			w1 * color1.green() + w2 * color2.green(),
			w1 * color1.blue() + w2 * color2.blue(),
			color1.alpha() * p + color2.alpha() * (1 - p));
	}

	getset <T>(model: string[] | ColorModel, channel: number, modifier: (value: unknown) => unknown) {
		model = Array.isArray(model) ? model : [model];

		for (const m of model) {
			(limiters[m] || (limiters[m] = []))[channel] = modifier;
		}

		model = model[0];

		return (value: unknown) => {
			let result;

			if (value !== undefined) {
				if (modifier) {
					value = modifier(value);
				}

				result = this[model]();
				result.color[channel] = value;
				return result;
			}

			result = this[model]().color[channel];
			if (modifier) {
				result = modifier(result);
			}

			return result;
		};
	}
}

// TODO dynamic construction is problematic here. Would see how to
// deal with this. Maybe need to convert to explicit methods?

function init () {
	// Model conversion methods and static constructors
	for (const model of Object.keys(convert)) {
		if (skippedModels.includes(model)) {
			continue;
		}

		const {channels} = convert[model];

		// Conversion methods
		Color.prototype[model] = function (...args) {
			if (this.model === model) {
				return new Color(this);
			}

			if (args.length > 0) {
				return new Color(args, model);
			}

			return new Color([...assertArray(convert[this.model][model].raw(this.color)), this.valpha], model);
		};

		// 'static' construction methods
		Color[model] = function (...args: unknown[]) {
			let color = args[0];
			if (typeof color === 'number') {
				color = zeroArray(args, channels);
			}

			return new Color(color, model);
		};
	}
}

export default Color;
