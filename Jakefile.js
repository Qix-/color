/*
  Turns CommonJS package into a browser file and minifies.
  
  uses node-jake http://github.com/mde/node-jake
  install jake with `npm install jake -g`

  run with `jake [build|minify|clean]`
*/
var fs = require("fs"),
    path = require("path"),
    browserify = require("browserify");
   
var pkg = JSON.parse(fs.readFileSync("package.json")); 
var prefix = pkg.name + "-" + pkg.version;

task('build', [], function (dest) {
  console.log("building...");
  dest = dest || prefix + ".js";

  var source = browserify.bundle({
    require: [path.join(__dirname, pkg.main)],
  });
  source = "/* MIT license */\nvar Color = (function() {" + source + " return require('/color')})();"
  fs.writeFileSync(dest, source);
  console.log("> " + dest);
});

task('minify', [], function (file, dest) {
  file = file || prefix + ".js";
  dest = dest || prefix + ".min.js";

  var minified = minify(fs.readFileSync(file, "utf-8"));
  fs.writeFileSync(dest, minified, "utf-8");
  console.log("> " + dest)
});

task('clean', [], function () {
  fs.unlink(prefix + ".js");
  fs.unlink(prefix + ".min.js");
});

function minify(code) {
  var uglifyjs = require("uglify-js"),
      parser = uglifyjs.parser,
      uglify = uglifyjs.uglify;

  var ast = parser.parse(code);
  ast = uglify.ast_mangle(ast);
  ast = uglify.ast_squeeze(ast);
  return uglify.gen_code(ast);
}
