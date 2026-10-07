module.exports = (req, res) => {
  res.status(404).json({ error: 'Маршрут API не знайдено' });
};