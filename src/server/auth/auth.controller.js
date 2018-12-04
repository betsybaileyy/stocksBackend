const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/database.controller');
const UserModel = require('./user.model');

function comparePassword(password, hashedPass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPass, (error, isMatch) => {
      if (error) {
        reject(error);
      } else {
        resolve(isMatch);
      }
    });
  });
}

// TODO: create route for shortened user info vs full user info.
function getUser(token, short = true) {
  return new Promise((resolve, reject) => {
    if (token !== undefined && token !== '') {
      const decodedToken = jwt.decode(token);
      db.getOnePop(UserModel, decodedToken._id, 'investments')
        .then((resp) => {
          if (short) {
            resolve({
              _id: resp._id,
              email: resp.email,
              investments: resp.investments
            });
          } else {
            resolve(resp);
          }
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      resolve(null);
    }
  });
}

function login(email, password) {
  return new Promise((resolve, reject) => {
    UserModel.findOne(
      {
        email
      },
      (error, user) => {
        if (error) {
          reject(error);
        } else if (!user) {
          reject('incorrect');
        } else {
          comparePassword(password, user.password)
            .then((match) => {
              if (match) {
                resolve(user);
              } else {
                reject('incorrect');
              }
            })
            .catch((err) => {
              reject(err);
            });
        }
      }
    );
  });
}

function signup(userData) {
  return new Promise((resolve, reject) => {
    const newUser = new UserModel(userData);
    db.save(newUser)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  comparePassword,
  getUser,
  login,
  signup
};
