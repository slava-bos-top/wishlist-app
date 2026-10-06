const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Дозволяє CORS-запити при локальній розробці
app.use(express.json()); // Розбір JSON у тілі запитів

// Крок 7: Роздача статичних файлів фронтенду з папки 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Завантаження даних з data.json
const dataPath = path.join(__dirname, 'data.json');
let wishes = [];

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    wishes = JSON.parse(rawData);
} catch (err) {
    console.error('Помилка зчитування data.json:', err);
}

// Крок 5: GET /api/wishes — отримання всього списку бажань
app.get('/api/wishes', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(wishes);
});

// Крок 6: GET /api/wishes/:id — отримання конкретного бажання або 404
app.get('/api/wishes/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const wishId = Number(req.params.id);
    const wish = wishes.find((w) => w.id === wishId);

    // Крок 10: Обробка неіснуючого id
    if (!wish) {
        return res.status(404).json({ error: 'Бажання з таким ID не знайдено' });
    }

    res.status(200).json(wish);
});

// Обробка неіснуючих API ендпоінтів
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Маршрут API не знайдено' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});