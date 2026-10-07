const wishes = require('../../server/data.json');

module.exports = (req, res) => {
  res.status(200).json(wishes);
};