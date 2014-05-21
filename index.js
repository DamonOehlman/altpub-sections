var marked = require('marked');
var formatter = require('formatter');
var reLineBreak = /\n\r?/;
var sectionTag = formatter('<section class="{{ 0 }}">{{ 1 }}</section>');

/**
  # altpub-section

  This is module for converting aside sections from "altpub" markdown sources
  into the valid HTML equivalents. This module supports pre-parsing of the
  blocks outlined in the LeanPub manual:

  https://leanpub.com/help/manual#leanpub-auto-asidessidebars

  ## Why Use This?

  My original intention was to add custom parsing rules to a markdown parser
  (such as [marked](https://github.com/chjj/marked)). This is non-trivial,
  however, and can achieved my simply preparsing the text that `markded` will
  parse.
**/

var rules = {
  aside: /^\s*A\>\s*(.*)$/
};

var ruleKeys = Object.keys(rules);

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
  for (var ii = ruleKeys.length; ii--; ) {
    match = rules[ruleKeys[ii]].exec(line);

    if (match) {
      return {
        type: ruleKeys[ii],
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

function sectionize(input) {
  var sectionType = input && input.type;

  if (sectionType) {
    return sectionTag(sectionType, marked(input.lines.join('\n')));
  }

  return input;
}
