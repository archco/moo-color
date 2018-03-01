# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add methods for manipulate. `complement()` and `invert()`. #2
- Add method `random()`. #5

### Changed

- Improve formatter. #3
  - `toHex()`: Change argument `enableShort: boolean` to `mode: 'full'|'short'|'name'`.
  - `toRgb()`: add `mode: 'default'|'percent'` argument.

## [0.1.0]

First release.

[Unreleased]: https://github.com/archco/moo-color/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/archco/moo-color/compare/a4dfebd...v0.1.0
