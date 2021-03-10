export const engUnits = {
  cup: ['c', 'c.', 'C', 'Cups'],
  gallon: ['gal'],
  ounce: ['oz', 'oz.'],
  pint: ['pt', 'pts', 'pt.'],
  pound: ['lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs'],
  quart: ['qt', 'qt.', 'qts', 'qts.'],
  tablespoon: ['tbs', 'tbsp', 'tbspn', 'T', 'T.', 'Tablespoons', 'Tablespoon'],
  teaspoon: ['tsp', 'tspn', 't', 't.'],
  gram: ['g', 'g.'],
  kilogram: ['kg', 'kg.', 'Kg', 'Kg.'],
  liter: ['l', 'l.', 'L', 'L.'],
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
  tazza: [ 'Tazza', 'tazzina', 'Tazzina','tazzine'],
  gallone: ['gal', 'Gallone'],
  oncia: ['oz', 'oz.', 'Oncia','once'],
  pinta: ['pt', 'pts', 'pt.', 'Pinta'],
  libbra: ['lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs', 'Libbra'],
  quarto: ['qt', 'qt.', 'qts', 'qts.', "Quarto"],
  cucchiaio: ['Cucchiaio', 'Cucchiai'],
  cucchiaino: ['Cucchiaino', 'Cucchiaini','cucchiaini'],
  grammo: ['g', 'g.', 'Grammo'],
  chilogrammo: ['kg', 'kg.', 'Kg', 'Kg.', 'Chilogrammo', 'chilogrammi', 'Chilogrammi'],
  litro: ['l', 'l.', 'L', 'L.', 'Litro'],
  milligrammo: ['mg', 'mg.', 'Milligrammo'],
  millilitro: ['ml', 'ml.', 'mL', 'mL.', 'Millilitro'],
  panetto: ['Panetto'],
  foglia: ['Foglia'],
  mazzetto: ['Mazzetto'],
  vasetto: ['Vasetto'],
  pacco: ['pkg', 'pkgs', 'pacchetto','Pacchetto','Pacco'],
  pezzo: ['pcs', 'pcs.'],
  pizzico: ['Pizzico'],
  piccolo: ['Piccolo'],
  medio: ['Medio'],
  grande: ['Grande'],
} as { [key: string]: string[] };

export const itaPluralUnits = {
  tazza: 'tazze',
  gallone: 'galloni',
  oncia: 'oncie',
  pinta: 'pinte',
  libbra: 'libbre',
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

