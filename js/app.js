// Перевірка підключення скрипта
console.log('app.js успішно підключено');

// Дані
const wishes = [
    { title: "Машина", price: 18000, priority: "високий" },
    { title: "Яхта", price: 38000, priority: "середній" },
    { title: "Ноутбук", price: 500, priority: "низький" }
];

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

console.log(`${calculateTotalSum(wishes)}`);
resultByPriority(wishes);
console.log('Чи вистачає бюджету 3000$:', withinBudget(calculateTotalSum(wishes), 3000));
console.log('Чи вистачає бюджету 60000$:', withinBudget(calculateTotalSum(wishes), 60000));
