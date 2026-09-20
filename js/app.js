// // Перевірка підключення скрипта
// console.log('app.js успішно підключено');

// // Дані
// const wishes = [
//     { title: "Машина", price: 18000, priority: "високий" },
//     { title: "Яхта", price: 38000, priority: "середній" },
//     { title: "Ноутбук", price: 500, priority: "низький" }
// ];

// // Вибір контейнера для списку бажань
// const listContainer = document.querySelector('#wishlist');
// const totalPriceElement = document.querySelector('#total-price');

// // зміні для форми
// const wishForm = document.querySelector('#wish-list');
// const titleInput = document.querySelector('#wish-title');
// const priceInput = document.querySelector('#wish-price');
// const prioritySelect = document.querySelector('#wish-priority');

// // json файл API (https://jsonplaceholder.typicode.com/todos?userId=2)
// const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=2"

// // Видалення елемента
// const staticCard = document.querySelector('#wishlist article');
// if (staticCard) {
//     staticCard.remove();
// }

// function renderWishes(data) {
//     listContainer.innerHTML = '';

//     data.forEach((wish, index) => {
//         const card = document.createElement('article');

//         card.dataset.index = index;
//         card.dataset.priority = wish.priority;

//         updateCardPriorityClass(card, wish.priority);

//         const title = document.createElement('h3');
//         title.textContent = wish.title;

//         const price = document.createElement('p');
//         price.textContent = `${wish.price} $`;

//         const prioritySelectInCard = document.createElement('select');
//         prioritySelectInCard.className = 'priority-change';
//         prioritySelectInCard.innerHTML = `
//             <option value="високий" ${wish.priority === 'високий' ? 'selected' : ''}>Високий</option>
//             <option value="середній" ${wish.priority === 'середній' ? 'selected' : ''}>Середній</option>
//             <option value="низький" ${wish.priority === 'низький' ? 'selected' : ''}>Низький</option>
//         `;

//         card.append(title, price, prioritySelectInCard);
//         listContainer.append(card);
//     });

//     const totalSum = calculateTotalSum(data);
//     totalPriceElement.textContent = `${totalSum} $`;
// }
// // Виклики функції рендеру
// renderWishes(wishes);

// // Обчислення загальної вартості
// function calculateTotalSum(data) {
//     let sum = 0;
//     for (const i of data) {
//         sum += i.price;
//     }
//     return sum;
// }

// // Усі бажання з високим пріоритетом
// function resultByPriority(data) {
//     for (const i of data) {
//         if (i.priority === "високий") {
//             console.log(`високий пріоритет: ${i.title} - ${i.price}$`);
//         }
//     }
// }

// // Стрілкова функція перевірки бюджету
// const withinBudget = (price, budget) => price <= budget;

// // Валідація на подію input
// priceInput.addEventListener('input', () => {
//     if (priceInput.value !== '' && Number(priceInput.value) < 0) {
//         priceInput.setCustomValidity('Ціна не може бути від\'ємною!');
//     } else {
//         priceInput.setCustomValidity('');
//     }
// });

// // Подія submit
// wishForm.addEventListener('submit', event => {
//     event.preventDefault();

//     const newWish = {
//         title: titleInput.value.trim(),
//         price: Number(priceInput.value),
//         priority: prioritySelect.value
//     };

//     wishes.push(newWish);
//     renderWishes(wishes);
//     wishForm.reset();
// });

// // Задання пріоритету
// listContainer.addEventListener('change', event => {
//     if (event.target.classList.contains('priority-change')) {
//         const card = event.target.closest('article');
//         const newPriority = event.target.value;
//         const index = card.dataset.index;

//         wishes[index].priority = newPriority;
//         card.dataset.priority = newPriority;
//         updateCardPriorityClass(card, newPriority);
//     }
// });

// // функція зміни пріоритету
// function updateCardPriorityClass(card, priority) {
//     card.classList.remove('priority-high', 'priority-medium', 'priority-low');
//     if (priority === 'високий') {
//         card.classList.add('priority-high');
//     } else if (priority === 'середній') {
//         card.classList.add('priority-medium');
//     } else {
//         card.classList.add('priority-low');
//     }
// }

// // Отримуємо елементи для відображення статусу та помилок
// const statusMessage = document.querySelector('#status-message');
// const refreshBtn = document.querySelector('#btn-refresh');

// // Функція відображення стану завантаження
// function showLoading(isLoading) {
//     if (isLoading) {
//         statusMessage.textContent = 'Завантаження даних...';
//         if (refreshBtn) {
//             refreshBtn.disabled = true; // Блокуємо кнопку під час запиту
//         }
//     } else {
//         if (refreshBtn) {
//             refreshBtn.disabled = false; // Розблоковуємо після завершення
//         }
//     }
// }

// // Функція відображення помилки
// function showError(message) {
//     statusMessage.textContent = message;
//     statusMessage.style.color = 'red';
// }

// // Асинхронна функція завантаження даних
// async function loadData() {
//     showLoading(true);
//     try {
//         const response = await fetch(API_URL);

//         if (!response.ok) {
//             throw new Error(`Сервер відповів кодом ${response.status}`);
//         }

//         const data = await response.json();

//         const formattedWishes = data.map((item, index) => ({
//             title: item.title,
//             price: (index + 1) * 100, // Генеруємо умовну ціну
//             priority: item.completed ? 'низький' : 'високий' // пріоритет(демонстрація)
//         }));

//         wishes.length = 0;
//         wishes.push(...formattedWishes);
//         statusMessage.textContent = '';

//         renderWishes(wishes);

//     } catch (error) {
//         showError('Не вдалося завантажити дані. Перевірте з’єднання та спробуйте пізніше.');
//         console.error('Деталі помилки для розробника:', error);
//     } finally {
//         showLoading(false);
//     }
// }

// // Оновити для кнопкиі
// if (refreshBtn) {
//     refreshBtn.addEventListener('click', loadData);
// }

// loadData();

// console.log(`${calculateTotalSum(wishes)}`);
// resultByPriority(wishes);
// console.log('Чи вистачає бюджету 3000$:', withinBudget(calculateTotalSum(wishes), 3000));
// console.log('Чи вистачає бюджету 60000$:', withinBudget(calculateTotalSum(wishes), 60000));



// Обрано React за його декларативний підхід, зручну роботу зі станом через hooks (useState) та відсутність потреби вручну маніпулювати DOM-вузлами.
// json файл API (https://jsonplaceholder.typicode.com/todos?userId=2)
const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=2"

// Дочірній компонент елемента
// Props: id, name, price, priority, isPurchased, onToggle, onChangePriority
function WishItem({ id, name, price, priority, isPurchased, onToggle, onChangePriority }) {
    let priorityClass = 'priority-medium';
    if (priority === 'високий') {
        priorityClass = 'priority-high';
    }
    if (priority === 'низький') {
        priorityClass = 'priority-low';
    }

    return (
        <article className={`card ${priorityClass} ${isPurchased ? 'bought' : ''}`}>
            <h3>{name}</h3>
            <p>{price} $</p>

            <label htmlFor="wish-priority">Пріоритет:</label>
                <select 
                    id="wish-priority" 
                    value={priority} 
                    onChange={(e) => onChangePriority(id, e.target.value)}
                >
                <option value="високий">Високий</option>
                <option value="середній">Середній</option>
                <option value="низький">Низький</option>
            </select>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '10px' }}>
                <input 
                    type="checkbox" 
                    checked={isPurchased} 
                    onChange={() => onToggle(id)} 
                />
                <span>{isPurchased ? 'Придбано' : 'Ще не придбано'}</span>
            </label>
        </article>
    );
}


function WishlistApp() {
    const [wishes, setWishes] = React.useState([
        { id: 1, title: "Машина", price: 18000, priority: "високий", purchased: false },
        { id: 2, title: "Яхта", price: 38000, priority: "середній", purchased: false },
        { id: 3, title: "Ноутбук", price: 500, priority: "низький", purchased: true }
    ]);

    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [priority, setPriority] = React.useState('середній');

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    function toggleWish(id) {
        setWishes(wishes.map(item => 
            item.id === id ? { ...item, purchased: !item.purchased } : item
        ));
    }

    function changePriority(id, newPriority) {
        setWishes(wishes.map(item => 
            item.id === id ? { ...item, priority: newPriority } : item
        ));
    }

    async function loadData() {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Сервер відповів кодом ${response.status}`);
            }
            const data = await response.json();

            const formattedWishes = data.map((item, index) => ({
                id: item.id,
                title: item.title,
                price: (index + 1) * 100,
                priority: item.completed ? 'низький' : 'високий',
                purchased: item.completed
            }));

            setWishes(formattedWishes);
        } catch (err) {
            setError('Не вдалося завантажити дані з сервера.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleAddWish(e) {
        // Валідація на подію input
        e.preventDefault();
        if (!title.trim() || price === '' || Number(price) < 0) {
            alert("Будь ласка, заповніть усі поля коректно!");
            return;
        }

        const newWish = {
            id: Date.now(),
            title: title.trim(),
            price: Number(price),
            priority: priority,
            purchased: false
        };

        setWishes([...wishes, newWish]);

        // Очищення полів
        setTitle('');
        setPrice('');
        setPriority('середній');
    }

    function totalSum(data) {
        let result = 0;
        for (const i of data) {
            result += i.price;
        }
        return result;
    }

    const totalPrice = totalSum(wishes);

    return (
        <div>
            <header>
                <h1>Список бажань</h1>
                <nav>
                    <a href="#add-wishes">Додати бажання</a>
                    <a href="#list-wishes">Мої бажання</a>
                </nav>
            </header>

            <div className="layout">
                <main>
                    {/* <!-- форма додавання нового бажання --> */}
                    <section id="add-wishes">
                        <h2>Додати бажання</h2>
                        <form onSubmit={handleAddWish}>
                            <div>
                                <label htmlFor="wish-title">Назва бажання:</label>
                                <input 
                                    type="text" 
                                    id="wish-title" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    placeholder="Наприклад: Ноутбук" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="wish-price">Ціна ($):</label>
                                <input 
                                    type="number" 
                                    id="wish-price" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)} 
                                    placeholder="1000" 
                                    min="0" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="wish-priority">Пріоритет:</label>
                                <select 
                                    id="wish-priority" 
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="високий">Високий</option>
                                    <option value="середній">Середній</option>
                                    <option value="низький">Низький</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-add">Додати у список</button>
                        </form>
                    </section>

                    {/* <!-- список бажаних речей (картки з ціною й пріоритетом) --> */}
                    <section id="list-wishes">
                        <h2>Мої бажання</h2>
                        <div id="load">
                            {loading && <p>Завантаження даних...</p>}
                            {error && <p>{error}</p>}
                            <button 
                                type="button" 
                                className="btn-add btn-refresh" 
                                onClick={loadData} 
                                disabled={loading}
                            >
                                Оновити дані з сервера
                            </button>
                        </div>

                        {/* Рендер циклом із мапінгом */}
                        <div className="cards" id="wishlist">
                            {wishes.map(wish => (
                                <WishItem 
                                    key={wish.id}
                                    id={wish.id}
                                    name={wish.title}
                                    price={wish.price}
                                    priority={wish.priority}
                                    isPurchased={wish.purchased}
                                    onToggle={toggleWish}
                                    onChangePriority={changePriority}
                                />
                            ))}
                        </div>
                    </section>
                </main>

                {/* <!-- блок підсумкової суми --> */}
                <aside id="result">
                    <h2>Підсумкова сума</h2>
                    <img src="assets/img/genie-lamp.png" alt="Лампа джина" />
                    <p>Загальна вартість:</p>
                    <p id="total-price">{totalPrice} $</p>
                </aside>
            </div>

            <footer>
                <p>Дані підготовлені Рибачиком Вячеславом</p>
            </footer>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WishlistApp />);
