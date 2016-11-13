'use strict';

const http = require('http');

const parseAmount = data => {
  return parseFloat(data.replace(/[\$\.]/g, '').replace(',', '.'));
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    const uri = 'http://indicadoresdeldia.cl/webservice/indicadores.json';
    http.get(uri, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
      } else {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const data = JSON.parse(body);
          const result = {
            date: new Date(
              data.date.replace(
                /\d{4}-d{2}-d{2} d{2}:d{2}:d{2}/, '$1-$2-$3T$4:$5:$6-03:00')).toISOString(),
            holy: {
              yesterday: data.santoral.ayer,
              today: data.santoral.hoy,
              tomorrow: data.santoral.maniana
            },
            indicator: {
              uf: parseAmount(data.indicador.uf),
              utm: parseAmount(data.indicador.utm),
              imacec: parseAmount(data.indicador.imacec),
              ipc: parseFloat(data.indicador.ipc)
            },
            restriction: {
              normal: {
                today: data.restriccion.normal,
                tomorrow: data.restriccion.normal_maniana
              },
              catalitic: data.restriccion.catalitico
            }
          };
          resolve(result);
        });
      }
    }).on('error', err => reject(err));
  });
};
