const wishes = require('../../server/data.json');

module.exports = (req, res) => {
  const wish = wishes.find((w) => String(w.id) === String(req.query.id));
  if (!wish) {
    return res.status(404).json({ error: 'Бажання з таким ID не знайдено' });
  }
  res.status(200).json(wish);
};