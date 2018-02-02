(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MooColor"] = factory();
	else
		root["MooColor"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = padStart;
/* unused harmony export padEnd */
/* harmony export (immutable) */ __webpack_exports__["a"] = clamp;
/* harmony export (immutable) */ __webpack_exports__["b"] = degree;
/* harmony export (immutable) */ __webpack_exports__["d"] = resolveAlpha;
function padStart(str, length, chars) {
    var space = length - str.length;
    return space > 0 ? "" + makePad(chars, space) + str : str;
}
function padEnd(str, length, chars) {
    var space = length - str.length;
    return space > 0 ? "" + str + makePad(chars, space) : str;
}
function makePad(chars, limit) {
    while (chars.length < limit) {
        chars += chars;
    }
    return chars.length > limit ? chars.substring(chars.length - limit) : chars;
}
function clamp(num, min, max) {
    return Math.min(Math.max(min, num), max);
}
function degree(num) {
    return ((parseFloat(num.toString()) % 360) + 360) % 360;
}
function resolveAlpha(a) {
    a = typeof a === 'number' ? a.toString() : a;
    var num = parseFloat(a);
    return clamp(isNaN(num) ? 1 : num, 0, 1);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MooColor", function() { return MooColor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_formatter__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_parser__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var MooColor = /** @class */ (function (_super) {
    __extends(MooColor, _super);
    function MooColor(color) {
        var _this = _super.call(this) || this;
        _this.setColorByString(color);
        return _this;
    }
    MooColor.prototype.setColorByString = function (str) {
        var color = Object(__WEBPACK_IMPORTED_MODULE_1__input_parser__["a" /* default */])(str);
        return this.setColor(color);
    };
    Object.defineProperty(MooColor.prototype, "brightness", {
        /**
         * Color brightness. 0-255 (It based RGB)
         * @see https://www.w3.org/TR/AERT/#color-contrast
         * @readonly
         * @type {number}
         */
        get: function () {
            var _a = this.getColorAs('rgb').values, r = _a[0], g = _a[1], b = _a[2];
            return ((r * 299) + (g * 587) + (b * 114)) / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MooColor.prototype, "isLight", {
        /**
         * Returns whether color is light or not.
         * @readonly
         * @type {boolean}
         */
        get: function () {
            return this.brightness >= 128;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MooColor.prototype, "isDark", {
        /**
         * Returns whether color is dark or not.
         * @readonly
         * @type {boolean}
         */
        get: function () {
            return this.brightness < 128;
        },
        enumerable: true,
        configurable: true
    });
    MooColor.prototype.diffColor = function (color) {
        var _a = this.getColorAs('rgb').values, r1 = _a[0], g1 = _a[1], b1 = _a[2];
        var _b = color.getColorAs('rgb').values, r2 = _b[0], g2 = _b[1], b2 = _b[2];
        return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
    };
    return MooColor;
}(__WEBPACK_IMPORTED_MODULE_0__color_formatter__["a" /* ColorFormatter */]));



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorFormatter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_converter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_util__ = __webpack_require__(0);


var ColorFormatter = /** @class */ (function () {
    function ColorFormatter() {
    }
    ColorFormatter.prototype.setColor = function (color) {
        color.alpha = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["d" /* resolveAlpha */])(color.alpha);
        this.color = color;
        return this;
    };
    ColorFormatter.prototype.getColor = function () {
        return this.color;
    };
    ColorFormatter.prototype.getColorAs = function (model) {
        return this.color.model === model
            ? this.color
            : this.convert(this.color, model);
    };
    ColorFormatter.prototype.getModel = function () {
        return this.color ? this.color.model : undefined;
    };
    ColorFormatter.prototype.changeModel = function (model) {
        return this.setColor(this.convert(this.color, model));
    };
    ColorFormatter.prototype.getAlpha = function () {
        return this.color.alpha;
    };
    ColorFormatter.prototype.setAlpha = function (alpha) {
        this.color.alpha = alpha;
        return this;
    };
    ColorFormatter.prototype.convert = function (color, m) {
        var val;
        switch (color.model) {
            case 'rgb':
                val = this.convertFromRgb(color.values, m);
                break;
            case 'hwb':
                val = this.convertFromHwb(color.values, m);
                break;
            case 'hsl':
                val = this.convertFromHsl(color.values, m);
                break;
            case 'hsv':
                val = this.convertFromHsv(color.values, m);
                break;
            case 'cmyk':
                val = this.convertFromCmyk(color.values, m);
                break;
        }
        if (!val.length) {
            throw new Error('Converting Error!');
        }
        return {
            model: m,
            values: val,
            alpha: color.alpha,
        };
    };
    ColorFormatter.prototype.toString = function (model) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        model = model ? model : this.color.model;
        switch (model) {
            case 'hex': return this.toHex(args[0]);
            case 'hwb': return this.toHwb();
            case 'hsl': return this.toHsl();
            case 'hsv': return this.toHsv();
            case 'cmyk': return this.toCmyk();
            default: return this.toRgb();
        }
    };
    /**
     * Represents color as HEX notation.
     * @see https://www.w3.org/TR/css-color-4/#hex-notation
     * @param {boolean} [enableShort] default is false.
     * @returns {string}
     */
    ColorFormatter.prototype.toHex = function (enableShort) {
        var color = this.getColorAs('rgb');
        var _a = color.values, r = _a[0], g = _a[1], b = _a[2];
        var a = color.alpha === 1 ? null : color.alpha;
        return "#" + __WEBPACK_IMPORTED_MODULE_0__color_converter__["h" /* rgbToHex */](r, g, b, a, true);
    };
    /**
     * Represents color as RGB notation.
     * @see https://www.w3.org/TR/css-color-4/#rgb-functions
     * @returns {string}
     */
    ColorFormatter.prototype.toRgb = function () {
        var color = this.getColorAs('rgb');
        var _a = color.values, r = _a[0], g = _a[1], b = _a[2];
        return color.alpha === 1
            ? "rgb(" + r + ", " + g + ", " + b + ")"
            : "rgba(" + r + ", " + g + ", " + b + ", " + color.alpha + ")";
    };
    /**
     * Represents color as HWB notation.
     * @see https://www.w3.org/TR/css-color-4/#the-hwb-notation
     * @returns {string} e.g. 'hwb(0, 0%, 0%, 0)'
     */
    ColorFormatter.prototype.toHwb = function () {
        var color = this.getColorAs('hwb');
        var _a = color.values, h = _a[0], w = _a[1], b = _a[2];
        var a = color.alpha === 1 ? '' : ", " + color.alpha;
        return "hwb(" + h + ", " + w + "%, " + b + "%" + a + ")";
    };
    /**
     * Represents color as HSL notation.
     * @see https://www.w3.org/TR/css-color-4/#the-hsl-notation
     * @returns {string}
     */
    ColorFormatter.prototype.toHsl = function () {
        var color = this.getColorAs('hsl');
        var _a = color.values, h = _a[0], s = _a[1], l = _a[2];
        return color.alpha === 1
            ? "hsl(" + h + ", " + s + "%, " + l + "%)"
            : "hsla(" + h + ", " + s + "%, " + l + "%, " + color.alpha + ")";
    };
    /**
     * Represents color as HSV notation. This format is similar to HSL.
     * @returns {string}
     */
    ColorFormatter.prototype.toHsv = function () {
        var color = this.getColorAs('hsv');
        var _a = color.values, h = _a[0], s = _a[1], v = _a[2];
        return color.alpha === 1
            ? "hsv(" + h + ", " + s + "%, " + v + "%)"
            : "hsva(" + h + ", " + s + "%, " + v + "%, " + color.alpha + ")";
    };
    /**
     * Represents color as CMYK notation. e.g. 'cmyk(0%, 0%, 0%, 0%)'
     * @see https://www.w3.org/TR/css-color-4/#cmyk-colors
     * @returns {string}
     */
    ColorFormatter.prototype.toCmyk = function () {
        var color = this.getColorAs('cmyk');
        var _a = color.values, c = _a[0], m = _a[1], y = _a[2], k = _a[3];
        var a = color.alpha === 1 ? '' : ", " + color.alpha;
        return "cmyk(" + c + "%, " + m + "%, " + y + "%, " + k + "%" + a + ")";
    };
    ColorFormatter.prototype.convertFromRgb = function (values, model) {
        var r = values[0], g = values[1], b = values[2];
        switch (model) {
            case 'rgb': break;
            case 'hwb':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["k" /* rgbToHwb */](r, g, b);
                break;
            case 'hsl':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["i" /* rgbToHsl */](r, g, b);
                break;
            case 'hsv':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["j" /* rgbToHsv */](r, g, b);
                break;
            case 'cmyk':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["g" /* rgbToCmyk */](r, g, b);
                break;
        }
        return values;
    };
    ColorFormatter.prototype.convertFromHwb = function (values, model) {
        var h = values[0], w = values[1], b = values[2];
        var rgb = __WEBPACK_IMPORTED_MODULE_0__color_converter__["f" /* hwbToRgb */](h, w, b);
        var red = rgb[0], green = rgb[1], blue = rgb[2];
        switch (model) {
            case 'rgb':
                values = rgb;
                break;
            case 'hwb': break;
            case 'hsl':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["i" /* rgbToHsl */](red, green, blue);
                break;
            case 'hsv':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["e" /* hwbToHsv */](h, w, b);
                break;
            case 'cmyk':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["g" /* rgbToCmyk */](red, green, blue);
                break;
        }
        return values;
    };
    ColorFormatter.prototype.convertFromHsl = function (values, model) {
        var h = values[0], s = values[1], l = values[2];
        var rgb = __WEBPACK_IMPORTED_MODULE_0__color_converter__["b" /* hslToRgb */](h, s, l);
        var red = rgb[0], green = rgb[1], blue = rgb[2];
        switch (model) {
            case 'rgb':
                values = rgb;
                break;
            case 'hwb':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["k" /* rgbToHwb */](red, green, blue);
                break;
            case 'hsl': break;
            case 'hsv':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["j" /* rgbToHsv */](red, green, blue);
                break;
            case 'cmyk':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["g" /* rgbToCmyk */](red, green, blue);
                break;
        }
        return values;
    };
    ColorFormatter.prototype.convertFromHsv = function (values, model) {
        var h = values[0], s = values[1], v = values[2];
        var rgb = __WEBPACK_IMPORTED_MODULE_0__color_converter__["d" /* hsvToRgb */](h, s, v);
        var red = rgb[0], green = rgb[1], blue = rgb[2];
        switch (model) {
            case 'rgb':
                values = rgb;
                break;
            case 'hwb':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["c" /* hsvToHwb */](h, s, v);
                break;
            case 'hsl':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["i" /* rgbToHsl */](red, green, blue);
                break;
            case 'hsv': break;
            case 'cmyk':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["g" /* rgbToCmyk */](red, green, blue);
                break;
        }
        return values;
    };
    ColorFormatter.prototype.convertFromCmyk = function (values, model) {
        var c = values[0], m = values[1], y = values[2], k = values[3];
        var rgb = __WEBPACK_IMPORTED_MODULE_0__color_converter__["a" /* cmykToRgb */](c, m, y, k);
        var red = rgb[0], green = rgb[1], blue = rgb[2];
        switch (model) {
            case 'rgb':
                values = rgb;
                break;
            case 'hwb':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["k" /* rgbToHwb */](red, green, blue);
                break;
            case 'hsl':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["i" /* rgbToHsl */](red, green, blue);
                break;
            case 'hsv':
                values = __WEBPACK_IMPORTED_MODULE_0__color_converter__["j" /* rgbToHsv */](red, green, blue);
                break;
            case 'cmyk': break;
        }
        return values;
    };
    return ColorFormatter;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = hslToRgb;
/* harmony export (immutable) */ __webpack_exports__["i"] = rgbToHsl;
/* harmony export (immutable) */ __webpack_exports__["f"] = hwbToRgb;
/* harmony export (immutable) */ __webpack_exports__["k"] = rgbToHwb;
/* harmony export (immutable) */ __webpack_exports__["a"] = cmykToRgb;
/* harmony export (immutable) */ __webpack_exports__["g"] = rgbToCmyk;
/* harmony export (immutable) */ __webpack_exports__["d"] = hsvToRgb;
/* harmony export (immutable) */ __webpack_exports__["j"] = rgbToHsv;
/* harmony export (immutable) */ __webpack_exports__["c"] = hsvToHwb;
/* harmony export (immutable) */ __webpack_exports__["e"] = hwbToHsv;
/* harmony export (immutable) */ __webpack_exports__["h"] = rgbToHex;
/* unused harmony export hexToRgb */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(0);

/**
 * Converts an HSL to RGB.
 * @see https://www.rapidtables.com/convert/color/hsl-to-rgb.html
 * @export
 * @param {number} h hue
 * @param {number} s saturation 0-100
 * @param {number} l lightness 0-100
 * @returns {number[]} [red, green, blue] 0-255
 */
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    var i = h / 60;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs(i % 2 - 1));
    var m = l - c / 2;
    var r;
    var g;
    var b;
    switch (Math.floor(i)) {
        case 0:
            r = c, g = x, b = 0;
            break;
        case 1:
            r = x, g = c, b = 0;
            break;
        case 2:
            r = 0, g = c, b = x;
            break;
        case 3:
            r = 0, g = x, b = c;
            break;
        case 4:
            r = x, g = 0, b = c;
            break;
        case 5:
            r = c, g = 0, b = x;
            break;
    }
    return [r, g, b].map(function (val) { return Math.round((val + m) * 255); });
}
/**
 * Converts RGB to HSL.
 * @see https://www.rapidtables.com/convert/color/rgb-to-hsl.html
 * @export
 * @param {number} r red 0-255
 * @param {number} g green 0-255
 * @param {number} b blue 0-255
 * @returns {number[]} [hue, saturation, lightness] (0-360, 0-100, 0-100)
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var h;
    var s;
    var l;
    if (delta === 0) {
        h = 0;
    }
    else if (max === r) {
        h = 60 * ((g - b) / delta % 6);
    }
    else if (max === g) {
        h = 60 * ((b - r) / delta + 2);
    }
    else {
        h = 60 * ((r - g) / delta + 4);
    }
    l = (max + min) / 2;
    s = delta === 0 ? 0 : delta / 1 - Math.abs(2 * l - 1);
    return [h, s * 100, l * 100];
}
/**
 * Converts HWB to RGB.
 * @export
 * @param {number} hue hue 0-360
 * @param {number} white whiteness 0-100
 * @param {number} black blackness 0-100
 * @returns {number[]} [red, green, blue] 0-255
 */
function hwbToRgb(hue, white, black) {
    var _a = hwbToHsv(hue, white, black), h = _a[0], s = _a[1], v = _a[2];
    return hsvToRgb(h, s, v);
}
/**
 * Converts RGB to HWB.
 * @export
 * @param {number} r red 0-255
 * @param {number} g green 0-255
 * @param {number} b blue 0-255
 * @returns {number[]} [hue, whiteness, blackness] (0-360, 0-100, 0-100)
 */
function rgbToHwb(r, g, b) {
    var _a = rgbToHsv(r, g, b), h = _a[0], s = _a[1], v = _a[2];
    return hsvToHwb(h, s, v);
}
/**
 * Converts CMYK to RGB.
 * @see https://www.rapidtables.com/convert/color/cmyk-to-rgb.html
 * @export
 * @param {number} c cyan 0-100
 * @param {number} m magenta 0-100
 * @param {number} y yellow 0-100
 * @param {number} k black 0-100
 * @returns {number[]} [red, green, blue] 0-255
 */
function cmykToRgb(c, m, y, k) {
    c /= 100, m /= 100, y /= 100, k /= 100;
    var red = 255 * (1 - c) * (1 - k);
    var green = 255 * (1 - m) * (1 - k);
    var blue = 255 * (1 - y) * (1 - k);
    return [red, green, blue].map(function (x) { return Math.round(x); });
}
/**
 * Converts RGB to CMYK
 * @see https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
 * @export
 * @param {number} r red 0-255
 * @param {number} g green 0-255
 * @param {number} b blue 0-255
 * @returns {number[]} [cyan, magenta, yellow, black] 0-100
 */
function rgbToCmyk(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var k = 1 - Math.max(r, g, b);
    var c = (1 - r - k) / (1 - k);
    var m = (1 - g - k) / (1 - k);
    var y = (1 - b - k) / (1 - k);
    return [c, m, y, k].map(function (x) { return x * 100; });
}
/**
 * Converts HSV to RGB.
 * @see https://www.rapidtables.com/convert/color/hsv-to-rgb.html
 * @export
 * @param {number} h hue 0-360
 * @param {number} s saturation 0-100
 * @param {number} v value 0-100
 * @returns {number[]} [red, green, blue] 0-255
 */
function hsvToRgb(h, s, v) {
    s /= 100;
    v /= 100;
    var r;
    var g;
    var b;
    var i = h / 60;
    var c = v * s;
    var x = c * (1 - Math.abs(i % 2 - 1));
    var m = v - c;
    switch (Math.floor(i)) {
        case 0:
            r = c, g = x, b = 0;
            break;
        case 1:
            r = x, g = c, b = 0;
            break;
        case 2:
            r = 0, g = c, b = x;
            break;
        case 3:
            r = 0, g = x, b = c;
            break;
        case 4:
            r = x, g = 0, b = c;
            break;
        case 5:
            r = c, g = 0, b = x;
            break;
    }
    return [r, g, b].map(function (val) { return Math.round((val + m) * 255); });
}
/**
 * Converts RGB to HSV.
 * @see https://www.rapidtables.com/convert/color/rgb-to-hsv.html
 * @export
 * @param {number} r red 0-255
 * @param {number} g green 0-255
 * @param {number} b blue 0-255
 * @returns {number[]} [hue, saturation, value] (0-360, 0-100, 0-100)
 */
function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var h;
    var s;
    var v;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    if (delta === 0) {
        h = 0;
    }
    else if (max === r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (max === g) {
        h = 60 * ((b - r) / delta + 2);
    }
    else {
        h = 60 * ((r - g) / delta + 4);
    }
    s = max === 0 ? 0 : delta / max;
    v = max;
    return [h, s * 100, v * 100];
}
/**
 * Converts HSV to HWB
 * @see https://en.wikipedia.org/wiki/HWB_color_model
 * @export
 * @param {number} h hue 0-360
 * @param {number} s saturation 0-100
 * @param {number} v value 0-100
 * @returns {number[]} [hue, whiteness, blackness] (0-360, 0-100, 0-100)
 */
function hsvToHwb(h, s, v) {
    s /= 100, v /= 100;
    var white = (1 - s) * v;
    var black = 1 - v;
    return [h, white * 100, black * 100];
}
/**
 * Converts HWB to HSV.
 * @see https://en.wikipedia.org/wiki/HWB_color_model
 * @export
 * @param {number} h hue 0-360
 * @param {number} w whiteness 0-100
 * @param {number} b blackness 0-100
 * @returns {number[]} [hue, saturation, value] (0-360, 0-100, 0-100)
 */
function hwbToHsv(h, w, b) {
    w /= 100, b /= 100;
    var s = 1 - w / (1 - b);
    var v = 1 - b;
    return [h, s * 100, v * 100];
}
/**
 * Converts RGB to HEX string.
 * @export
 * @param {number} r red 0-255
 * @param {number} g green 0-255
 * @param {number} b blue 0-255
 * @param {(number|null)} [a] alpha 0-1 or null
 * @param {boolean} [enableShort] enable shorthand, default is false.
 * @returns {string} Hex string. e.g. 'ff0000'
 */
function rgbToHex(r, g, b, a, enableShort) {
    var arr = [r, g, b];
    if (typeof a === 'number') {
        arr.push(Math.round(a * 255));
    }
    var hex = arr.map(function (x) { return Object(__WEBPACK_IMPORTED_MODULE_0__util_util__["c" /* padStart */])(x.toString(16), 2, '0'); }).join('');
    return enableShort ? hexToShorthand(hex) : hex;
}
function hexToShorthand(hex) {
    var check = true;
    var rgb = hex.match(/.{2}/g);
    rgb.forEach(function (x) {
        if (!x.match(/(.)\1+/)) {
            check = false;
        }
    });
    return check ? rgb.map(function (x) { return x.substring(1); }).join('') : hex;
}
/**
 * Converts HEX string to RGB.
 * @export
 * @param {string} hex hex string. e.g. 'ff0000', 'f00', 'ff000080'
 * @returns {number[]} [red, green, blue, alpha?] (rgb: 0-255, alpha: 0-1)
 */
function hexToRgb(hex) {
    var short = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    return hex.replace(short, function (m, r, g, b, a) {
        a = typeof a === 'undefined' ? '' : a;
        return r + r + g + g + b + b + a + a;
    })
        .match(/.{2}/g)
        .map(function (x, i) { return i !== 3 ? parseInt(x, 16) : parseInt(x, 16) / 255; });
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inputParser;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_names__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_util__ = __webpack_require__(0);


function inputParser(input) {
    if (typeof input === 'string') {
        if (input in __WEBPACK_IMPORTED_MODULE_0__color_names__["a" /* default */]) {
            // Named colors.
            return {
                model: 'rgb',
                values: __WEBPACK_IMPORTED_MODULE_0__color_names__["a" /* default */][input],
                alpha: 1,
            };
        }
        else if (input === 'transparent') {
            // 'transparent'.
            return {
                model: 'rgb',
                values: [0, 0, 0],
                alpha: 0,
            };
        }
        else {
            // parse string.
            var prefix = input.substr(0, 3).toLowerCase();
            switch (prefix) {
                case 'hwb': return parseHwb(input);
                case 'hsl': return parseHsl(input);
                case 'hsv': return parseHsv(input);
                case 'cmy': return parseCmyk(input);
                default: return parseRgb(input);
            }
        }
    }
}
function parseRgb(input) {
    var hex = /^#?([a-f0-9]{6})([a-f0-9]{2})?$/i;
    var shortHex = /^#?([a-f0-9]{3})([a-f0-9]{1})?$/i;
    var rgba = /^rgba?\s*\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
    // tslint:disable-next-line:max-line-length
    var percent = /^rgba?\s*\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
    var match;
    var hexToAlpha = function (num) { return Math.round((parseInt(num, 16) / 255) * 100) / 100; };
    var val;
    var a;
    if (hex.test(input)) {
        match = input.match(hex);
        var hexPart = match[1];
        var alphaPart = match[2];
        val = hexPart.match(/.{2}/g).map(function (x) { return parseInt(x, 16); });
        a = alphaPart ? hexToAlpha(alphaPart) : 1;
    }
    else if (shortHex.test(input)) {
        match = input.match(shortHex);
        var hexPart = match[1];
        var alphaPart = match[2];
        val = hexPart.match(/.{1}/g).map(function (x) { return parseInt(x + x, 16); });
        a = alphaPart ? hexToAlpha(alphaPart) : 1;
    }
    else if (rgba.test(input)) {
        match = input.match(rgba);
        val = match.slice(1, 4).map(function (x) { return parseInt(x, 0); });
        a = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["d" /* resolveAlpha */])(match[4]);
    }
    else if (percent.test(input)) {
        match = input.match(percent);
        val = match.slice(1, 4).map(function (x) { return Math.round(parseFloat(x) * 2.55); });
        a = Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["d" /* resolveAlpha */])(match[4]);
    }
    else {
        return null;
    }
    return {
        model: 'rgb',
        values: val.map(function (x) { return Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(x, 0, 255); }),
        alpha: Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(a, 0, 1),
    };
}
function parseHsl(input) {
    // tslint:disable-next-line:max-line-length
    var hsl = /^hsla?\s*\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;
    if (hsl.test(input)) {
        var match = input.match(hsl);
        return {
            model: 'hsl',
            values: [
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["b" /* degree */])(match[1]),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[2]), 0, 100),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[3]), 0, 100),
            ],
            alpha: Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["d" /* resolveAlpha */])(match[4]),
        };
    }
    else {
        return null;
    }
}
function parseHwb(input) {
    // tslint:disable-next-line:max-line-length
    var hwb = /^hwba?\s*\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;
    if (hwb.test(input)) {
        var match = input.match(hwb);
        return {
            model: 'hwb',
            values: [
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["b" /* degree */])(match[1]),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[2]), 0, 100),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[3]), 0, 100),
            ],
            alpha: Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["d" /* resolveAlpha */])(match[4]),
        };
    }
    else {
        return null;
    }
}
function parseHsv(input) {
    // tslint:disable-next-line:max-line-length
    var hsv = /^hsva?\s*\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;
    if (hsv.test(input)) {
        var match = input.match(hsv);
        return {
            model: 'hsv',
            values: [
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["b" /* degree */])(match[1]),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[2]), 0, 100),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[3]), 0, 100),
            ],
            alpha: Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["d" /* resolveAlpha */])(match[4]),
        };
    }
    else {
        return null;
    }
}
function parseCmyk(input) {
    // tslint:disable-next-line:max-line-length
    var cmyk = /^cmyk\s*\(\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i;
    if (cmyk.test(input)) {
        var match = input.match(cmyk);
        return {
            model: 'cmyk',
            values: [
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[1]), 0, 100),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[2]), 0, 100),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[3]), 0, 100),
                Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* clamp */])(parseFloat(match[4]), 0, 100),
            ],
            alpha: Object(__WEBPACK_IMPORTED_MODULE_1__util_util__["d" /* resolveAlpha */])(match[5]),
        };
    }
    else {
        return null;
    }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color_name__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color_name___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_color_name__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_color_name__);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=moo-color.js.map