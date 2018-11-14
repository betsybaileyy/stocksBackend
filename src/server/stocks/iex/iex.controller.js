const request = require('request');

const iexRoute = 'https://api.iextrading.com/1.0';

function getSymbols() {
  return new Promise((resolve, reject) => {
    request(`${iexRoute}/ref-data/symbols`, { json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

function getStock(symbols) {
  return new Promise((resolve, reject) => {
    request(`${iexRoute}/tops?symbols=${symbols.join(',')}`, { json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

function getStockHistory(symbol, timeFrame = 'ytd') {
  return new Promise((resolve, reject) => {
    request(`${iexRoute}/stock/${symbol}/chart/${timeFrame}`, { json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

module.exports = {
  getSymbols,
  getStock,
  getStockHistory
};
