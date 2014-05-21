var test = require('tape');
var compare = require('./helpers/compare');

test('parse an aside into expected output', compare('aside'));
