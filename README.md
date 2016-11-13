# indicadoresdeldia

[![npm version](https://img.shields.io/npm/v/indicadoresdeldia.svg?style=flat-square)](https://www.npmjs.com/package/indicadoresdeldia)
[![npm downloads](https://img.shields.io/npm/dm/indicadoresdeldia.svg?style=flat-square)](https://www.npmjs.com/package/indicadoresdeldia)
[![Build Status](https://img.shields.io/travis/lgaticaq/indicadoresdeldia.svg?style=flat-square)](https://travis-ci.org/lgaticaq/indicadoresdeldia)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/indicadoresdeldia/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/indicadoresdeldia?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/lgaticaq/indicadoresdeldia.svg?style=flat-square)](https://codeclimate.com/github/lgaticaq/indicadoresdeldia)
[![dependency Status](https://img.shields.io/david/lgaticaq/indicadoresdeldia.svg?style=flat-square)](https://david-dm.org/lgaticaq/indicadoresdeldia#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/indicadoresdeldia.svg?style=flat-square)](https://david-dm.org/lgaticaq/indicadoresdeldia#info=devDependencies)

> Obtener indicadores del dia desde indicadoresdeldia.cl

## Instalación

```bash
npm i -S indicadoresdeldia
```

## Uso

[Try on Tonic](https://tonicdev.com/npm/indicadoresdeldia)
```js
const indicador = require('indicadoresdeldia');

indicador().then(console.log).catch(console.error);
/*
{
  date: '2016-11-13T15:30:01.000Z',
  holy: {yesterday: 'Cristian', today: 'Diego', tomorrow: 'Humberto'},
  indicator: {uf: 26283.75, utm: 46091, imacec: 1.4, ipc: 0.2},
  restriction: {
    normal: {today: ['no aplica'], tomorrow: ['no aplica']},
    catalitic: ['no aplica']
  }
}
*/
```

## Licencia

[MIT](https://tldrlegal.com/license/mit-license)
