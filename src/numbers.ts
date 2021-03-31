export const engSmall: { [key: string]: number } = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
  };
  
  export const engMagnitude: { [key: string]: number } = {
    'hundred':      100,
    'thousand':     1000,
    'million':      1000000,
    'billion':      1000000000,
    'trillion':     1000000000000,
  };

  export const itaSmall: { [key: string]: number } = {
    'zero': 0,
    'mezzo': 0.5,
    'metà': 0.5,
    'meta': 0.5,
    'uno': 1,
    'una': 1,
    'un': 1,
    'due': 2,
    'tre': 3,
    'quattro': 4,
    'cinque': 5,
    'sei': 6,
    'sette': 7,
    'otto': 8,
    'nove': 9,
    'dieci': 10,
    'undici': 11,
    'dodici': 12,
    'dozzina': 12,
    'tredici': 13,
    'quattordici': 14,
    'quindici': 15,
    'sedici': 16,
    'diciassette': 17,
    'diciotto': 18,
    'diciannove': 19,
    'venti': 20,
    'ventuno': 21,
    'trenta': 30,
    'trentuno': 31,
    'quaranta': 40,
    'quarantuno': 41,
    'cinquanta': 50,
    'cinquantuno': 51,
    'sessasanta': 60,
    'sessasantuno': 61,
    'settanta': 70,
    'settantuno': 71,
    'ottanta': 80,
    'ottantuno': 81,
    'novanta': 90,
    'novantuno': 91

  };
  
  export const itaMagnitude: { [key: string]: number } = {
    'cento': 100,
    'mille':     1000,
    'mila':     1000,
    'millione':      1000000,
    'milliardo':      1000000000,
    'trilliardo':     1000000000000,
  };
  export const toTasteMap: {[key:string]: string } = {
    'eng': 'to taste',
    'ita': 'quanto basta',
  };
export const  numbersMap = new Map();
numbersMap.set("eng",[engSmall,  engMagnitude]);
numbersMap.set("ita",[itaSmall,  itaMagnitude]);

