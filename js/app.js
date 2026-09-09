// Перевірка підключення скрипта
console.log('app.js успішно підключено');

// Дані
const wishes = [
    { title: "Машина", price: 18000, priority: "високий" },
    { title: "Яхта", price: 38000, priority: "середній" },
    { title: "Ноутбук", price: 500, priority: "низький" }
];

// Видалення статичного прикладного елемента
const staticCard = document.querySelector('#wishlist article');
if (staticCard) {
    staticCard.remove();
}

// Вибір контейнера для списку бажань
const listContainer = document.querySelector('#wishlist');

function renderWishes(data) {
    // Очищення контейнера перед малюванням
    listContainer.innerHTML = '';

    data.forEach(wish => {
        // Створення елемента article для картки
        const card = document.createElement('article');

        // Встановлення атрибута data-priority
        card.dataset.priority = wish.priority;

        // Додавання класу за умовою
        if (wish.priority === 'високий') {
            card.classList.add('priority-high');
        } else if (wish.priority === 'середній') {
            card.classList.add('priority-medium');
        } else {
            card.classList.add('priority-low');
        }

        // Створення заголовка h3
        const title = document.createElement('h3');
        title.textContent = wish.title;

        // Створення абзацу p з ціною
        const price = document.createElement('p');
        price.textContent = `${wish.price} $`;

        // Вкладення елементів у картку
        card.append(title, price);

        // Додавання готової картки в контейнер
        listContainer.append(card);
    });
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

// Оновлення текстового вмісту в елементі p#total-price
const totalPriceElement = document.querySelector('#total-price');
if (totalPriceElement) {
    const totalSum = calculateTotalSum(wishes);
    totalPriceElement.textContent = `${totalSum} $`;
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

console.log(`${calculateTotalSum(wishes)}`);
resultByPriority(wishes);
console.log('Чи вистачає бюджету 3000$:', withinBudget(calculateTotalSum(wishes), 3000));
console.log('Чи вистачає бюджету 60000$:', withinBudget(calculateTotalSum(wishes), 60000));
