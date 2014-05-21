var reLineBreak = /\n\r?/;

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

module.exports = function(opts, text) {

  function transform(input) {
    var lines = input.split(reLineBreak);

    console.log(lines);
  }

  // check to see if we have been passed just text
  if (typeof opts == 'string' || (opts instanceof String)) {
    text = opts;
    opts = {};
  }

  // if we have been passed text, then apply the change, otherwise return
  // the transform function
  return typeof text != 'undefined' ? transform(text) : transform;
};
