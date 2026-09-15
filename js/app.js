// Перевірка підключення скрипта
console.log('app.js успішно підключено');

// Дані
const wishes = [
    { title: "Машина", price: 18000, priority: "високий" },
    { title: "Яхта", price: 38000, priority: "середній" },
    { title: "Ноутбук", price: 500, priority: "низький" }
];

// Вибір контейнера для списку бажань
const listContainer = document.querySelector('#wishlist');
const totalPriceElement = document.querySelector('#total-price');

// зміні для форми
const wishForm = document.querySelector('#wish-list');
const titleInput = document.querySelector('#wish-title');
const priceInput = document.querySelector('#wish-price');
const prioritySelect = document.querySelector('#wish-priority');

// json файл API (https://jsonplaceholder.typicode.com/todos?userId=2)
const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=2"

// Видалення елемента
const staticCard = document.querySelector('#wishlist article');
if (staticCard) {
    staticCard.remove();
}

function renderWishes(data) {
    listContainer.innerHTML = '';

    data.forEach((wish, index) => {
        const card = document.createElement('article');

        card.dataset.index = index;
        card.dataset.priority = wish.priority;

        updateCardPriorityClass(card, wish.priority);

        const title = document.createElement('h3');
        title.textContent = wish.title;

        const price = document.createElement('p');
        price.textContent = `${wish.price} $`;

        const prioritySelectInCard = document.createElement('select');
        prioritySelectInCard.className = 'priority-change';
        prioritySelectInCard.innerHTML = `
            <option value="високий" ${wish.priority === 'високий' ? 'selected' : ''}>Високий</option>
            <option value="середній" ${wish.priority === 'середній' ? 'selected' : ''}>Середній</option>
            <option value="низький" ${wish.priority === 'низький' ? 'selected' : ''}>Низький</option>
        `;

        card.append(title, price, prioritySelectInCard);
        listContainer.append(card);
    });

    const totalSum = calculateTotalSum(data);
    totalPriceElement.textContent = `${totalSum} $`;
}
// Виклики функції рендеру
renderWishes(wishes);

// Обчислення загальної вартості
function calculateTotalSum(data) {
    let sum = 0;
    for (const i of data) {
        sum += i.price;
    }
    return sum;
}

// Усі бажання з високим пріоритетом
function resultByPriority(data) {
    for (const i of data) {
        if (i.priority === "високий") {
            console.log(`високий пріоритет: ${i.title} - ${i.price}$`);
        }
    }
}

// Стрілкова функція перевірки бюджету
const withinBudget = (price, budget) => price <= budget;

// Валідація на подію input
priceInput.addEventListener('input', () => {
    if (priceInput.value !== '' && Number(priceInput.value) < 0) {
        priceInput.setCustomValidity('Ціна не може бути від\'ємною!');
    } else {
        priceInput.setCustomValidity('');
    }
});

// Подія submit
wishForm.addEventListener('submit', event => {
    event.preventDefault();

    const newWish = {
        title: titleInput.value.trim(),
        price: Number(priceInput.value),
        priority: prioritySelect.value
    };

    wishes.push(newWish);
    renderWishes(wishes);
    wishForm.reset();
});

// Задання пріоритету
listContainer.addEventListener('change', event => {
    if (event.target.classList.contains('priority-change')) {
        const card = event.target.closest('article');
        const newPriority = event.target.value;
        const index = card.dataset.index;

        wishes[index].priority = newPriority;
        card.dataset.priority = newPriority;
        updateCardPriorityClass(card, newPriority);
    }
});

// функція зміни пріоритету
function updateCardPriorityClass(card, priority) {
    card.classList.remove('priority-high', 'priority-medium', 'priority-low');
    if (priority === 'високий') {
        card.classList.add('priority-high');
    } else if (priority === 'середній') {
        card.classList.add('priority-medium');
    } else {
        card.classList.add('priority-low');
    }
}

// Отримуємо елементи для відображення статусу та помилок
const statusMessage = document.querySelector('#status-message');
const refreshBtn = document.querySelector('#btn-refresh');

// Функція відображення стану завантаження
function showLoading(isLoading) {
    if (isLoading) {
        statusMessage.textContent = 'Завантаження даних...';
        if (refreshBtn) {
            refreshBtn.disabled = true; // Блокуємо кнопку під час запиту
        }
    } else {
        if (refreshBtn) {
            refreshBtn.disabled = false; // Розблоковуємо після завершення
        }
    }
}

// Функція відображення помилки
function showError(message) {
    statusMessage.textContent = message;
    statusMessage.style.color = 'red';
}

// Асинхронна функція завантаження даних
async function loadData() {
    showLoading(true);
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Сервер відповів кодом ${response.status}`);
        }

        const data = await response.json();

        const formattedWishes = data.map((item, index) => ({
            title: item.title,
            price: (index + 1) * 100, // Генеруємо умовну ціну
            priority: item.completed ? 'низький' : 'високий' // пріоритет(демонстрація)
        }));

        wishes.length = 0;
        wishes.push(...formattedWishes);
        statusMessage.textContent = '';

        renderWishes(wishes);

    } catch (error) {
        showError('Не вдалося завантажити дані. Перевірте з’єднання та спробуйте пізніше.');
        console.error('Деталі помилки для розробника:', error);
    } finally {
        showLoading(false);
    }
}

// Оновити для кнопкиі
if (refreshBtn) {
    refreshBtn.addEventListener('click', loadData);
}

loadData();

console.log(`${calculateTotalSum(wishes)}`);
resultByPriority(wishes);
console.log('Чи вистачає бюджету 3000$:', withinBudget(calculateTotalSum(wishes), 3000));
console.log('Чи вистачає бюджету 60000$:', withinBudget(calculateTotalSum(wishes), 60000));
