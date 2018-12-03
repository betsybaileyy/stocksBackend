const Investment = require('./investment.model');

const db = require('../database/database.controller');

function newInvestment(user, body) {
  return new Promise((resolve, reject) => {
    if (user) {
      const investment = new Investment(body);
      investment.investor = user._id;
      // TODO: save investment to user model.
      db.save(investment)
        .then((model) => {
          resolve(model);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject('No user provided.');
    }
  });
}

module.exports = {
  newInvestment
};
