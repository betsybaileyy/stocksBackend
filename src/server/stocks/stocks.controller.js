const iex = require('../iex/iex.controller');

function getStockData(symbol, from = 0, to = 0) {
  return new Promise((resolve, reject) => {
    let dateFrom = null;
    let dateTo = null;
    let timeFrame = null;
    if (from !== 0 || to !== 0) {
      dateFrom = Date.parse(from);
      dateTo = Date.parse(to);
      timeFrame = getTimeFrame(dateFrom);
    } else {
      timeFrame = 'ytd';
    }

    iex
      .getStockHistory(symbol, timeFrame)
      .then((resp) => {
        const stocks = [];
        resp.forEach((data) => {
          const stockDate = Date.parse(data.date);
          if (timeFrame !== 'ytd') {
            if (stockDate >= dateFrom && stockDate <= dateTo) {
              stocks.push(data);
            }
          } else {
            stocks.push(data);
          }
        });
        resolve(stocks);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getStockRate(symbol, from, to) {
  return new Promise((resolve, reject) => {
    getStockData(symbol, from, to)
      .then((stockData) => {
        const rate = stockData[0].close - stockData[stockData.length - 1].close;
        resolve(rate);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// helpers

function getTimeFrame(from) {
  const timeCode = Date.now() - from;

  if (timeCode <= 86400000) {
    return '1d';
  } else if (timeCode > 86400000 && timeCode <= 2678400000) {
    return '1m';
  } else if (timeCode > 2678400000 && timeCode <= 7948800000) {
    return '3m';
  } else if (timeCode > 7948800000 && timeCode <= 15897600000) {
    return '6m';
  } else if (timeCode > 15897600000 && timeCode <= 31536000000) {
    return '1y';
  } else if (timeCode > 31536000000 && timeCode <= 63072000000) {
    return '2y';
  } else if (timeCode > 63072000000 && timeCode <= 157766400000) {
    return '5y';
  }

  return 'ytd';
}

module.exports = {
  getStockData,
  getStockRate
};
