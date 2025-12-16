var fs = require('fs'), path = require('path'), util = require('util');

var dirToJSON = function (dir, done) {
  var results = [];

  function recWalk(d, res) {
    var list = fs.readdirSync(d);
    list.forEach((name) => {
      var file = path.resolve(d, name);
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        var title;
        if (name) {
          title = 'salla-' + name
        }
        res.push({ title: title, file: name + '/readme.md' });
      }
    });
  }

  try {
    recWalk(dir, results);
    done(null, results);
  } catch (err) {
    done(err);
  }
};

dirToJSON("src/components", function (err, results) {
  if (err) console.log(err);
  else fs.writeFile('src/components/summary.json', JSON.stringify(results), 'utf8', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});