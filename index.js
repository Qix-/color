/* MIT license */
var convert = require('color-convert');
var string = require('color-string');

var isAnyFieldsNotUndefined = function (obj, fields) {
	return fields.reduce(function (acc, field) {
		return acc || field in obj;
	}, undefined);
};

var setValuesMap = {
	rgb: ['r', 'red'],
	hsl: ['l', 'lightness'],
	hsv: ['v', 'value'],
	hwb: ['w', 'whiteness'],
	cmyk: ['c', 'cyan']
};

var extractSetValuesParam = function (obj) {
	return Object.keys(setValuesMap).reduce(function (acc, key) {
		if (!acc && isAnyFieldsNotUndefined(obj, setValuesMap[key])) {
			return key;
		}
		return acc;
	}, undefined);
};

var cloneValues = function (values) {
	return Object.keys(values).reduce(function (acc, key) {
		acc[key] = Array.isArray(values[key]) ? values[key].slice(0) : values[key];
		return acc;
	}, {});
};

var spaces = {
	rgb: ['red', 'green', 'blue'],
	hsl: ['hue', 'saturation', 'lightness'],
	hsv: ['hue', 'saturation', 'value'],
	hwb: ['hue', 'whiteness', 'blackness'],
	cmyk: ['cyan', 'magenta', 'yellow', 'black']
};

var maxes = {
	rgb: [255, 255, 255],
	hsl: [360, 100, 100],
	hsv: [360, 100, 100],
	hwb: [360, 100, 100],
	cmyk: [100, 100, 100, 100]
};

var setValues = function (values, space, vals) {
	var i;
	var alpha = 1;
	if (space === 'alpha') {
		alpha = vals;
	} else if (vals.length) {
		// [10, 10, 10]
		values[space] = vals.slice(0, space.length);
		alpha = vals[space.length];
	} else if (vals[space.charAt(0)] !== undefined) {
		// {r: 10, g: 10, b: 10}
		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[space.charAt(i)];
		}

		alpha = vals.a;
	} else if (vals[spaces[space][0]] !== undefined) {
		// {red: 10, green: 10, blue: 10}
		var chans = spaces[space];

		for (i = 0; i < space.length; i++) {
			values[space][i] = vals[chans[i]];
		}

		alpha = vals.alpha;
	}

	values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));

	if (space === 'alpha') {
		// ?nothing here
		return values;
	}

	var capped;

	// cap values of the space prior converting all values
	for (i = 0; i < space.length; i++) {
		capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
		values[space][i] = Math.round(capped);
	}

	// convert to all the other color spaces
	for (var sname in spaces) {
		if (sname !== space) {
			values[sname] = convert[space][sname](values[space]);
		}

		// cap values
		for (i = 0; i < sname.length; i++) {
			capped = Math.max(0, Math.min(maxes[sname][i], values[sname][i]));
			values[sname][i] = Math.round(capped);
		}
	}

	return values;
};

var extractColorString = function (spaceResult, stringFunc, stringFuncArg) {
	var stringFuncRes = stringFunc.call(string, stringFuncArg);
	return stringFuncRes ? {space: spaceResult, vals: stringFuncRes} : undefined;
};

var Color = function (obj) {
	if (obj instanceof Color) {
		return obj;
	}
	if (!(this instanceof Color)) {
		return new Color(obj);
	}

	var initialValues = {
		rgb: [0, 0, 0],
		hsl: [0, 0, 0],
		hsv: [0, 0, 0],
		hwb: [0, 0, 0],
		cmyk: [0, 0, 0, 0],
		alpha: 1
	};
	// parse Color() argument
	var stringVals;
	var setValsParam;

	if (typeof obj === 'string') {
		stringVals = extractColorString('rgb', string.getRgba, obj) ||
				extractColorString('hsl', string.getHsla, obj) ||
				extractColorString('hwb', string.getHwb, obj) || undefined;
		if (!stringVals) {
			throw new Error('Unable to parse color from string "' + obj + '"');
		}
		this.values = setValues(initialValues, stringVals.space, stringVals.vals);
	} else if (typeof obj === 'object') {
		setValsParam = extractSetValuesParam(obj);
		if (!setValsParam) {
			throw new Error('Unable to parse color from object ' + JSON.stringify(obj) + ' setvals param: ' + setValsParam);
		}
		this.values = setValues(initialValues, setValsParam, obj);
	} else {
		this.values = initialValues;
	}
};

var createNewColorInstance = function (initialValues) {
	return Object.create(Color.prototype, {
		values: {
			get: function () {
				return initialValues;
			}
		}
	});
};

var createNewColorInstanceFromValues = function (fromValues, space, vals) {
	var clonedValues = setValues(cloneValues(fromValues), space, vals);
	return createNewColorInstance(clonedValues);
};

var valueSpaceOperator = function (space, index, multiplier) {
	return function (ratio) {
		var clonedValues = cloneValues(this.values);
		clonedValues[space][index] += clonedValues[space][index] * ratio * multiplier;
		return createNewColorInstance(setValues(clonedValues, space, clonedValues[space]));
	};
};

var DARKEN_LIGHTEN_HSL_INDEX = 2;
var SAT_DESAT_HSL_INDEX = 1;
var WHITHEN_HWB_INDEX = 1;
var DARKEN_HWB_INDEX = 2;
var NEG_MULTIPLIER = -1;
var POS_MULTIPLIER = 1;

Color.prototype = {
	rgb: function () {
		return this.setSpace('rgb', arguments);
	},
	hsl: function () {
		return this.setSpace('hsl', arguments);
	},
	hsv: function () {
		return this.setSpace('hsv', arguments);
	},
	hwb: function () {
		return this.setSpace('hwb', arguments);
	},
	cmyk: function () {
		return this.setSpace('cmyk', arguments);
	},

	rgbArray: function () {
		return this.values.rgb;
	},
	hslArray: function () {
		return this.values.hsl;
	},
	hsvArray: function () {
		return this.values.hsv;
	},
	hwbArray: function () {
		if (this.values.alpha !== 1) {
			return this.values.hwb.concat([this.values.alpha]);
		}
		return this.values.hwb;
	},
	cmykArray: function () {
		return this.values.cmyk;
	},
	rgbaArray: function () {
		var rgb = this.values.rgb;
		return rgb.concat([this.values.alpha]);
	},
	hslaArray: function () {
		var hsl = this.values.hsl;
		return hsl.concat([this.values.alpha]);
	},
	alpha: function (val) {
		if (val === undefined) {
			return this.values.alpha;
		}
		return createNewColorInstance(setValues(this.values, 'alpha', val));
	},

	red: function (val) {
		return this.setChannel('rgb', 0, val);
	},
	green: function (val) {
		return this.setChannel('rgb', 1, val);
	},
	blue: function (val) {
		return this.setChannel('rgb', 2, val);
	},
	hue: function (val) {
		if (val) {
			val %= 360;
			val = val < 0 ? 360 + val : val;
		}
		return this.setChannel('hsl', 0, val);
	},
	saturation: function (val) {
		return this.setChannel('hsl', 1, val);
	},
	lightness: function (val) {
		return this.setChannel('hsl', 2, val);
	},
	saturationv: function (val) {
		return this.setChannel('hsv', 1, val);
	},
	whiteness: function (val) {
		return this.setChannel('hwb', 1, val);
	},
	blackness: function (val) {
		return this.setChannel('hwb', 2, val);
	},
	value: function (val) {
		return this.setChannel('hsv', 2, val);
	},
	cyan: function (val) {
		return this.setChannel('cmyk', 0, val);
	},
	magenta: function (val) {
		return this.setChannel('cmyk', 1, val);
	},
	yellow: function (val) {
		return this.setChannel('cmyk', 2, val);
	},
	black: function (val) {
		return this.setChannel('cmyk', 3, val);
	},

	hexString: function () {
		return string.hexString(this.values.rgb);
	},
	rgbString: function () {
		return string.rgbString(this.values.rgb, this.values.alpha);
	},
	rgbaString: function () {
		return string.rgbaString(this.values.rgb, this.values.alpha);
	},
	percentString: function () {
		return string.percentString(this.values.rgb, this.values.alpha);
	},
	hslString: function () {
		return string.hslString(this.values.hsl, this.values.alpha);
	},
	hslaString: function () {
		return string.hslaString(this.values.hsl, this.values.alpha);
	},
	hwbString: function () {
		return string.hwbString(this.values.hwb, this.values.alpha);
	},
	keyword: function () {
		return string.keyword(this.values.rgb, this.values.alpha);
	},

	rgbNumber: function () {
		return (this.values.rgb[0] << 16) | (this.values.rgb[1] << 8) | this.values.rgb[2];
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.values.rgb;
		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}
		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();
		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}
		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	dark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.values.rgb;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	light: function () {
		return !this.dark();
	},

	negate: function () {
		var rgb = [];
		for (var i = 0; i < 3; i++) {
			rgb[i] = 255 - this.values.rgb[i];
		}
		return createNewColorInstance(setValues(cloneValues(this.values), 'rgb', rgb));
	},

	lighten: valueSpaceOperator('hsl', DARKEN_LIGHTEN_HSL_INDEX, POS_MULTIPLIER),

	darken: valueSpaceOperator('hsl', DARKEN_LIGHTEN_HSL_INDEX, NEG_MULTIPLIER),

	saturate: valueSpaceOperator('hsl', SAT_DESAT_HSL_INDEX, POS_MULTIPLIER),

	desaturate: valueSpaceOperator('hsl', SAT_DESAT_HSL_INDEX, NEG_MULTIPLIER),

	whiten: valueSpaceOperator('hwb', WHITHEN_HWB_INDEX, POS_MULTIPLIER),

	blacken: valueSpaceOperator('hwb', DARKEN_HWB_INDEX, POS_MULTIPLIER),

	greyscale: function () {
		var clonedValues = cloneValues(this.values);
		var rgb = clonedValues.rgb;
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return createNewColorInstance(setValues(clonedValues, 'rgb', [val, val, val]));
	},

	clearer: function (ratio) {
		var clonedValues = cloneValues(this.values);
		return createNewColorInstance(setValues(clonedValues, 'alpha', this.values.alpha - (this.values.alpha * ratio)));
	},

	opaquer: function (ratio) {
		var clonedValues = cloneValues(this.values);
		return createNewColorInstance(setValues(clonedValues, 'alpha', this.values.alpha + (this.values.alpha * ratio)));
	},

	rotate: function (degrees) {
		var clonedValues = cloneValues(this.values);
		var hue = clonedValues.hsl[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		clonedValues.hsl[0] = hue;
		return createNewColorInstance(setValues(clonedValues, 'hsl', clonedValues.hsl));
	},

	/**
	 * Ported from sass implementation in C
	 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
	 */
	mix: function (mixinColor, weight) {
		var color1 = this;
		var color2 = mixinColor;
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return this
			.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue()
			)
			.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
	},

	toJSON: function () {
		return this.rgb();
	},

	clone: function () {
		return createNewColorInstance(cloneValues(this.values));
	}
};

Color.prototype.setChannel = function (space, index, val) {
	if (val === undefined) {
		// color.red() , we need to fix this, this is wrong
		return this.values[space][index];
	}
	if (val === this.values[space][index]) {
		// color.red(color.red())
		return this;
	}

	var clonedValues = cloneValues(this.values);
	// color.red(100)
	clonedValues[space][index] = val;
	clonedValues = setValues(clonedValues, space, clonedValues[space]);
	return createNewColorInstance(clonedValues);
};

Color.prototype.getValues = function (space) {
	var vals = {};

	for (var i = 0; i < space.length; i++) {
		vals[space.charAt(i)] = this.values[space][i];
	}

	if (this.values.alpha !== 1) {
		vals.a = this.values.alpha;
	}

	// {r: 255, g: 255, b: 255, a: 0.4}
	return vals;
};

Color.prototype.setSpace = function (space, args) {
	var vals = args[0];
	if (vals === undefined) {
		// color.rgb()
		return this.getValues(space);
	}

	// color.rgb(10, 10, 10)
	if (typeof vals === 'number') {
		vals = Array.prototype.slice.call(args);
	}
	return createNewColorInstanceFromValues(this.values, space, vals);
};

Color.prototype.setValues = function (space, vals) {
	return createNewColorInstanceFromValues(this.values, space, vals);
};

module.exports = Color;
