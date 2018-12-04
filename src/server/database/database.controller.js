function getOne(model, id) {
  return new Promise((resolve, reject) => {
    model.findById(id, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function getOnePop(model, id, populate) {
  return new Promise((resolve, reject) => {
    model
      .findById(id)
      .populate(populate)
      .exec((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
}

function getAll(model, search = {}) {
  return new Promise((resolve, reject) => {
    const query = search;
    model.find(query, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function save(newModel) {
  return new Promise((resolve, reject) => {
    const model = newModel;
    const now = new Date();
    model.updatedAt = now;
    if (!model.createdAt) {
      model.createdAt = now;
    }

    model.save((error) => {
      if (error) {
        reject(error);
      } else {
        resolve(model);
      }
    });
  });
}

function update(model, object) {
  return new Promise((resolve, reject) => {
    model.update(
      {
        _id: object._id
      },
      object,
      (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      }
    );
  });
}

function del(model, id) {
  return new Promise((resolve, reject) => {
    model.deleteOne(
      {
        _id: id
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

module.exports = {
  getOne,
  getOnePop,
  getAll,
  save,
  update,
  del
};
