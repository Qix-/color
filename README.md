# color [![Build Status](https://travis-ci.org/Qix-/color.svg?branch=master)](https://travis-ci.org/Qix-/color)

> JavaScript library for color conversion and manipulation.
 
`Color` objects support operations in any standard CSS colorspace (RGB/RGBA, HSL/HSLA, HWB). Many operations also support HSV and CMYK.

Once defined, `Color` objects can be manipulated using the properties of any supported colorspace, then serialized to any valid CSS string.


```js
var color = Color("#7743CE")

color.alpha(0.5).lighten(0.5)

color.cmykString()  // --> "hsla(262, 59%, 81%, 0.5)"
```

## Install

```console
$ npm install color
```

## Implement

```js
var Color = require("color")
```

### Instantiate

Call the `Color()` constructor with any of the following arguments:

* nothing: sets default values (black)
* any valid CSS color string (hex, keyword, RGB/RGBA, HSL/HSLA, HWB)
* a hash object of RGB/HSL/HWB/HSV/CMYK values

```js
// Nothing:
var color = Color() // defaults to black
// CSS strings:
var color = Color("#000")
var color = Color("black")
var color = Color("rgba(0, 0, 0, 1)")
var color = Color("hsla(0, 0%, 0%, 1)")
var color = Color("hwb(0, 0%, 100%)")
// Hash Objects:
var color = Color({r: 0, g: 0, b: 0})
var color = Color({h: 0, s: 0, l: 0})
var color = Color({h: 0, s: 0, v: 0})
var color = Color({h: 0, w: 0, b: 100})
var color = Color({c: 0, m: 0, y: 0, k: 100})
```

(If the constructor is passed an existing `Color` object, it simply returns it.)

### Getters/Setters

#### Colorspace Getters/Setters

You can use these to:

1. Obtain a hash of the numeric channel values of an existing color object 
2. Supply argument(s) to redefine the channel values, with arg(s) as:
  * a hash object
  * an ordered array
  * multiple numerics

Options:

* **rgb()**
* **hsl()**
* **hwb()**
* **hsv()**
* **cmyk()**

Examples: 

```js
// getter:
color.rgb() // --> {r: 255, g: 255, b: 255}
// setter:
color.rgb({r: 255, g: 255, b: 255})
color.rgb([255, 255, 255])
color.rgb(255, 255, 255)
```

#### Channel-Specific Getters/Setters

Obtain (or set) the numeric or percentage value for any individual channel in the RGBA/HSLA/HWB/HSV/CMYK spaces:

* **red()**   		
_(8-bit numeric: 0-255)_
* **green()** 		
_(8-bit numeric: 0-255)_
* **blue()**  		
_(8-bit numeric: 0-255)_
* **alpha()** 		
_(ratio: 0.0-1.0)_
* **hue()** 			
_(degrees: 0-360)_
* **saturationl()**  
_(percent: 0-100) (HSL-specific)_
* **saturationv()**  
_(percent: 0-100 (HSV-specific)_
* **saturation()**  
_(alias to `saturationl()`)_
* **lightness()** 	
_(percent: 0-100)_
* **value()**     	
_(percent: 0-100)_
* **blackness()** 	
_(percent: 0-100)_
* **whiteness()** 	
_(percent: 0-100)_
* **cyan()**      	
_(percent: 0-100)_
* **magenta()**   	
_(percent: 0-100)_
* **yellow()**    	
_(percent: 0-100)_
* **black()** 		
_(percent: 0-100)_


Example:
```js
color.red()       // --> 255
color.red(255)
```

#### Array Getters

Obtain an array of the numeric color values in any of the following formats/spaces:

* **rgbArray()**
* **hslArray()**
* **hwbArray()**
* **hsvArray()**
* **cmykArray()**

You can also get arrays with alpha channels explicitly included:

* **rgbaArray()**
* **hslaArray()**

Example:
```js
color.rgbArray()  // [255, 255, 255]
```


### Manipulation

#### Proportional/Relative Channel Mutation

All of these setters will increase or decrease existing channel values *as a proportion of the current channel value*. 

If the channel value is already 0, the method will have no effect. (For instance: it's not possible to `darken()` or `blacken()` a `color('black')`.) If you wish to set/change an absolute value, particularly for darkness/lightness, use the channel-specific setters, above.

All of these methods will work on any Color object, regardles of which colorspace you used to construct it.

#####Lighten() & Darken()
Increment/decrement the current *HSL Lightness* value by a decimal proportion. (0.0-1.0)
```js
color.lighten(0.5)     // hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)
color.darken(0.5)      // hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)
```

#####Whiten() & Blacken()
Increment/decrement the *HWB whiteness* value by a decimal proportion. (0.0-1.0)
```js
color.whiten(0.5)      // hwb(100, 50%, 50%) -> hwb(100, 75%, 50%)
color.blacken(0.5)     // hwb(100, 50%, 50%) -> hwb(100, 50%, 75%)
```

#####Saturate() & Desaturate()
Increment/decrement the current *HSL Saturation* value by a decimal proportion. (0.0-1.0):
```js
color.saturate(0.5)    // hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)
color.desaturate(0.5)  // hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)
```

#####Clearer() & Opaquer()
Increment/decrement the *alpha* value by a decimal proportion. (0.0-1.0)
```js
color.clearer(0.5)     // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
color.opaquer(0.5)     // rgba(10, 10, 10, 0.3) -> rgba(10, 10, 10, 0.6)
```

#####Rotate()
Increments the *HSL hue* by the specified number of degrees. (any numeric, +/-)
```js
color.rotate(180)      // hsl(60, 20%, 20%) -> hsl(240, 20%, 20%)
color.rotate(-90)      // hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)
```


#### Wholesale Conversion

#####Negate()
Produces the color's direct RBG opposite (alpha channel will be stripped, if present)

```js
color.negate()         // rgb(0, 100, 255) -> rgb(255, 155, 0)
```

#####Greyscale()
[Colorimetric (luminance-preserving) conversion to greyscale] (http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale)

```js
color.greyscale()      // #5CBF54 -> #969696
```

#####Mix()
Mixes your existing Color with the additional one specified as first argument, using a [weighted algorithm ported from SASS](https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209). 

Accepts an optional second argument indicating what proportion of the result should come from the new color, versus the original. Defaults to half: `.5`. 

```js
color.mix(Color("yellow"))        // cyan -> rgb(128, 255, 128)
color.mix(Color("yellow"), 0.3)   // cyan -> rgb(77, 255, 179)
```

### String Conversion

You can convert your color object to any of the following valid CSS strings:

* **hexString()**
* **rgbString()**  
_(returns rgba if alpha value !== 1)_
* **rgbaString()**
* **percentString()**  
_returns RGB values as percents of max (+ alpha, if present)_
* **hslString()**  
_(returns hsla if alpha value !== 1)_
* **hslaString()**
* **hwbString()**
* **keyword()**  
_(returns `undefined` if not a keyword color)_

Example:
```js
color.hslString()     	// --> "hsl(320, 50%, 100%)"
color.rgbString() 		// --> "rgb(255, 0, 0)"
color.percentString() 	// --> "rgb(100%, 0%, 0%)"
```

### Evaluative Tools

#### Luminosity
```js
color.luminosity()  // 0.412
```
Returns the [WCAG luminosity](http://www.w3.org/TR/WCAG20/#relativeluminancedef) of the color. 0 is black, 1 is white.

#### Contrast
```js
color.contrast(Color("blue"))  // 12
```
Returns the [WCAG contrast ratio](http://www.w3.org/TR/WCAG20/#contrast-ratiodef) between two `Color` objects. 1 is zero contrast (same color), 21 is the greatest contrast (between white and black).

#### Dark/Light
```js
color.light()  // true
color.dark()   // false
```
Uses the [YIQ equation](http://24ways.org/2010/calculating-color-contrast) to calculate whether the color is relatively "light" or "dark". (Useful for deciding text color against a background.)


### Chain
All mutation methods return the mutated `Color` instance, which can be chained:

```js
color.green(100).greyscale().lighten(0.6) // -> New color object
```

### Clone

For easy immutability, you can can create a copy of existing color objects using `clone()`:

```js
color.clone() // -> New color object
color.clone().green(100).greyscale().lighten(0.6) // -> New color object
```

And more to come...

## Propers

The API was inspired by [color-js](https://github.com/brehaut/color-js). Manipulation functions by CSS tools like Sass, LESS, and Stylus.
