const iex = require('../iex/iex.controller');

function getStockData(symbol, from = null, to = null) {
  return new Promise((resolve, reject) => {
    const dateFrom = (from !== null) ? Date.parse(from) : null;
    const dateTo = (to !== null) ? Date.parse(to) : Date.now();
    const timeFrame = (from !== null) ? getTimeFrame(dateFrom) : 'ytd';

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
        const data = {};
        data.profit = stockData[0].close - stockData[stockData.length - 1].close;
        data.earliestDate = stockData[0].date;
        data.latestDate = stockData[stockData.length - 1].date;
        data.closings = [];
        stockData.forEach((close) => {
          data.closings.push([close.close, close.date]);
        });
        resolve(data);
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
