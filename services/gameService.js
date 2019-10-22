const { Game } = require('../models');
const { getData } = require('./gameData');

const update = (params) => {
  const { id, data } = params;
  const updateData = Object.assign({}, data, {
    updatedAt: new Date()
  })

  return Game
  .findOneAndUpdate({
    _id: id}, 
    {$set: updateData}, 
    {new: true}, 
    (err, game) => {
    if (err) {
      return err;
    }
    return game;
  })
}

const returnUpdated = async (params) => {
  const { id, feed } = params;
  try {
    const newData = await getData(feed);
    return await update({id, data: newData});
  } catch (err) {
    return err;
  }
}

module.exports = {
  update,
  returnUpdated
}