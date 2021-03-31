export const engUnits = {
  cup: ['c', 'c.', 'C', 'Cups','cups'],
  gallon: ['gal'],
  ounce: ['oz', 'oz.'],
  pint: ['pt', 'pts', 'pt.'],
  pound: ['lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs'],
  quart: ['qt', 'qt.', 'qts', 'qts.'],
  tablespoon: ['tbs', 'tbsp', 'tbspn', 'T', 'T.', 'Tablespoons', 'Tablespoon', 'tablespoons'],
  teaspoon: ['tsp', 'tspn', 't', 't.', 'teaspoons'],
  gram: ['g', 'g.'],
  kilogram: ['kg', 'kg.', 'Kg', 'Kg.'],
  liter: ['l', 'l.', 'lt', 'Lt', 'LT', 'L', 'L.'],
  milligram: ['mg', 'mg.'],
  milliliter: ['ml', 'ml.', 'mL', 'mL.'],
  package: ['pkg', 'pkgs'],
  stick: ['sticks'],
  piece: ['pcs', 'pcs.'],
  pinch: ['pinch'],
  small: ['Small'],
  medium: ['Medium'],
  large: ['large', 'Large'],
} as { [key: string]: string[] };

export const engPluralUnits = {
  cup: 'cups',
  gallon: 'gallons',
  ounce: 'ounces',
  pint: 'pints',
  pound: 'pounds',
  quart: 'quarts',
  tablespoon: 'tablespoons',
  teaspoon: 'teaspoons',
  gram: 'grams',
  kilogram: 'kilograms',
  liter: 'liters',
  milligram: 'milligrams',
  milliliter: 'milliliters',
  clove: 'cloves',
  bag: 'bags',
  box: 'boxes',
  pinch: 'pinches',
  can: 'cans',
  slice: 'slices',
  piece: 'pieces'
} as { [key: string]: string };

export const engPreposition = ['of'];


export const itaUnits = {
  tazza: [ 'Tazza', 'tazzina', 'Tazzina','tazzine', 'tazze'],
  cucchiaio: ['Cucchiaio', 'Cucchiai'],
  cucchiaino: ['Cucchiaino', 'Cucchiaini','cucchiaini'],
  grammo: ['g', 'g.', 'gr','Grammo', 'grammi', 'Grammi'],
  chilogrammo: ['kg', 'kg.', 'KG','Kg', 'Kg.', 'Chilogrammo', 'chilogrammi', 'Chilogrammi','kilogrammo', 'Kilogrammo'],
  litro: ['l', 'l.', 'L', 'L.', 'lt','Litro', 'litri'],
  milligrammo: ['mg', 'mg.', 'Milligrammo','milligrammi'],
  millilitro: ['ml', 'ml.', 'mL', 'mL.', 'Millilitro','millilitri'],
  panetto: ['Panetto', 'panetti'],
  foglia: ['Foglia','foglie'],
  mazzetto: ['Mazzetto','mazzetti'],
  vasetto: ['Vasetto', 'vasetti'],
  pacco: ['pkg', 'pkgs', 'pacchetto','Pacchetto','Pacco', 'pacchi'],
  pezzo: ['pcs', 'pcs.','pezzi'],
  pizzico: ['Pizzico','pizzichi'],
} as { [key: string]: string[] };

export const itaPluralUnits = {
  tazza: 'tazze',
  quarto: 'quarti',
  cucchiaio: 'cucchiai',
  cucchiaino: 'cucchiaini',
  grammo: 'grammi',
  chilogrammo: 'chilogrammo',
  litro: 'litri',
  milligrammo: 'milligrammi',
  millilitro: 'millilitri',
  spicchio: 'spicchi',
  bustina: 'bustine',
  scatola: 'scatole',
  pizzico: 'pizzichi',
  lattina: 'lattine',
  fetta: 'fette',
  pezzo: 'pezzi',
  panetto: 'panetti',
  foglia: 'foglie',
  mazzetto: 'mazzetti',
  vasetto: 'vasetto'
} as { [key: string]: string };

export const itaPreposition = ['di','d\''];

export const  unitsMap = new Map();
unitsMap.set("eng",[engUnits,  engPluralUnits, engPreposition]);
unitsMap.set("ita",[itaUnits,  itaPluralUnits, itaPreposition]);

