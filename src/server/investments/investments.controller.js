const Investment = require('./investment.model');
const UserModel = require('../auth/user.model');

const db = require('../database/database.controller');

function newInvestment(user, body) {
  return new Promise((resolve, reject) => {
    if (user) {
      const investment = new Investment(body);
      investment.investor = user._id;
      // TODO: save investment to user model.
      db.save(investment)
        .then((model) => {
          user.investments.push(model._id);
          db.update(UserModel, user)
            .then(() => {
              resolve(model);
            })
            .catch((userErr) => {
              reject(userErr);
            });
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject('Invalid User.');
    }
  });
}

function getInvestment(id) {
  return new Promise((resolve, reject) => {
    db.getOnePop(Investment, id, 'investor').then((resp) => {
      resolve(resp);
    }).catch((dbErr) => {
      reject(dbErr);
    });
  });
}

module.exports = {
  newInvestment,
  getInvestment
};
