"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convert = require("./convert");
var units_1 = require("./units");
var repeatingFractions_1 = require("./repeatingFractions");
var Natural = require("natural");
var nounInflector = new Natural.NounInflector();
function getUnit(input) {
    if (units_1.units[input] || units_1.pluralUnits[input]) {
        return [input];
    }
    for (var _i = 0, _a = Object.keys(units_1.units); _i < _a.length; _i++) {
        var unit = _a[_i];
        for (var _b = 0, _c = units_1.units[unit]; _b < _c.length; _b++) {
            var shorthand = _c[_b];
            if (input === shorthand) {
                return [unit, input];
            }
        }
    }
    for (var _d = 0, _e = Object.keys(units_1.pluralUnits); _d < _e.length; _d++) {
        var pluralUnit = _e[_d];
        if (input === units_1.pluralUnits[pluralUnit]) {
            return [pluralUnit, input];
        }
    }
    return [];
}
function parse(recipeString) {
    var _a;
    var ingredientLine = recipeString.trim(); // removes leading and trailing whitespace
    /* restOfIngredient represents rest of ingredient line.
    For example: "1 pinch salt" --> quantity: 1, restOfIngredient: pinch salt */
    var _b = convert.findQuantityAndConvertIfUnicode(ingredientLine), quantity = _b[0], restOfIngredient = _b[1];
    quantity = convert.convertFromFraction(quantity);
    /* when quantity includes an extra number, this means we likely have a special unit type like 12 oz can */
    var extraUnitInfo = '';
    if (quantity && quantity.split(' ').length > 1) {
        var _c = quantity.split(' '), amount = _c[0], extra = _c[1];
        quantity = amount;
        extraUnitInfo = extra;
    }
    /* extraInfo will be any info in parantheses. We'll place it at the end of the ingredient.
    For example: "sugar (or other sweetener)" --> extraInfo: "(or other sweetener)" */
    var extraInfo;
    if (convert.getFirstMatch(restOfIngredient, /\(([^\)]+)\)/)) {
        extraInfo = convert.getFirstMatch(restOfIngredient, /\(([^\)]+)\)/);
        restOfIngredient = restOfIngredient.replace(extraInfo, '').trim();
    }
    // grab unit and turn it into non-plural version, for ex: "Tablespoons" OR "Tsbp." --> "tablespoon"
    var _d = getUnit(restOfIngredient.split(' ')[0]), unit = _d[0], originalUnit = _d[1];
    // remove unit from the ingredient if one was found and trim leading and trailing whitespace
    var ingredient = !!originalUnit ? restOfIngredient.replace(originalUnit, '').trim() : restOfIngredient.replace(unit, '').trim();
    var minQty = quantity; // default to quantity
    var maxQty = quantity; // default to quantity
    // if quantity is non-nil and is a range, for ex: "1-2", we want to get minQty and maxQty
    if (quantity && quantity.includes('-')) {
        _a = quantity.split('-'), minQty = _a[0], maxQty = _a[1];
    }
    return {
        quantity: quantity,
        unit: !!unit ? (!!extraUnitInfo ? extraUnitInfo + ' ' : '') + unit : null,
        ingredient: extraInfo ? ingredient + " " + extraInfo : ingredient,
        minQty: minQty,
        maxQty: maxQty,
    };
}
exports.parse = parse;
function combine(ingredientArray) {
    var combinedIngredients = ingredientArray.reduce(function (acc, ingredient) {
        var _a, _b;
        var key = ingredient.ingredient + ingredient.unit; // when combining different units, remove this from the key and just use the name
        var existingIngredient = acc[key];
        if (existingIngredient) {
            return Object.assign(acc, (_a = {}, _a[key] = combineTwoIngredients(existingIngredient, ingredient), _a));
        }
        else {
            return Object.assign(acc, (_b = {}, _b[key] = ingredient, _b));
        }
    }, {});
    return Object.keys(combinedIngredients).reduce(function (acc, key) {
        var ingredient = combinedIngredients[key];
        return acc.concat(ingredient);
    }, []).sort(compareIngredients);
}
exports.combine = combine;
function prettyPrintingPress(ingredient) {
    var quantity = '';
    var unit = ingredient.unit;
    if (ingredient.quantity) {
        var _a = ingredient.quantity.split('.'), whole = _a[0], remainder = _a[1];
        if (+whole !== 0 && typeof whole !== 'undefined') {
            quantity = whole;
        }
        if (+remainder !== 0 && typeof remainder !== 'undefined') {
            var fractional = void 0;
            if (repeatingFractions_1.repeatingFractions[remainder]) {
                fractional = repeatingFractions_1.repeatingFractions[remainder];
            }
            else {
                var fraction = '0.' + remainder;
                var len = fraction.length - 2;
                var denominator = Math.pow(10, len);
                var numerator = +fraction * denominator;
                var divisor = gcd(numerator, denominator);
                numerator /= divisor;
                denominator /= divisor;
                fractional = Math.floor(numerator) + '/' + Math.floor(denominator);
            }
            quantity += quantity ? ' ' + fractional : fractional;
        }
        if (((+whole !== 0 && typeof remainder !== 'undefined') || +whole > 1) && unit) {
            unit = nounInflector.pluralize(unit);
        }
    }
    else {
        return ingredient.ingredient;
    }
    return "" + quantity + (unit ? ' ' + unit : '') + " " + ingredient.ingredient;
}
exports.prettyPrintingPress = prettyPrintingPress;
function gcd(a, b) {
    if (b < 0.0000001) {
        return a;
    }
    return gcd(b, Math.floor(a % b));
}
// TODO: Maybe change this to existingIngredients: Ingredient | Ingredient[]
function combineTwoIngredients(existingIngredients, ingredient) {
    var quantity = existingIngredients.quantity && ingredient.quantity ? (Number(existingIngredients.quantity) + Number(ingredient.quantity)).toString() : null;
    var minQty = existingIngredients.minQty && ingredient.minQty ? (Number(existingIngredients.minQty) + Number(ingredient.minQty)).toString() : null;
    var maxQty = existingIngredients.maxQty && ingredient.maxQty ? (Number(existingIngredients.maxQty) + Number(ingredient.maxQty)).toString() : null;
    return Object.assign({}, existingIngredients, { quantity: quantity, minQty: minQty, maxQty: maxQty });
}
function compareIngredients(a, b) {
    if (a.ingredient === b.ingredient) {
        return 0;
    }
    return a.ingredient < b.ingredient ? -1 : 1;
}
//# sourceMappingURL=index.js.map