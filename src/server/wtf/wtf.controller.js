const MenuModel = require('../models/menu');
const UserModel = require('../models/user');
const auth = require('../auth/auth.controller');
const db = require('../database/database.controller');

function saveMenu(token, newMenu) {
  return new Promise((resolve, reject) => {
    auth
      .getUser(token)
      .then((user) => {
        const menu = newMenu;
        let menuModel = null;

        menu.createdBy.email = user.email;
        menu.createdBy._id = user._id;

        try {
          menuModel = new MenuModel(menu);
          UserModel.findById(user._id, (err, userModel) => {
            if (err) {
              reject(err);
            } else {
              userModel.menus.unshift(menuModel);
              db.save(menuModel)
                .then(() => {
                  userModel.save((saveErr) => {
                    if (saveErr) {
                      reject(saveErr);
                    } else {
                      resolve();
                    }
                  });
                })
                .catch((error) => {
                  reject(error);
                });
            }
          });
        } catch (error) {
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  saveMenu
};
