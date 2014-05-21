# altpub-aside

This is module for converting aside sections from "altpub" markdown sources
into the valid HTML equivalents. This module supports pre-parsing of the
blocks outlined in the LeanPub manual:

https://leanpub.com/help/manual#leanpub-auto-asidessidebars


[![NPM](https://nodei.co/npm/altpub-aside.png)](https://nodei.co/npm/altpub-aside/)

[![experimental](https://img.shields.io/badge/stability-experimental-red.svg)](https://github.com/badges/stability-badges) [![Build Status](https://img.shields.io/travis/DamonOehlman/altpub-aside.svg?branch=master)](https://travis-ci.org/DamonOehlman/altpub-aside) 

## Why Use This?

My original intention was to add custom parsing rules to a markdown parser
(such as [marked](https://github.com/chjj/marked)). This is non-trivial,
however, and can achieved my simply preparsing the text that `markded` will
parse.

## License(s)

### ISC

Copyright (c) 2014, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
