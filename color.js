/* MIT license */
var convert = require("color-convert"),
    string = require("color-string");

module.exports = Color;

function Color(cssString) {
   var values = {
      rgb: [0, 0, 0],
      hsl: [0, 0, 0],
      hsv: [0, 0, 0],
      cmyk: [0, 0, 0, 0],
      alpha: 1
   };
       
   function getValues(space) {
      var vals = {};
      for (var i = 0; i < space.length; i++) {
         vals[space[i]] = values[space][i];
      }
      if (values.alpha != 1) {
         vals["a"] = values.alpha;
      }
      // {r: 255, g: 255, b: 255, a: 0.4}
      return vals;
   }
       
   function setValues(space, vals) {
      var spaces = {
         "rgb": ["red", "green", "blue"],
         "hsl": ["hue", "saturation", "lightness"],
         "hsv": ["hue", "saturation", "value"],
         "cmyk": ["cyan", "magenta", "yellow", "black"]
      }
      
      if (vals.length) {
         // [10, 10, 10]
         values[space] = vals.slice(0, space.length);
         values.alpha = vals[space.length];
      }
      else if (vals[space[0]] !== undefined) {
         // {r: 10, g: 10, b: 10}
         values[space] = [];
         for (var i = 0; i < space.length; i++) {
           values[space].push(vals[space[i]]);
         }
         values.alpha = vals.a;
      }
      else if (vals[spaces[space][0]] !== undefined) {
         // {red: 10, green: 10, blue: 10}
         var chans = spaces[space];
         values[space] = [];
         for (var i = 0; i < space.length; i++) {
           values[space].push(vals[chans[i]]);
         }
         values.alpha = vals.alpha;
      }
      values.alpha = values.alpha || 1;
      
      // convert to all the other color spaces
      for (var spaceName in spaces) {
         if (spaceName != space) {
            values[spaceName]  = convert[space][spaceName](values[space])
         }
      }
   }

   // parse Color() argument
   if (typeof cssString == "string") {
      var vals = string.getRgba(cssString);
      if (vals) {  
         setValues("rgb", vals);
      }
      else if(vals = string.getHsla(cssString)) {
         setValues("hsl", vals);
      }
   }
   else if (typeof cssString == "object") {
      var vals = cssString;
      if(vals["r"] !== undefined || vals["red"] !== undefined) {
         setValues("rgb", vals)
      }
      else if(vals["l"] !== undefined || vals["lightness"] !== undefined) {
         setValues("hsl", vals)
      }
      else if(vals["v"] !== undefined || vals["value"] !== undefined) {
         setValues("hsv", vals)
      }
      else if(vals["c"] !== undefined || vals["cyan"] !== undefined) {
         setValues("cmyk", vals)
      }
   }
   
   function setSpace(space, args) {
      var vals = args[0];
      if (vals === undefined) {
         // color.rgb()
         return getValues(space);
      }
      // color.rgb(10, 10, 10)
      if (typeof vals == "number") {
         vals = Array.prototype.slice.call(args);        
      }
      setValues(space, vals);
      return color;
   }
   
   function setChannel(space, index, val) {
      if (val === undefined) {
         // color.red()
         return values[space][index];
      }
      // color.red(100)
      values[space][index] = val;
      setValues(space, values[space]);
      return color;     
   }

   var color = {
      rgb: function (vals) {
         return setSpace("rgb", arguments);
      },
      hsl: function(vals) {
         return setSpace("hsl", arguments);
      },
      hsv: function(vals) {
         return setSpace("hsv", arguments);
      },
      cmyk: function(vals) {
         return setSpace("cmyk", arguments);
      },
      
      rgbArray: function() { return values.rgb; },
      hslArray: function() { return values.hsl; },
      hsvArray: function() { return values.hsv; },
      cmykArray: function() { return values.cmyk; },
            
      alpha: function(val) {
         if (val === undefined) {
            return values.alpha;
         }
         values.alpha = val;
         return color;
      },

      red: function(val) {
         return setChannel("rgb", 0, val);
      },
      green: function(val) {
         return setChannel("rgb", 1, val);
      },      
      blue: function(val) {
         return setChannel("rgb", 2, val);
      },
      hue: function(val) {
         setChannel("hsl", 0, val);
         return setChannel("hsv", 0, val);
      },
      saturation: function(val) {
         return setChannel("hsl", 1, val);
      },
      lightness: function(val) {
         return setChannel("hsl", 2, val);
      },
      saturationv: function(val) {
         return setChannel("hsv", 1, val);
      },
      value: function(val) {
         return setChannel("hsv", 2, val);
      },
      cyan: function(val) {
         return setChannel("cmyk", 0, val);
      },
      magenta: function(val) {
         return setChannel("cmyk", 1, val);
      },
      yellow: function(val) {
         return setChannel("cmyk", 2, val);
      },
      black: function(val) {
         return setChannel("cmyk", 3, val);
      },

      hexString: function() {
         return string.hexString(values.rgb);
      },

      rgbString: function() {
         return string.rgbString(values.rgb, values.alpha);
      },

      rgbaString: function() {
         return string.rgbaString(values.rgb, values.alpha);
      },

      percentString: function() {
         return string.percentString(values.rgb, values.alpha);
      },

      hslString: function() {
         return string.hslString(values.hsl, values.alpha); 
      },

      hslaString: function() {
         return string.hslaString(values.hsl, values.alpha);
      },

      keyword: function() {
         return string.keyword(values.rgb, values.alpha);
      },
      
      greyscale: function() {
         var rgb = values.rgb;
         // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
         var val = Math.round(rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11);
         setValues("rgb", [val, val, val]);
         return color;
      },
      
      negate: function() {
         var rgb = []
         for (var i = 0; i < 3; i++) {
            rgb[i] = 255 - values.rgb[i];
         }
         setValues("rgb", rgb);
         return color;
      },
      
      lighten: function(ratio) {
         values.hsl[2] += Math.round(values.hsl[2] * ratio);
         setValues("hsl", values.hsl);
         return color;
      },
      
      darken: function(ratio) {
         values.hsl[2] -= Math.round(values.hsl[2] * ratio);
         setValues("hsl", values.hsl);
         return color;         
      },

      toJSON: function() {
        return rgb();
      }
   }  
   return color;
}