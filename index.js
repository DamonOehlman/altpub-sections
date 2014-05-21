var marked = require('marked');
var formatter = require('formatter');
var reLineBreak = /\n\r?/;
var sectionTag = formatter('<section class="{{ 0 }}">{{ 1 }}</section>');

/**
  # altpub-sections

  This is module for converting aside sections from "altpub" markdown sources
  into the valid HTML equivalents. This module supports pre-parsing of the
  blocks outlined in the LeanPub manual:

  https://leanpub.com/help/manual#leanpub-auto-asidessidebars

  ## Why Use This?

  My original intention was to add custom parsing rules to a markdown parser
  (such as [marked](https://github.com/chjj/marked)). This is non-trivial,
  however, and can achieved my simply preparsing the text that marked will
  parse.

  Additionally, marked is used to parse the content of these sections as
  inline markdown is usually allowed from what I can tell in the LeanPub docs.
**/

var sectionTypes = [
  'aside',
  'warning',
  'tip',
  'error',
  'information',
  'question',
  'discussion',
  'exercise'
];

var keyOverrides = {
  exercise: 'X'
};

var sectionKeys = sectionTypes.map(extractKey);
var sectionRegexes = sectionKeys.map(createRegex);

module.exports = function(input, opts) {
  var lines = input.split(reLineBreak);

  // classify lines
  return lines.map(classify)
    // collect sections
    .reduce(combineBlocks(lines.length), [])
    // convert inline sections
    .map(sectionize)
    .join('\n');
};

function classify(line) {
  var match;
  for (var ii = sectionRegexes.length; ii--; ) {
    match = sectionRegexes[ii].exec(line);

    if (match) {
      return {
        type: sectionTypes[ii],
        content: match[1],
        original: line
      };
    }
  }

  return line;
}

function combineBlocks(totalLines) {
  var lastType;
  var collector;
  var lastIndex = totalLines - 1;

  return function(memo, line, index) {
    var reset = (line && line.type && line.type !== lastType) ||
        (lastType && (! line.type)) || false;

    // update the last type
    lastType = line && line.type;

    // if we have a reset, then do that now
    if (reset && collector) {
      memo.push(collector);

      // reset the collector
      collector = undefined;
    }

    // if we don't have a content type, append the line
    if (! line.type) {
      return memo.concat(line);
    }

    collector = collector || { type: line.type, lines: [] };
    collector.lines.push(line.content);

    return memo;
  }
}

function createRegex(key) {
  return new RegExp('^\\s*' + key + '\>\\s*(.*)$');
}

function extractKey(name) {
  return keyOverrides[name] || name.charAt(0).toUpperCase();
}

function sectionize(input) {
  var sectionType = input && input.type;

  if (sectionType) {
    return sectionTag(sectionType, marked(input.lines.join('\n')));
  }

  return input;
}
