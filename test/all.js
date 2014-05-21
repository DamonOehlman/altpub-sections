var test = require('tape');
var compare = require('./helpers/compare');

test('parse an aside into expected output', compare('aside'));
test('parse a warning section', compare('warning'));
test('parse a combination section', compare('combination'));
