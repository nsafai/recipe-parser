# recipe-ingredient-parser-v3

Natural language parser for recipes and lists of ingredients. Can parse a string into an object and also combine an array of these ingredient objects.

## About

This project was built on top of code written by [nsafai](https://github.com/nsafai/recipe-parser).

What's different from the original?

- added support for the Italian language.
- added support for numbers written in words (for example `six cups milk`)
- added support for preposition before name of ingredient (for example `six cups of milk` or `sei tazze di latte`)

## To install

`npm install recipe-ingredient-parser-v3` or `yarn add recipe-ingredient-parser-v3`

## To use

`import { parse } from 'recipe-ingredient-parser-v3';`

And then use on a string, for example:
`parse('1 teaspoon basil', 'eng');`
or 
`parse('1 grammo di zucchero', 'ita');`


Will return an object:

```
{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 1,
  maxQty: 1
};
```

### Combine ingredient objects

```
combine([{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 1,
  maxQty: 2,
},
{
  quantity: 2,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 2,
  maxQty: 2
}]);
```

Will return

```
[{
  quantity: 3,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 3,
  maxQty: 4
}]
```

### Languages supported

Languages currently supported:

- English `eng`
- Italian `ita`

### Unicode Fractions

Will also correctly parse unicode fractions into the proper amount

### Development

Clone the repo and `yarn` to install packages. If `yarn test` comes back good after your code changes, give yourself a pat on the back.

## Natural Language Parsing

This project uses Natural, for more information, see https://dzone.com/articles/using-natural-nlp-module

### Publishing

Checkout https://docs.npmjs.com/getting-started/publishing-npm-packages for more info
