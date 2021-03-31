import { numbersMap, toTasteMap} from './numbers';

export function convertFromFraction(value: string) {
  // number comes in, for example: 1 1/3
  if (value && value.split(' ').length > 1) {
    const [whole, fraction] = value.split(' ');
    const [a, b] = fraction.split('/');
    const remainder = parseFloat(a) / parseFloat(b);
    const wholeAndFraction = parseInt(whole) ? parseInt(whole) + remainder : remainder;
    return keepThreeDecimals(wholeAndFraction);
  } else if (!value || value.split('-').length > 1) {
    return value;
  } else {
    const [a, b] = value.split('/');
    return b ? keepThreeDecimals(parseFloat(a) / parseFloat(b)) : a;
  }
}

export function getFirstMatch(line: string, regex: RegExp) {
  const match = line.match(regex);
  return (match && match[0]) || '';
}

const unicodeObj: { [key: string]: string } = {
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

export function text2num(s: string, language: string) {
  const toTaste = toTasteMap[language]
  const firstLetter = toTaste.match(/\b(\w)/g);
  const a = s.toString().split(/[\s-]+/);
  let values: number[]=[0,0];

  if(firstLetter){
    const regExString = firstLetter.join('[.]?') +'[.]?'
    const regEx = new RegExp(regExString, 'gi')
    if(a[0].match(regEx)){
      console.log((firstLetter.join('.') +'.').toLowerCase())
      return (firstLetter.join('.') +'.').toLocaleLowerCase()
    }
  }
  a.forEach(x =>{
    values = feach(x, values[0], values[1], language)
  });
  if(values[0] + values[1]<0)
    return null
  else 
    return values[0] + values[1];
}

export function feach(w: string, g: number, n: number, language: string) {
  let number = numbersMap.get(language)
  let small = number[0]
  let magnitude = number[1]
  var x = small[w];
  if (x != null) {
      g = g + x;
  }
  else if (100 == magnitude[w]) {
    if(g>0)
      g = g * 100;
    else
      g = 100
  }
  else {
      x = magnitude[w];
      if (x != null) {
          n = n + g * x
          g = 0;
      }
      else 
          return [-1, -1]
      
  }
  return [g,n]
}

export function findQuantityAndConvertIfUnicode(ingredientLine: string, language: string) {
  const numericAndFractionRegex = /^(\d+\/\d+)|(\d+\s\d+\/\d+)|(\d+.\d+)|\d+/g;
  const numericRangeWithSpaceRegex = /^(\d+\-\d+)|^(\d+\s\-\s\d+)|^(\d+\sto\s\d+)/g; // for ex: "1 to 2" or "1 - 2"
  const unicodeFractionRegex = /\d*[^\u0000-\u007F]+/g;
  const onlyUnicodeFraction = /[^\u0000-\u007F]+/g;
  const wordUntilSpace = /[^\s]+/g;
  const wordToTaste = toTasteMap[language]
  const regexToTaste= new RegExp(wordToTaste,'gi')

  // found a unicode quantity inside our regex, for ex: '⅝'
  if (ingredientLine.match(unicodeFractionRegex)) {
    const numericPart = getFirstMatch(ingredientLine, numericAndFractionRegex);
    const unicodePart = getFirstMatch(ingredientLine, numericPart ? onlyUnicodeFraction : unicodeFractionRegex);

    // If there's a match for the unicodePart in our dictionary above
    if (unicodeObj[unicodePart]) {
      return [`${numericPart} ${unicodeObj[unicodePart]}`, ingredientLine.replace(getFirstMatch(ingredientLine, unicodeFractionRegex), '').trim()];
    }
  }

  // found a quantity range, for ex: "2 to 3"
  if (ingredientLine.match(numericRangeWithSpaceRegex)) {
    const quantity = getFirstMatch(ingredientLine, numericRangeWithSpaceRegex).replace('to', '-').split(' ').join('');
    const restOfIngredient = ingredientLine.replace(getFirstMatch(ingredientLine, numericRangeWithSpaceRegex), '').trim();
    return [ingredientLine.match(numericRangeWithSpaceRegex) && quantity, restOfIngredient];
  }

  // found a numeric/fraction quantity, for example: "1 1/3"
  if (ingredientLine.match(numericAndFractionRegex)) {
    const quantity = getFirstMatch(ingredientLine, numericAndFractionRegex);
    const restOfIngredient = ingredientLine.replace(getFirstMatch(ingredientLine, numericAndFractionRegex), '').trim()
    return [ingredientLine.match(numericAndFractionRegex) && quantity, restOfIngredient];
  }
  if (ingredientLine.match(regexToTaste)) {
    const toTaste = getFirstMatch(ingredientLine, regexToTaste);
    const fistLetter = toTaste.match(/\b(\w)/g)
    if(fistLetter){
      const outPut = (fistLetter.join('.') +'.').toLocaleLowerCase()
      const restOfIngredient = ingredientLine.replace(getFirstMatch(ingredientLine, regexToTaste), '').trim()
      return [ingredientLine.match(regexToTaste) && outPut, restOfIngredient];
    }
  }
  else if(ingredientLine.match(wordUntilSpace)) {
    const quantity = getFirstMatch(ingredientLine, wordUntilSpace);
    const quantityNumber = text2num(quantity.toLowerCase(), language)
    if(quantityNumber){
      const restOfIngredient = ingredientLine.replace(getFirstMatch(ingredientLine, wordUntilSpace), '').trim()
      return [ingredientLine.match(wordUntilSpace) && quantityNumber + '', restOfIngredient];
    }
    else
      return [null, ingredientLine];
    
  }

  // no parse-able quantity found
  else {
    return [null, ingredientLine];
  }
}

function keepThreeDecimals(val: number) {
  const strVal = val.toString();
  return strVal.split('.')[0] + '.' + strVal.split('.')[1].substring(0, 3);
}
