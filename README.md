# color
`color` is a JavaScript library for color conversion and manipulation with support for CSS color strings.

```javascript
var color = Color("#7743CE");

color.red(120).lighten(.5);

console.log(color.hslString());  // "hsl(263, 59%, 81%)"
```	

## Install

### browser
Download the latest [color.js](http://github.com/harthur/color/downloads). The `Color` object is exported.

### node
For [node](http://nodejs.org) with [npm](http://npmjs.org):

```bash
npm install color
```

And use with `var Color = require("color")`

## API

### Setters


```javascript
var color = Color("rgb(255, 255, 255)")
```
Pass any valid CSS string into `Color()`, like `"#FFFFFF"`, `"#fff"`, `"white"`, `"hsla(360, 100%, 100%, 0.5)"`

```javascript
var color = Color({r: 255, g: 255, b: 255})
```
You can also pass a hash of color values into `Color()`, keyed on `r` or `red` for example.

```javascript
var color = Color().rgb(255, 255, 255)
```
Load in color values with `rgb()`, `hsl()`, `hsv()`,and `cmyk()`. The arguments can also be an array or hash.

```javascript
color.red(120)
```
Set the values for individual channels with `alpha`, `red`, `green`, `blue`, `hue`, `saturation` (hsl), `saturationv` (hsv), `lightness`, `cyan`, `magenta`, `yellow`, `black`

### Getters


```javascript
color.rgb()       // {r: 255, g: 255, b: 255}
```
Get a hash of the rgb values with `rgb()`, similarly for `hsl()`, `hsv()`, and `cmyk()`

```javascript
color.rgbArray()  // [255, 255, 255]
```
Get an array of the values with `rgbArray()`, `hslArray()`, `hsvArray()`, and `cmykArray()`.

```javascript
color.red()       // 255
```
Get the values for individual channels with `alpha`, `red`, `green`, `blue`, `hue`, `saturation` (hsl), `saturationv` (hsv), `lightness`, `cyan`, `magenta`, `yellow`, `black`

### CSS Strings


```javascript
color.hslString()  // "hsl(320, 50%, 100%)"
```

Different CSS String formats for the color are on `hexString`, `rgbString`, `percentString`, `hslString`, and `keyword` (undefined if it's not a keyword color). `"rgba"` and `"hsla"` are used if the current alpha value of the color isn't `1`.

### Manipulation


```javascript
color.negate()         // rgb(0, 100, 255) -> rgb(255, 155, 0)

color.lighten(0.5)     // hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)
color.darken(0.5)      // hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)

color.saturate(0.5)    // hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)
color.desaturate(0.5)  // hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)
color.greyscale()      // #5CBF54 -> #969696

color.clearer(0.5)     // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.6)
color.opaquer(0.5)     // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1.0)

color.rotate(180)      // hsl(60, 20%, 20%) -> hsl(240, 20%, 20%)
color.rotate(-90)      // hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)

// chaining
color.green(100).greyscale().lighten(0.6)
```

And more to come...

## Propers

The API was inspired by [color-js](https://github.com/brehaut/color-js). Manipulation functions by CSS tools like Sass, LESS, and Stylus.
