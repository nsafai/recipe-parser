"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertFromFraction(value) {
    // number comes in, for example: 1 1/3
    if (value && value.includes('/')) {
        if (value && value.split(' ').length > 1) {
            var _a = value.split(' '), whole = _a[0], fraction = _a[1];
            var _b = fraction.split('/'), a = _b[0], b = _b[1];
            var remainder = parseFloat(a) / parseFloat(b);
            var wholeAndFraction = parseInt(whole) ? parseInt(whole) + remainder : remainder;
            return keepThreeDecimals(wholeAndFraction);
        }
        else if (!value || value.split('-').length > 1) {
            return value;
        }
        else {
            var _c = value.split('/'), a = _c[0], b = _c[1];
            return b ? keepThreeDecimals(parseFloat(a) / parseFloat(b)) : a;
        }
    }
    else {
        return value;
    }
}
exports.convertFromFraction = convertFromFraction;
function getFirstMatch(line, regex) {
    var match = line.match(regex);
    return (match && match[0]) || '';
}
exports.getFirstMatch = getFirstMatch;
var unicodeObj = {
    '½': '1/2',
    '⅓': '1/3',
    '⅔': '2/3',
    '¼': '1/4',
    '¾': '3/4',
    '⅕': '1/5',
    '⅖': '2/5',
    '⅗': '3/5',
    '⅘': '4/5',
    '⅙': '1/6',
    '⅚': '5/6',
    '⅐': '1/7',
    '⅛': '1/8',
    '⅜': '3/8',
    '⅝': '5/8',
    '⅞': '7/8',
    '⅑': '1/9',
    '⅒': '1/10'
};
function findQuantityAndConvertIfUnicode(ingredientLine) {
    var numericAndFractionRegex = /(\d+\/\d+)|(\d+\s+\d+\/\d+)|(\d+\.\d+)|\d+/g;
    var numericRangeWithSpaceRegex = /^(\d+\-\d+)|^(\d+\s\-\s\d+)|^(\d+\sto\s\d+)/g; // for ex: "1 to 2" or "1 - 2"
    var unicodeFractionRegex = /\d*[^\u0000-\u007F]+/g;
    var onlyUnicodeFraction = /[^\u0000-\u007F]+/g;
    // found a unicode quantity inside our regex, for ex: '⅝'
    if (ingredientLine.match(unicodeFractionRegex)) {
        var numericPart = getFirstMatch(ingredientLine, numericAndFractionRegex);
        var unicodePart = getFirstMatch(ingredientLine, numericPart ? onlyUnicodeFraction : unicodeFractionRegex);
        // If there's a match for the unicodePart in our dictionary above
        if (unicodeObj[unicodePart]) {
            return [numericPart + " " + unicodeObj[unicodePart], ingredientLine.replace(getFirstMatch(ingredientLine, unicodeFractionRegex), '').trim()];
        }
    }
    // found a quantity range, for ex: "2 to 3"
    if (ingredientLine.match(numericRangeWithSpaceRegex)) {
        var quantity = getFirstMatch(ingredientLine, numericRangeWithSpaceRegex).replace('to', '-').split(' ').join('');
        var restOfIngredient = ingredientLine.replace(getFirstMatch(ingredientLine, numericRangeWithSpaceRegex), '').trim();
        return [ingredientLine.match(numericRangeWithSpaceRegex) && quantity, restOfIngredient];
    }
    else if (ingredientLine.match(numericAndFractionRegex)) {
        var quantity = getFirstMatch(ingredientLine, numericAndFractionRegex);
        var restOfIngredient = ingredientLine.replace(getFirstMatch(ingredientLine, numericAndFractionRegex), '').trim();
        return [ingredientLine.match(numericAndFractionRegex) && quantity, restOfIngredient];
    }
    else {
        return [null, ingredientLine];
    }
}
exports.findQuantityAndConvertIfUnicode = findQuantityAndConvertIfUnicode;
function keepThreeDecimals(val) {
    var strVal = val.toString();
    return strVal.split('.')[0] + '.' + strVal.split('.')[1].substring(0, 3);
}
//# sourceMappingURL=convert.js.map