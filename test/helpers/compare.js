var fs = require('fs');
var parser = require('../../');

module.exports = function(filename) {
  return function(t) {
    var input = fs.readFileSync(__dirname + '/../input/' + filename + '.md', 'utf8');
    var expected = fs.readFileSync(__dirname + '/../expected-output/' + filename + '.md', 'utf8');
    var output;

    t.plan(3);
    t.ok(input, 'read input');
    t.ok(output = parser(input), 'parsed ok');
    t.equal(output, expected, 'output matched expected');
  };
};
