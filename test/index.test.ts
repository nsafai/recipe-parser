import { expect } from 'chai';
import { parse, combine } from '../src/index';

describe('recipe parser eng', () => {
  it('returns an object', () => {
    expect(typeof parse('1 cup water', 'eng')).to.equal('object');
  });

  describe('translates the quantity', () => {
    it('of "to taste teaspoon water"', () => {
      expect(parse('to taste teaspoon water', 'eng').quantity).to.equal('t.t.');
    });
    it('of "To taste teaspoon water"', () => {
      expect(parse('To taste teaspoon water', 'eng').quantity).to.equal('t.t.');
    }); 
    it('of "t.t. teaspoon water"', () => {
      expect(parse('t.t. teaspoon water', 'eng').quantity).to.equal('t.t.');
    });
    it('of "t.t. teaspoon water"', () => {
      expect(parse('t.t. teaspoon water', 'eng').quantity).to.equal('t.t.');
    });
    it('of "TT teaspoon water"', () => {
      expect(parse('TT teaspoon water', 'eng').quantity).to.equal('t.t.');
    });
    it('of "TT. teaspoon water"', () => {
      expect(parse('TT. teaspoon water', 'eng').quantity).to.equal('t.t.');
    });
    it('of "T.t teaspoon water"', () => {
      expect(parse('T.t teaspoon water', 'eng').quantity).to.equal('t.t.');
    });
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water', 'eng').quantity).to.equal('1');
    });
    it('of "1.5 teaspoon water"', () => {
      expect(parse('1.5 teaspoon water', 'eng').quantity).to.equal('1.5');
    });
    it('of "1 1/2 teaspoon water"', () => {
      expect(parse('1 1/2 teaspoon water', 'eng').quantity).to.equal('1.5');
    });
    it('of "1/3 teaspoon water"', () => {
      expect(parse('1/3 cup water', 'eng').quantity).to.equal('0.333');
    });
    it('of "1/2 teaspoon water"', () => {
      expect(parse('1/2 teaspoon water', 'eng').quantity).to.equal('0.5');
    });
    it('of "10 1/2 teaspoon water"', () => {
      expect(parse('10 1/2 teaspoon water', 'eng').quantity).to.equal('10.5');
    });
    it('of "about 1/2 teaspoon water"', () => {
      expect(parse('about 1/2 teaspoon water', 'eng').quantity).to.equal('0.5');
    });

    describe('translates the quantity from string to number', () => {
      it('one teaspoon water"', () => {
        expect(parse('one teaspoon water', 'eng').quantity).to.equal('1');
      });
      it('twenty-one teaspoon water"', () => {
        expect(parse('twenty-one teaspoon water', 'eng').quantity).to.equal('21');
      });
      it('five teaspoon water"', () => {
        expect(parse('five teaspoon water', 'eng').quantity).to.equal('5');
      });
    });

    describe('translates the quantity range', () => {
      it('of "10-20 teaspoon water"', () => {
        expect(parse('10-20 teaspoon water', 'eng').quantity).to.equal('10-20');
      });
      it('of "10 - 20 teaspoon water"', () => {
        expect(parse('10 - 20 teaspoon water', 'eng').quantity).to.equal('10-20');
      });
      it('of "10 to 20 teaspoon water"', () => {
        expect(parse('10 to 20 teaspoon water', 'eng').quantity).to.equal('10-20');
      });
    });

    describe('of unicode fractions', () => {
      const unicodeAmounts = ['¼', '½', '¾', '⅐', '⅑', '⅒', '⅓', '⅔', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞'];
      const unicodeExpectedAmounts = ['0.25', '0.5', '0.75', '0.142', '0.111', '0.1', '0.333', '0.666', '0.2', '0.4', '0.6', '0.8', '0.166', '0.833', '0.125', '0.375', '0.625', '0.875'];

      for (let u = 0; u < unicodeAmounts.length; u++) {
        const element = unicodeAmounts[u];
        const expectedAmount = unicodeExpectedAmounts[u];
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} teaspoon water`, 'eng').quantity).to.equal(expectedAmount);
        });
      }

      const mixedValues = ['1¼', '2½', '3¾', '4⅐', '5⅑', '6⅒', '7⅓', '8⅔', '9⅕', '10⅖', '11⅗', '12⅘', '13⅙', '14⅚', '15⅛', '16⅜', '17⅝', '18⅞'];
      const mixedExpectedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

      for (let u = 0; u < mixedValues.length; u++) {
        const element = mixedValues[u];
        const expectedAmount = (Number(mixedExpectedValues[u]) + Number(unicodeExpectedAmounts[u])).toString();
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} teaspoon water`, 'eng').quantity).to.equal(expectedAmount);
        });
      }
    });

    it('doesn\'t freak out if a strange unicode character is present', () => {
      expect(parse('1/3 cup confectioners’ sugar', 'eng')).to.deep.equal({
        quantity: '0.333',
        unit: 'cup',
        ingredient: 'confectioners’ sugar',
        minQty: '0.333',
        maxQty: '0.333',
      });
    });
  });

  describe('translates the literal units', () => {
    it('of "1 cup water"', () => {
      expect(parse('1 cup water', 'eng').unit).to.equal('cup');
    });
    it('of "1 gallon water"', () => {
      expect(parse('1 gallon water', 'eng').unit).to.equal('gallon');
    });
    it('of "1 ounce water"', () => {
      expect(parse('1 ounce water', 'eng').unit).to.equal('ounce');
    });
    it('of "1 pint water"', () => {
      expect(parse('1 pint water', 'eng').unit).to.equal('pint');
    });
    it('of "1 pound water"', () => {
      expect(parse('1 pound water', 'eng').unit).to.equal('pound');
    });
    it('of "1 quart water"', () => {
      expect(parse('1 quart water', 'eng').unit).to.equal('quart');
    });
    it('of "1 tablespoon water"', () => {
      expect(parse('1 tablespoon water', 'eng').unit).to.equal('tablespoon');
    });
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water', 'eng').unit).to.equal('teaspoon');
    });
    it('of "1 gram water"', () => {
      expect(parse('1 gram water', 'eng').unit).to.equal('gram');
    });
    it('of "1 kilogram water"', () => {
      expect(parse('1 kilogram water', 'eng').unit).to.equal('kilogram');
    });
    it('of "1 liter water"', () => {
      expect(parse('1 liter water', 'eng').unit).to.equal('liter');
    });
    it('of "1 milligram water"', () => {
      expect(parse('1 milligram water', 'eng').unit).to.equal('milligram');
    });
    it('of "1 milliliter water"', () => {
      expect(parse('1 milliliter water', 'eng').unit).to.equal('milliliter');
    });
    it('of "1 large onion"', () => {
      expect(parse('1 large onion', 'eng').unit).to.equal("large");
    });
    it('of "1 whole onion"', () => {
      expect(parse('1 whole onion', 'eng').unit).to.equal(null);
    });
    it('of "1 clove garlic"', () => {
      expect(parse('1 clove garlic', 'eng').unit).to.equal('clove');
    });
    it('of "1 bag garlic"', () => {
      expect(parse('1 bag garlic', 'eng').unit).to.equal('bag');
    });
    it('of "1 package sausage"', () => {
      expect(parse('1 package sausage', 'eng').unit).to.equal('package');
    });
    it('"1 pinch water"', () => {
      expect(parse('1 pinch salt', 'eng').unit).to.equal('pinch');
    });
    it('"1 (14.5 oz) can tomatoes"', () => {
      expect(parse('1 (14.5 oz) can tomatoes', 'eng')).to.deep.equal({
        unit: 'can',
        quantity: '1',
        ingredient: 'tomatoes (14.5 oz)',
        minQty: '1',
        maxQty: '1',
      });
    });
    it('"25 lb beef stew chunks (or buy a roast and chop into small cubes)"', () => {
      expect(parse('25 lb beef stew chunks (or buy a roast and chop into small cubes)', 'eng')).to.deep.equal({
        unit: 'pound',
        quantity: '25',
        ingredient: 'beef stew chunks (or buy a roast and chop into small cubes)',
        minQty: '25',
        maxQty: '25',
      });
    });
    it('"parses ingredient with range: 1 to 2 chicken breasts"', () => {
      expect(parse('1 to 2 chicken breasts', 'eng')).to.deep.equal({
        unit: null,
        quantity: '1-2',
        ingredient: 'chicken breasts',
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"parses ingredient with range: 1 - 2 chicken breasts"', () => {
      expect(parse('1 - 2 chicken breasts', 'eng')).to.deep.equal({
        unit: null,
        quantity: '1-2',
        ingredient: 'chicken breasts',
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"parses ingredient with range: 1-2 chicken breasts"', () => {
      expect(parse('1-2 chicken breasts', 'eng')).to.deep.equal({
        unit: null,
        quantity: '1-2',
        ingredient: 'chicken breasts',
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"1 (16 oz) box pasta"', () => {
      expect(parse('1 (16 oz) box pasta', 'eng')).to.deep.equal({
        unit: 'box',
        quantity: '1',
        ingredient: 'pasta (16 oz)',
        minQty: '1',
        maxQty: '1',
      });
    });
    it('"1 slice cheese"', () => {
      expect(parse('1 slice cheese', 'eng')).to.deep.equal({
        unit: 'slice',
        quantity: '1',
        ingredient: 'cheese',
        minQty: '1',
        maxQty: '1',
      });
    });
  });

  it('translates unit when no unit provided', () => {
    expect(parse('1 tortilla', 'eng')).to.deep.equal({
      unit: null,
      ingredient: 'tortilla',
      quantity: '1',
      minQty: '1',
      maxQty: '1',
    });
  });

  it('doesn\'t explode when no unit and no quantity provided', () => {
    expect(parse('Powdered Sugar', 'eng')).to.deep.equal({
        ingredient: 'Powdered Sugar',
        quantity: null,
        unit: null,
        minQty: null,
        maxQty: null,
    });
  });

  describe('translates the abbreviated units of', () => {
    it('"1 cup water"', () => {
      expect(parse('1 c water', 'eng').unit).to.equal('cup');
      expect(parse('2 c. water', 'eng').unit).to.equal('cup');
      expect(parse('2 cups water', 'eng').unit).to.equal('cup');
    });
    it('"1 gallon water"', () => {
      expect(parse('1 gal water', 'eng').unit).to.equal('gallon');
      expect(parse('1 gallons water', 'eng').unit).to.equal('gallon');
    });
    it('"1 ounce water"', () => {
      expect(parse('1 oz water', 'eng').unit).to.equal('ounce');
      expect(parse('1 oz. water', 'eng').unit).to.equal('ounce');
      expect(parse('2 ounces water', 'eng').unit).to.equal('ounce');
    });
    it('"1 pint water"', () => {
      expect(parse('1 pt water', 'eng').unit).to.equal('pint');
      expect(parse('2 pts water', 'eng').unit).to.equal('pint');
      expect(parse('1 pt. water', 'eng').unit).to.equal('pint');
      expect(parse('2 pints water', 'eng').unit).to.equal('pint');
    });
    it('"1 pound water"', () => {
      expect(parse('1 lb water', 'eng').unit).to.equal('pound');
      expect(parse('1 lb. water', 'eng').unit).to.equal('pound');
      expect(parse('2 lbs water', 'eng').unit).to.equal('pound');
      expect(parse('2 pounds water', 'eng').unit).to.equal('pound');
    });
    it('"1 quart water"', () => {
      expect(parse('1 qt water', 'eng').unit).to.equal('quart');
      expect(parse('1 qt. water', 'eng').unit).to.equal('quart');
      expect(parse('1 qts water', 'eng').unit).to.equal('quart');
      expect(parse('1 quarts water', 'eng').unit).to.equal('quart');
    });
    it('"1 tablespoon water"', () => {
      expect(parse('1 T water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 T. water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 tbs water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 tbsp water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 tbspn water', 'eng').unit).to.equal('tablespoon');
      expect(parse('2 tablespoons water', 'eng').unit).to.equal('tablespoon');
      expect(parse('1 Tablespoon water', 'eng').unit).to.equal('tablespoon');
      expect(parse('2 Tablespoons water', 'eng').unit).to.equal('tablespoon');
    });
    it('"1 teaspoon water"', () => {
      expect(parse('1 tsp water', 'eng').unit).to.equal('teaspoon');
      expect(parse('1 tspn water', 'eng').unit).to.equal('teaspoon');
      expect(parse('1 t water', 'eng').unit).to.equal('teaspoon');
      expect(parse('1 t. water', 'eng').unit).to.equal('teaspoon');
      expect(parse('2 teaspoons water', 'eng').unit).to.equal('teaspoon');
    });
    it('"1 gram water"', () => {
      expect(parse('1 g water', 'eng').unit).to.equal('gram');
      expect(parse('1 g. water', 'eng').unit).to.equal('gram');
      expect(parse('2 grams water', 'eng').unit).to.equal('gram');
    });
    it('"1 kilogram water"', () => {
      expect(parse('1 kg water', 'eng').unit).to.equal('kilogram');
      expect(parse('1 kg. water', 'eng').unit).to.equal('kilogram');
      expect(parse('2 kilograms water', 'eng').unit).to.equal('kilogram');
    });
    it('"1 liter water"', () => {
      expect(parse('1 l water', 'eng').unit).to.equal('liter');
      expect(parse('1 l. water', 'eng').unit).to.equal('liter');
      expect(parse('2 liters water', 'eng').unit).to.equal('liter');
    });
    it('"1 milligram water"', () => {
      expect(parse('1 mg water', 'eng').unit).to.equal('milligram');
      expect(parse('1 mg. water', 'eng').unit).to.equal('milligram');
      expect(parse('1 milligrams water', 'eng').unit).to.equal('milligram');
    });
    it('"1 milliliter water"', () => {
      expect(parse('1 ml water', 'eng').unit).to.equal('milliliter');
      expect(parse('1 ml. water', 'eng').unit).to.equal('milliliter');
      expect(parse('1 milliliters water', 'eng').unit).to.equal('milliliter');
    });
    it('"1 pinch water"', () => {
      expect(parse('2 pinches salt', 'eng').unit).to.equal('pinch');
    });
  });

  describe('translates the ingredient of', () => {
    it('"1 teaspoon water"', () => {
      expect(parse('1 teaspoon of water', 'eng').ingredient).to.equal('water');
    });
    it('"1 teaspoon  milk"', () => {
      expect(parse('1 teaspoon of milk', 'eng').ingredient).to.equal('milk');
    });
    it('"1 teaspoon  of milk"', () => {
      expect(parse('1 teaspoon of milk', 'eng').ingredient).to.equal('milk');
    });
    it('"1 teaspoon  of milk"', () => {
      expect(parse('1 teaspoon of powdered sugar', 'eng').ingredient).to.equal('powdered sugar');
    });
  });
});


/////ITALIAN TEST
describe('recipe parser ita', () => {
  it('returns an object', () => {
    expect(typeof parse('1 tazza acqua', 'ita')).to.equal('object');
  });

  describe('translates the quantity', () => {
    it('of "quanto basta cucchiao acqua"', () => {
      expect(parse('quanto basta di acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "Quanto basta cucchiao acqua"', () => {
      expect(parse('Quanto basta di acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "Quanto Basta cucchiao acqua"', () => {
      expect(parse('Quanto Basta di acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "q.b. cucchiao acqua"', () => {
      expect(parse('q.b. cucchiao acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "Q.B. cucchiao acqua"', () => {
      expect(parse('Q.B. cucchiao acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "QB cucchiao acqua"', () => {
      expect(parse('QB cucchiao acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "QB. cucchiao acqua"', () => {
      expect(parse('QB. cucchiao acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "Q.B cucchiao acqua"', () => {
      expect(parse('Q.b cucchiao acqua', 'ita').quantity).to.equal('q.b.');
    });
    it('of "1 cucchiao acqua"', () => {
      expect(parse('1 cucchiao acqua', 'ita').quantity).to.equal('1');
    });
    it('of "1.5 cucchiao acqua"', () => {
      expect(parse('1.5 cucchiao acqua', 'ita').quantity).to.equal('1.5');
    });
    it('of "1 1/2 cucchiao acqua"', () => {
      expect(parse('1 1/2 cucchiao acqua', 'ita').quantity).to.equal('1.5');
    });
    it('of "1/3 cucchiao acqua"', () => {
      expect(parse('1/3 cucchiao acqua', 'ita').quantity).to.equal('0.333');
    });
    it('of "1/2 cucchiao acqua"', () => {
      expect(parse('1/2 cucchiao acqua', 'ita').quantity).to.equal('0.5');
    });
    it('of "10 1/2 cucchiao acqua"', () => {
      expect(parse('10 1/2 cucchiao acqua', 'ita').quantity).to.equal('10.5');
    });
    it('of "about 1/2 cucchiao acqua"', () => {
      expect(parse('about 1/2 cucchiao acqua', 'ita').quantity).to.equal('0.5');
    });

    describe('translates the quantity from string to number', () => {
      it('Un cucchiaio d\'acqua', () => {
        expect(parse('Un cucchiaio d\'acqua', 'ita').quantity).to.equal('1');
      });
      it('Un cucchiaio d\'acqua', () => {
        expect(parse('Un cucchiaio d\'acqua', 'ita').quantity).to.equal('1');
      });
      it('mezzo cucchiaio d\'acqua', () => {
        expect(parse('mezzo cucchiaio d\'acqua', 'ita').quantity).to.equal('0.5');
      });
      it('meta cucchiaio d\'acqua', () => {
        expect(parse('meta cucchiaio d\'acqua', 'ita').quantity).to.equal('0.5');
      });
      it('Venti cucchiai d\'acqua"', () => {
        expect(parse('Venti cucchiai d\'acqua', 'ita').quantity).to.equal('20');
      });
      it('cinque cucchiai d\'acqua"', () => {
        expect(parse('cinque cucchiai d\'acqua', 'ita').quantity).to.equal('5');
      });
      it('ventuno cucchiai d\'acqua"', () => {
        expect(parse('ventuno cucchiai d\'acqua', 'ita').quantity).to.equal('21');
      });
      it('mezzo spicchio d\'aglio"', () => {
        expect(parse('mezzo spicchio d\'aglio', 'ita').quantity).to.equal('0.5');
      });
      it('cento grammi d\'aglio"', () => {
        expect(parse('cento grammi d\'aglio', 'ita').quantity).to.equal('100');
      });
      it('cento-due grammi d\'aglio"', () => {
        expect(parse('cento-due grammi d\'aglio', 'ita').quantity).to.equal('102');
      });
      it('due-cento grammi d\'aglio"', () => {
        expect(parse('due-cento grammi d\'aglio', 'ita').quantity).to.equal('200');
      });
      it('due-mila grammi d\'aglio"', () => {
        expect(parse('due-mila grammi d\'aglio', 'ita').quantity).to.equal('2000');
      });
    });

    describe('translates the quantity range', () => {
      it('of "10-20 cucchiao acqua"', () => {
        expect(parse('10-20 cucchiao acqua', 'ita').quantity).to.equal('10-20');
      });
      it('of "10 - 20 cucchiao acqua"', () => {
        expect(parse('10 - 20 cucchiao acqua', 'ita').quantity).to.equal('10-20');
      });
      it('of "10 to 20 cucchiao acqua"', () => {
        expect(parse('10 to 20 cucchiao acqua', 'ita').quantity).to.equal('10-20');
      });
    });


    describe('of unicode fractions', () => {
      const unicodeAmounts = ['¼', '½', '¾', '⅐', '⅑', '⅒', '⅓', '⅔', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞'];
      const unicodeExpectedAmounts = ['0.25', '0.5', '0.75', '0.142', '0.111', '0.1', '0.333', '0.666', '0.2', '0.4', '0.6', '0.8', '0.166', '0.833', '0.125', '0.375', '0.625', '0.875'];

      for (let u = 0; u < unicodeAmounts.length; u++) {
        const element = unicodeAmounts[u];
        const expectedAmount = unicodeExpectedAmounts[u];
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} cucchiao acqua`, 'ita').quantity).to.equal(expectedAmount);
        });
      }

      const mixedValues = ['1¼', '2½', '3¾', '4⅐', '5⅑', '6⅒', '7⅓', '8⅔', '9⅕', '10⅖', '11⅗', '12⅘', '13⅙', '14⅚', '15⅛', '16⅜', '17⅝', '18⅞'];
      const mixedExpectedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

      for (let u = 0; u < mixedValues.length; u++) {
        const element = mixedValues[u];
        const expectedAmount = (Number(mixedExpectedValues[u]) + Number(unicodeExpectedAmounts[u])).toString();
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} cucchiao acqua`, 'ita').quantity).to.equal(expectedAmount);
        });
      }
    });

    it('doesn\'t freak out if a strange unicode character is present', () => {
      expect(parse('1/3 tazza zucchero a velo', 'ita')).to.deep.equal({
        quantity: '0.333',
        unit: 'tazza',
        ingredient: 'zucchero a velo',
        minQty: '0.333',
        maxQty: '0.333',
      });
    });
  });

  describe('translates the literal units', () => {
    it('of "1 tazza acqua"', () => {
      expect(parse('1 tazza acqua', 'ita').unit).to.equal('tazza');
    });
    it('of "1 litro acqua"', () => {
      expect(parse('1 litro acqua', 'ita').unit).to.equal('litro');
    });
    it('of "1 lt acqua"', () => {
      expect(parse('1 lt acqua', 'ita').unit).to.equal('litro');
    });
    it('of "1 kg acqua"', () => {
      expect(parse('1 kg acqua', 'ita').unit).to.equal('chilogrammo');
    });
    it('of "1 L acqua"', () => {
      expect(parse('1 L acqua', 'ita').unit).to.equal('litro');
    });
    it('of "1 L. acqua"', () => {
      expect(parse('1 L. acqua', 'ita').unit).to.equal('litro');
    });
    it('of "1 cucchiaio acqua"', () => {
      expect(parse('1 cucchiaio acqua', 'ita').unit).to.equal('cucchiaio');
    });
    it('of "1 cucchiaio acqua"', () => {
      expect(parse('1 cucchiaio acqua', 'ita').unit).to.equal('cucchiaio');
    });
    it('of "1 grammo acqua"', () => {
      expect(parse('1 grammo acqua', 'ita').unit).to.equal('grammo');
    });
    it('of "1 chilogrammo acqua"', () => {
      expect(parse('1 chilogrammo acqua', 'ita').unit).to.equal('chilogrammo');
    });
    it('of "1 litro acqua"', () => {
      expect(parse('1 litro acqua', 'ita').unit).to.equal('litro');
    });
    it('of "1 milligrammo acqua"', () => {
      expect(parse('1 milligrammo acqua', 'ita').unit).to.equal('milligrammo');
    });
    it('of "1 millilitro acqua"', () => {
      expect(parse('1 millilitro acqua', 'ita').unit).to.equal('millilitro');
    });
    it('of "1 l cipolla"', () => {
      expect(parse('1 l cipolla', 'ita').unit).to.equal("litro");
    });
    it('of "1 cipolla intera"', () => {
      expect(parse('1 cipolla intera', 'ita').unit).to.equal(null);
    });
    it('of "1 spicchio agilio"', () => {
      expect(parse('1 spicchio  agilio', 'ita').unit).to.equal('spicchio');
    });
    it('of "1 bustina aglio"', () => {
      expect(parse('1 bustina aglio', 'ita').unit).to.equal('bustina');
    });
    it('of "1 pacco salsicce"', () => {
      expect(parse('1 pacco salsicce', 'ita').unit).to.equal('pacco');
    });
    it('"1 pizzico sale"', () => {
      expect(parse('1 pizzico sale', 'ita').unit).to.equal('pizzico');
    });
    it('"1 foglia prezzemolo"', () => {
      expect(parse('1 foglia prezzemolo', 'ita').unit).to.equal('foglia');
    });
    it('"1 mazzetto prezzemolo"', () => {
      expect(parse('1 mazzetto prezzemolo', 'ita').unit).to.equal('mazzetto');
    });
    it('"1 vasetto yogurt"', () => {
      expect(parse('1 vasetto yogurt', 'ita').unit).to.equal('vasetto');
    });
    it('"1 (14.5 oz) lattina pommodori"', () => {
      expect(parse('1 (14.5 oz) lattina pommodori', 'ita')).to.deep.equal({
        unit: 'lattina',
        quantity: '1',
        ingredient: 'pommodori (14.5 oz)',
        minQty: '1',
        maxQty: '1',
      });
    });
    it('"parses ingredient with range: 1 to 2 petto di pollo"', () => {
      expect(parse('1 to 2 petto di pollo', 'eng')).to.deep.equal({
        unit: null,
        quantity: '1-2',
        ingredient: 'petto di pollo',
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"parses ingredient with range: 1 - 2  petto di pollo"', () => {
      expect(parse('1 - 2 petto di pollo', 'eng')).to.deep.equal({
        unit: null,
        quantity: '1-2',
        ingredient: 'petto di pollo',
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"parses ingredient with range: 1-2 petto di pollo"', () => {
      expect(parse('1-2 petto di pollo', 'ita')).to.deep.equal({
        unit: null,
        quantity: '1-2',
        ingredient: 'petto di pollo',
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"1 (16 oz) scatola pasta"', () => {
      expect(parse('1 (16 oz) scatola pasta', 'ita')).to.deep.equal({
        unit: 'scatola',
        quantity: '1',
        ingredient: 'pasta (16 oz)',
        minQty: '1',
        maxQty: '1',
      });
    });
    it('"1 fetta di formaggio"', () => {
      expect(parse('1 fetta di formaggio', 'ita')).to.deep.equal({
        unit: 'fetta',
        quantity: '1',
        ingredient: 'formaggio',
        minQty: '1',
        maxQty: '1',
      });
    });
    it('"1 spicchio d\'aglio"', () => {
      expect(parse('1 spicchio d\'aglio', 'ita')).to.deep.equal({
        unit: 'spicchio',
        quantity: '1',
        ingredient: 'aglio',
        minQty: '1',
        maxQty: '1',
      });
    });
  });

  it('translates unit when no unit provided', () => {
    expect(parse('1 tortilla', 'ita')).to.deep.equal({
      unit: null,
      ingredient: 'tortilla',
      quantity: '1',
      minQty: '1',
      maxQty: '1',
    });
  });

  it('doesn\'t explode when no unit and no quantity provided', () => {
    expect(parse('zucchero a velo', 'ita')).to.deep.equal({
      unit: null,
      ingredient: 'zucchero a velo',
      quantity: null,
      minQty: null,
      maxQty: null,
    });
  });

  describe('translates the abbreviated units of', () => {
    it('"1 tazza acqua"', () => {
      expect(parse('1 tazza acqua', 'ita').unit).to.equal('tazza');
      expect(parse('2 tazzine acqua', 'ita').unit).to.equal('tazza');
      expect(parse('2 tazze acqua', 'ita').unit).to.equal('tazza');
    });
    it('"1 litro acqua"', () => {
      expect(parse('1 l acqua', 'ita').unit).to.equal('litro');
      expect(parse('1 litri acqua', 'ita').unit).to.equal('litro');
    });
    it('"1 grammo acqua"', () => {
      expect(parse('1 gr acqua', 'ita').unit).to.equal('grammo');
      expect(parse('2 g acqua', 'ita').unit).to.equal('grammo');
    });
    it('"1 chilogrammo acqua"', () => {
      expect(parse('1 kg acqua', 'ita').unit).to.equal('chilogrammo');
      expect(parse('2 KG acqua', 'ita').unit).to.equal('chilogrammo');
      expect(parse('1 kilogrammo acqua', 'ita').unit).to.equal('chilogrammo');
      expect(parse('2 Kilogrammo acqua', 'ita').unit).to.equal('chilogrammo');
    });
    it('"1 tazza acqua"', () => {
      expect(parse('1 tazza acqua', 'ita').unit).to.equal('tazza');
      expect(parse('1 tazzina acqua', 'ita').unit).to.equal('tazza');
      expect(parse('2 tazzine acqua', 'ita').unit).to.equal('tazza');
      expect(parse('2 Tazza acqua', 'ita').unit).to.equal('tazza');
    });
    it('"1 millilitro acqua"', () => {
      expect(parse('1 ml acqua', 'ita').unit).to.equal('millilitro');
      expect(parse('1 ml. acqua', 'ita').unit).to.equal('millilitro');
      expect(parse('1 millilitro acqua', 'ita').unit).to.equal('millilitro');
      expect(parse('1 Millilitro acqua', 'ita').unit).to.equal('millilitro');
    });
    it('"1 cucchiaio acqua"', () => {
      expect(parse('2 cucchiai acqua', 'ita').unit).to.equal('cucchiaio');
      expect(parse('1 Cucchiaio acqua', 'ita').unit).to.equal('cucchiaio');
      expect(parse('2 cucchiai acqua', 'ita').unit).to.equal('cucchiaio');
    });
    it('"1 cucchiaino acqua"', () => {
      expect(parse('1 Cucchiaino acqua', 'ita').unit).to.equal('cucchiaino');
      expect(parse('1 cucchiaino acqua', 'ita').unit).to.equal('cucchiaino');
      expect(parse('2 Cucchiaini acqua', 'ita').unit).to.equal('cucchiaino');
      expect(parse('2 cucchiaini acqua', 'ita').unit).to.equal('cucchiaino');
    });
    it('"1 grammo acqua"', () => {
      expect(parse('1 g acqua', 'ita').unit).to.equal('grammo');
      expect(parse('1 g. acqua', 'ita').unit).to.equal('grammo');
      expect(parse('2 grammi acqua', 'ita').unit).to.equal('grammo');
    });
    it('"1 chilogrammo acqua"', () => {
      expect(parse('1 kg acqua', 'ita').unit).to.equal('chilogrammo');
      expect(parse('1 kg. acqua', 'ita').unit).to.equal('chilogrammo');
      expect(parse('2 chilogrammi acqua', 'ita').unit).to.equal('chilogrammo');
    });
    it('"1 litro acqua"', () => {
      expect(parse('1 l acqua', 'ita').unit).to.equal('litro');
      expect(parse('1 l. acqua', 'ita').unit).to.equal('litro');
      expect(parse('2 litri acqua', 'ita').unit).to.equal('litro');
    });
    it('"1 milligrammo acqua"', () => {
      expect(parse('1 mg acqua', 'ita').unit).to.equal('milligrammo');
      expect(parse('1 mg. acqua', 'ita').unit).to.equal('milligrammo');
      expect(parse('1 milligrammo acqua', 'ita').unit).to.equal('milligrammo');
    });
    it('"1 millilitro acqua"', () => {
      expect(parse('1 ml acqua', 'ita').unit).to.equal('millilitro');
      expect(parse('1 ml. acqua', 'ita').unit).to.equal('millilitro');
      expect(parse('1 millilitro acqua', 'ita').unit).to.equal('millilitro');
    });
    it('"1 pizzico acqua"', () => {
      expect(parse('2 pizzichi sale', 'ita').unit).to.equal('pizzico');
    });
  });

  describe('translates the ingredient of', () => {
    it('"1 cucchiaio d\'acqua"', () => {
      expect(parse('1 cucchiaio d\'acqua', 'ita').ingredient).to.equal('acqua');
    });
    it('"1 spicchio d\'aglio"', () => {
      expect(parse('1 cucchiaio d\'acqua', 'ita').ingredient).to.equal('acqua');
    });
    it('"1 cucchiaio di latte"', () => {
      expect(parse('1 cucchiaio di latte', 'ita').ingredient).to.equal('latte');
    });
    it('"1 cucchiaio acqua"', () => {
      expect(parse('1 cucchiaio acqua', 'ita').ingredient).to.equal('acqua');
    });
    it('"1 cucchiaio latte"', () => {
      expect(parse('1 cucchiaio latte', 'ita').ingredient).to.equal('latte');
    });
  });
});

/////

describe('combine ingredients', () => {
  it('accepts an empty array', () => {
    expect(combine([])).to.deep.equal([]);
  });

  it('returns sorted ingredients', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'apples',
        quantity: '2',
        unit: 'pound',
        minQty: '2',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apples',
        quantity: '2',
        unit: 'pound',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      }
    ]);
  });

  it('combines two ingredient objects into one', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: '4',
        unit: 'tablespoon',
        minQty: '4',
        maxQty: '4',
      }
    ]);
  });

  it('combines three ingredient objects into one', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: '6',
        unit: 'tablespoon',
        minQty: '6',
        maxQty: '6',
      }
    ]);
  });

  it('combines four ingredient objects into two', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'apple',
        quantity: '2',
        unit: 'pound',
        minQty: '2',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apple',
        quantity: '2',
        unit: 'pound',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '6',
        unit: 'tablespoon',
        minQty: '6',
        maxQty: '6',
      }
    ]);
  });

  it('combines 2 ingredients that have a quantity range', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '3',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '1',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: '4',
        unit: 'tablespoon',
        minQty: '3',
        maxQty: '5',
      }
    ]);
  });

  it('combines 1 ingredient with no range, and 1 with a range', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '10',
        unit: 'tablespoon',
        minQty: '1',
        maxQty: '10',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'butter',
        quantity: '12',
        unit: 'tablespoon',
        minQty: '3',
        maxQty: '12',
      }
    ]);
  });

  it('combines 2 ingredient with a range, and 1 different ingredient without a range', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '10',
        unit: 'tablespoon',
        minQty: '1',
        maxQty: '10',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'apple',
        quantity: '2',
        unit: null,
        minQty: '2',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apple',
        quantity: '2',
        unit: null,
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '12',
        unit: 'tablespoon',
        minQty: '3',
        maxQty: '12',
      }
    ]);
  });

  it('does not combine if ingredients have different units (for now)', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '2',
        unit: 'tablespoon',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '1',
        unit: 'stick',
        minQty: '1',
        maxQty: '1',
      },
      {
        ingredient: 'apple',
        quantity: '2',
        unit: 'pound',
        minQty: '2',
        maxQty: '2',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'apple',
        quantity: '2',
        unit: 'pound',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        quantity: '4',
        unit: 'tablespoon',
        minQty: '4',
        maxQty: '4',
      },
      {
        ingredient: 'butter',
        quantity: '1',
        unit: 'stick',
        minQty: '1',
        maxQty: '1',
      }
    ]);
  });

  it('handles the no-unit case', () => {
    const ingredientArray = [
      {
        ingredient: 'tortilla',
        quantity: '10',
        unit: null,
        minQty: '10',
        maxQty: '10',
      },
      {
        ingredient: 'tortilla',
        quantity: '5',
        unit: null,
        minQty: '5',
        maxQty: '5',
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'tortilla',
        quantity: '15',
        unit: null,
        minQty: '15',
        maxQty: '15',
      }
    ]);
  });

  it('handles the no-unit and no-quantity case', () => {
    const ingredientArray = [
      {
        ingredient: 'Powdered Sugar',
        quantity: null,
        unit: null,
        minQty: null,
        maxQty: null,
      },
      {
        ingredient: 'Powdered Sugar',
        quantity: null,
        unit: null,
        minQty: null,
        maxQty: null,
      }
    ];
    expect(combine(ingredientArray)).to.deep.equal([
      {
        ingredient: 'Powdered Sugar',
        quantity: null,
        unit: null,
        minQty: null,
        maxQty: null,
      }
    ]);
  });
});
/*
describe('pretty printing press', () => {
  const ingredients = [{
    ingredient: 'milk',
    unit: 'cup',
    quantity: '1.5',
    minQty: '1.5',
    maxQty: '1.5',
  }, {
    ingredient: 'milk',
    unit: 'cup',
    quantity: '0.25',
    minQty: '0.25',
    maxQty: '0.25',
  }, {
    ingredient: 'milk',
    unit: 'cup',
    quantity: '1',
    minQty: '1',
    maxQty: '1',
  }, {
    ingredient: 'something',
    unit: 'box',
    quantity: '2',
    minQty: '2',
    maxQty: '2',
  }, {
    ingredient: 'milk',
    unit: 'teaspoon',
    quantity: '1.333',
    minQty: '1.333',
    maxQty: '1.333',
  }, {
    ingredient: 'milk',
    unit: 'teaspoon',
    quantity: '1.666',
    minQty: '1.666',
    maxQty: '1.666',
  }, {
    ingredient: 'milk',
    unit: 'teaspoon',
    quantity: '1.111',
    minQty: '1.111',
    maxQty: '1.111',
  }, {
    ingredient: 'milk',
    unit: 'teaspoon',
    quantity: '1.166',
    minQty: '1.166',
    maxQty: '1.166',
  }, {
    ingredient: 'milk',
    unit: 'teaspoon',
    quantity: '1.833',
    minQty: '1.1833',
    maxQty: '1.1833',
  }, {
    ingredient: 'powdered sugar',
    unit: null,
    quantity: null,
    minQty: null,
    maxQty: null,
  }, {
    ingredient: 'eggs',
    unit: null,
    quantity: '18',
    minQty: '18',
    maxQty: '18',
  }, {
    ingredient: 'large eggs',
    unit: null,
    quantity: '18',
    minQty: '18',
    maxQty: '18',
  }];
  const expectedOutcome = [
    '1 1/2 cups milk',
    '1/4 cup milk',
    '1 cup milk',
    '2 boxes something',
    '1 1/3 teaspoons milk',
    '1 2/3 teaspoons milk',
    '1 1/9 teaspoons milk',
    '1 1/6 teaspoons milk',
    '1 5/6 teaspoons milk',
    'powdered sugar',
    '18 eggs',
    '18 large eggs'
  ];
  for (let i = 0; i < ingredients.length; i++) {
    it(`returns expected outcome ${expectedOutcome[i]}`, () => {
      expect(prettyPrintingPress(ingredients[i])).to.equal(expectedOutcome[i]);
    });
  }
});*/
