var Color = require(".."),
    assert = require("assert");

var deepEqual = assert.deepEqual;
var equal = assert.equal;
var ok = assert.ok;
var equal = assert.equal;
var strictEqual = assert.strictEqual;
var throws = assert.throws;

it('Color() instance', function() {
  equal(new Color("red").red(), 255);
  ok((new Color) instanceof Color);
});

it('Color() argument', function() {
  deepEqual(Color("#0A1E19").rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color("rgb(10, 30, 25)").rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color("rgba(10, 30, 25, 0.4)").rgb(), {r: 10, g: 30, b: 25, a: 0.4});
  deepEqual(Color("rgb(4%, 12%, 10%)").rgb(), {r: 10, g: 31, b: 26});
  deepEqual(Color("rgba(4%, 12%, 10%, 0.4)").rgb(), {r: 10, g: 31, b: 26, a: 0.4});
  deepEqual(Color("blue").rgb(), {r: 0, g: 0, b: 255});
  deepEqual(Color("hsl(120, 50%, 60%)").hsl(), {h: 120, s: 50, l: 60});
  deepEqual(Color("hsla(120, 50%, 60%, 0.4)").hsl(), {h: 120, s: 50, l: 60, a: 0.4});
  deepEqual(Color("hwb(120, 50%, 60%)").hwb(), {h: 120, w: 50, b: 60});
  deepEqual(Color("hwb(120, 50%, 60%, 0.4)").hwb(), {h: 120, w: 50, b: 60, a: 0.4});

  deepEqual(Color({r: 10, g: 30, b: 25}).rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color({h: 10, s: 30, l: 25}).hsl(), {h: 10, s: 30, l: 25});
  deepEqual(Color({h: 10, s: 30, v: 25}).hsv(), {h: 10, s: 30, v: 25});
  deepEqual(Color({h: 10, w: 30, b: 25}).hwb(), {h: 10, w: 30, b: 25});
  deepEqual(Color({c: 10, m: 30, y: 25, k: 10}).cmyk(), {c: 10, m: 30, y: 25, k: 10});

  deepEqual(Color({red: 10, green: 30, blue: 25}).rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color({hue: 10, saturation: 30, lightness: 25}).hsl(), {h: 10, s: 30, l: 25});
  deepEqual(Color({hue: 10, saturation: 30, value: 25}).hsv(), {h: 10, s: 30, v: 25});
  deepEqual(Color({hue: 10, whiteness: 30, blackness: 25}).hwb(), {h: 10, w: 30, b: 25});
  deepEqual(Color({cyan: 10, magenta: 30, yellow: 25, black: 10}).cmyk(), {c: 10, m: 30, y: 25, k: 10});
});

it('Setters', function() {
  deepEqual(Color().rgb(10, 30, 25).rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color().rgb(10, 30, 25, 0.4).rgb(), {r: 10, g: 30, b: 25, a: 0.4});
  deepEqual(Color().rgb([10, 30, 25]).rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color().rgb([10, 30, 25, 0.4]).rgb(), {r: 10, g: 30, b: 25, a: 0.4});
  deepEqual(Color().rgb({r: 10, g: 30, b: 25}).rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color().rgb({r: 10, g: 30, b: 25, a: 0.4}).rgb(), {r: 10, g: 30, b: 25, a: 0.4});
  deepEqual(Color().rgb({red: 10, green: 30, blue: 25}).rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color().rgb({red: 10, green: 30, blue: 25, alpha: 0.4}).rgb(), {r: 10, g: 30, b: 25, a: 0.4});

  deepEqual(Color().hsl([260, 10, 10]).hsl(), {h: 260, s: 10, l: 10});
  deepEqual(Color().hsv([260, 10, 10]).hsv(), {h: 260, s: 10, v: 10});
  deepEqual(Color().hwb([260, 10, 10]).hwb(), {h: 260, w: 10, b: 10});
  deepEqual(Color().cmyk([10, 10, 10, 10]).cmyk(), {c: 10, m: 10, y: 10, k: 10});
});

if('retain alpha', function() {
  equal(Color().rgb([10, 30, 25, 0.4]).rgb([10, 30, 25]).alpha(), 0.4);
});

if('Translations', function() {
  deepEqual(Color().rgb(10, 30, 25).rgb(), {r: 10, g: 30, b: 25});
  deepEqual(Color().rgb(10, 30, 25).hsl(), {h: 165, s: 50, l: 8});
  deepEqual(Color().rgb(10, 30, 25).hsv(), {h: 165, s: 67, v: 12});
  deepEqual(Color().rgb(10, 30, 25).hwb(), {h: 165, w: 4, b: 88});
  deepEqual(Color().rgb(10, 30, 25).cmyk(), {c: 67, m: 0, y: 17, k: 88});
});

it('Array getters', function() {
  deepEqual(Color({r: 10, g: 20, b: 30}).rgbArray(), [10, 20, 30]);
  deepEqual(Color({h: 10, s: 20, l: 30}).hslArray(), [10, 20, 30]);
  deepEqual(Color({h: 10, s: 20, v: 30}).hsvArray(), [10, 20, 30]);
  deepEqual(Color({h: 10, w: 20, b: 30}).hwbArray(), [10, 20, 30]);
  deepEqual(Color({c: 10, m: 20, y: 30, k: 40}).cmykArray(), [10, 20, 30, 40]);
});

it('Multiple times', function() {
  var color = Color({r: 10, g: 20, b: 30});
  deepEqual(color.rgbaArray(), [10, 20, 30, 1]);
  deepEqual(color.rgbaArray(), [10, 20, 30, 1]);
});

it('Channel getters/setters', function() {
  equal(Color({r: 10, g: 20, b: 30, a: 0.4}).alpha(), 0.4);
  equal(Color({r: 10, g: 20, b: 30, a: 0.4}).alpha(0.7).alpha(), 0.7);
  equal(Color({r: 10, g: 20, b: 30}).red(), 10);
  equal(Color({r: 10, g: 20, b: 30}).red(100).red(), 100);
  equal(Color({r: 10, g: 20, b: 30}).green(), 20);
  equal(Color({r: 10, g: 20, b: 30}).green(200).green(), 200);
  equal(Color({r: 10, g: 20, b: 30}).blue(), 30);
  equal(Color({r: 10, g: 20, b: 30}).blue(60).blue(), 60);
  equal(Color({h: 10, s: 20, l: 30}).hue(), 10);
  equal(Color({h: 10, s: 20, l: 30}).hue(100).hue(), 100);
  equal(Color({h: 10, w: 20, b: 30}).hue(), 10);
  equal(Color({h: 10, w: 20, b: 30}).hue(100).hue(), 100);
});

it('Setting the same value', function () {
  var colorString = 'BADA55',
      color = Color(colorString),
      alpha = color.alpha(),
      red = color.red(),
      green = color.green(),
      blue = color.blue(),
      hue = color.hue(),
      saturation = color.saturation(),
      saturationv = color.saturationv(),
      lightness = color.lightness(),
      whiteness = color.whiteness(),
      blackness = color.blackness(),
      cyan = color.cyan(),
      magenta = color.magenta(),
      yellow = color.yellow(),
      black = color.black();

  equal(color.hexString(), colorString);

  color.alpha(alpha);
  equal(color.alpha(), alpha);
  equal(color.hexString(), colorString);

  color.red(red);
  equal(color.red(), red);
  equal(color.hexString(), colorString);

  color.green(green);
  equal(color.green(), green);
  equal(color.hexString(), colorString);

  color.blue(blue);
  equal(color.blue(), blue);
  equal(color.hexString(), colorString);

  color.hue(hue);
  equal(color.hue(), hue);
  equal(color.hexString(), colorString);

  color.saturation(saturation);
  equal(color.saturation(), saturation);
  equal(color.hexString(), colorString);

  color.saturationv(saturationv);
  equal(color.saturationv(), saturationv);
  equal(color.hexString(), colorString);

  color.lightness(lightness);
  equal(color.lightness(), lightness);
  equal(color.hexString(), colorString);

  color.whiteness(whiteness);
  equal(color.whiteness(), whiteness);
  equal(color.hexString(), colorString);

  color.blackness(blackness);
  equal(color.blackness(), blackness);
  equal(color.hexString(), colorString);

  color.cyan(cyan);
  equal(color.cyan(), cyan);
  equal(color.hexString(), colorString);

  color.magenta(magenta);
  equal(color.magenta(), magenta);
  equal(color.hexString(), colorString);

  color.yellow(yellow);
  equal(color.yellow(), yellow);
  equal(color.hexString(), colorString);

  color.black(black);
  equal(color.black(), black);
  equal(color.hexString(), colorString);
});

it('Capping values', function() {
  equal(Color({h: 400, s: 50, l: 10}).hue(), 360);
  equal(Color({h: 100, s: 50, l: 80}).lighten(0.5).lightness(), 100);
  equal(Color({h: -400, s: 50, l: 10}).hue(), 0);

  equal(Color({h: 400, w: 50, b: 10}).hue(), 0); // 0 == 360
  equal(Color({h: 100, w: 50, b: 80}).blacken(0.5).blackness(), 100);
  equal(Color({h: -400, w: 50, b: 10}).hue(), 0);

  equal(Color().red(400).red(), 255);
  equal(Color().red(-400).red(), 0);
  equal(Color().rgb(10, 10, 10, 12).alpha(), 1);
  equal(Color().rgb(10, 10, 10, -200).alpha(), 0);
  equal(Color().alpha(-12).alpha(), 0);
  equal(Color().alpha(3).alpha(), 1);
});

it('Translate with channel setters', function() {
  deepEqual(Color({r: 0, g: 0, b: 0}).lightness(50).hsl(), {h: 0, s: 0, l: 50});
  deepEqual(Color({r: 0, g: 0, b: 0}).red(50).green(50).hsv(), {h: 60, s: 100, v: 20});
});

it('CSS String getters', function() {
  equal(Color("rgb(10, 30, 25)").hexString(), "#0A1E19")
  equal(Color("rgb(10, 30, 25)").rgbString(), "rgb(10, 30, 25)")
  equal(Color("rgb(10, 30, 25, 0.4)").rgbString(), "rgba(10, 30, 25, 0.4)")
  equal(Color("rgb(10, 30, 25)").percentString(), "rgb(4%, 12%, 10%)")
  equal(Color("rgb(10, 30, 25, 0.3)").percentString(), "rgba(4%, 12%, 10%, 0.3)")
  equal(Color("rgb(10, 30, 25)").hslString(), "hsl(165, 50%, 8%)")
  equal(Color("rgb(10, 30, 25, 0.3)").hslString(), "hsla(165, 50%, 8%, 0.3)");
  equal(Color({ h : 0, s : 0, v : 100 }).hslString(), "hsl(0, 0%, 100%)");
  equal(Color("rgb(10, 30, 25)").hwbString(), "hwb(165, 4%, 88%)")
  equal(Color("rgb(10, 30, 25, 0.3)").hwbString(), "hwb(165, 4%, 88%, 0.3)")
  equal(Color("rgb(0, 0, 255)").keyword(), "blue")
  strictEqual(Color("rgb(10, 30, 25)").keyword(), undefined);
});

it('Number getters', function() {
  equal(Color("rgb(10, 30, 25)").rgbNumber(), 0xA1E19)
});

it('luminosity, etc.', function() {
  equal(Color("white").luminosity(), 1);
  equal(Color("black").luminosity(), 0);
  equal(Color("red").luminosity(), 0.2126);
  equal(Color("white").contrast(Color("black")), 21);
  equal(Math.round(Color("white").contrast(Color("red"))), 4);
  equal(Math.round(Color("red").contrast(Color("white"))), 4);
  equal(Color("blue").contrast(Color("blue")), 1);
  ok(Color("black").dark());
  ok(!Color("black").light());
  ok(Color("white").light());
  ok(!Color("white").dark());
  ok(Color("blue").dark());
  ok(Color("darkgreen").dark());
  ok(Color("pink").light());
  ok(Color("goldenrod").light());
  ok(Color("red").dark());
});

it('Manipulators wo/ mix', function() {
  deepEqual(Color({r: 67, g: 122, b: 134}).greyscale().rgb(), {r: 107, g: 107, b: 107});
  deepEqual(Color({r: 67, g: 122, b: 134}).negate().rgb(), {r: 188, g: 133, b: 121});
  equal(Color({h: 100, s: 50, l: 60}).lighten(0.5).lightness(), 90);
  equal(Color({h: 100, s: 50, l: 60}).darken(0.5).lightness(), 30);
  equal(Color({h: 100, w: 50, b: 60}).whiten(0.5).whiteness(), 75);
  equal(Color({h: 100, w: 50, b: 60}).blacken(0.5).blackness(), 90);
  equal(Color({h: 100, s: 40, l: 50}).saturate(0.5).saturation(), 60);
  equal(Color({h: 100, s: 80, l: 60}).desaturate(0.5).saturation(), 40);
  equal(Color({r: 10, g: 10, b: 10, a: 0.8}).clearer(0.5).alpha(), 0.4);
  equal(Color({r: 10, g: 10, b: 10, a: 0.5}).opaquer(0.5).alpha(), 0.75);
  equal(Color({h: 60, s: 0, l: 0}).rotate(180).hue(), 240);
  equal(Color({h: 60, s: 0, l: 0}).rotate(-180).hue(), 240);
});

it('Mix: basic', function() {
  equal(Color("#f00").mix(Color("#00f")).hexString(), '#800080');
});

it('Mix: weight', function() {
  equal(Color("#f00").mix(Color("#00f"), 0.25).hexString(), '#4000BF');
});

it('Mix: alpha', function() {
  equal(Color("rgba(255, 0, 0, 0.5)").mix(Color("#00f")).rgbaString(), 'rgba(64, 0, 191, 0.75)');
});

it('Mix: 50%', function() {
  equal(Color("#f00").mix(Color("#00f"), 0.5).hexString(), '#800080');
});

it('Mix: 0%', function() {
  equal(Color("#f00").mix(Color("#00f"), 0).hexString(), '#0000FF');
});

it('Mix: 100%', function() {
  equal(Color("#f00").mix(Color("#00f"), 1.0).hexString(), '#FF0000');
});


it('Clone', function() {
  var clone = Color({r: 10, g: 20, b: 30});
  deepEqual(clone.rgbaArray(), [10, 20, 30, 1]);
  deepEqual(clone.clone().rgb(50, 40, 30).rgbaArray(), [50, 40, 30, 1]);
  deepEqual(clone.rgbaArray(), [10, 20, 30, 1]);
});

it('Level', function() {
  equal(Color("white").level(Color("black")), "AAA");
  equal(Color("grey").level(Color("black")), "AA");
});

it('Exceptions', function() {
  throws(function () {
    Color("unknow")
  }, /Unable to parse color from string/);

  throws(function () {
    Color({})
  }, /Unable to parse color from object/);
});
