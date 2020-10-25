# URL Parser

<p align="center">
  <a href="https://github.com/Shinigami92/url-parser/blob/main/LICENSE">
    <img alt="license: MIT" src="https://img.shields.io/github/license/Shinigami92/url-parser.svg?style=flat-square"></a>
  <!-- <a href="https://www.npmjs.com/package/@Shinigami92/url-parser">
    <img alt="NPM package" src="https://img.shields.io/npm/v/@Shinigami92/url-parser.svg?style=flat-square"></a> -->
  <!-- <a href="https://www.npmjs.com/package/@Shinigami92/url-parser">
    <img alt="downloads" src="https://img.shields.io/npm/dt/@Shinigami92/url-parser.svg?style=flat-square"></a> -->
  <a href="#badge">
    <img alt="code style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
  <a href="https://github.com/Shinigami92/url-parser/actions?query=branch%3Amain+workflow%3ACI">
    <img alt="Build Status" src="https://github.com/Shinigami92/url-parser/workflows/CI/badge.svg?branch=main"></a>
</p>

Parse a given URL and return an abstract syntax tree

<img src="https://g.gravizo.com/svg?digraph%20AST%20%7B%0A%09path_segment%20%5Blabel%3D%22path-segment%5B%5D%22%5D%0A%0A%09url%20-%3E%20%7B%20schema%2C%20authority%2C%20path%2C%20query%2C%20fragment%20%7D%3B%0A%09authority%20-%3E%20%7B%20host%2C%20port%20%7D%3B%0A%09path%20-%3E%20%7B%20path_segment%20%7D%0A%7D%0A">
