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

// Допоміжні функції для localStorage
function saveToLocalStorage(items) {
  try {
    localStorage.setItem('wishes', JSON.stringify(items));
  } catch (e) {
    console.error('Помилка запису в localStorage:', e);
  }
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem('wishes');
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Пошкоджені дані в localStorage:', error);
    return [];
  }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AppDB', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('wishes')) {
                db.createObjectStore('wishes', { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getAllItems() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('wishes', 'readonly');
        const request = tx.objectStore('wishes').getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Видалення елемента за id (потрібно за варіантом)
async function deleteItem(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('wishes', 'readwrite');
        tx.objectStore('wishes').delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function clearDB() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('wishes', 'readwrite');
        tx.objectStore('wishes').clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// Пакетне збереження масиву елементів в одній транзакції
async function putItemsBulk(items) {
    if (!items.length) return;
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('wishes', 'readwrite');
        const store = tx.objectStore('wishes');
        for (const item of items) {
        store.put(item);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// Оновлена putItem використовує пакетне збереження
async function putItem(item) {
    return putItemsBulk([item]);
}

async function migrateFromLocalStorageIfNeeded() {
    const isMigrated = localStorage.getItem('wishlist_migrated');
    if (isMigrated) return;

    try {
        const dbItems = await getAllItems();
        const localItems = loadFromLocalStorage();

        if (dbItems.length === 0 && localItems.length > 0) {
        await putItemsBulk(localItems); // Запис усіх елементів в одній транзакції
        console.log('Дані успішно мігровано з localStorage до IndexedDB');
        }

        localStorage.setItem('wishlist_migrated', 'true');
    } catch (err) {
        console.error('Помилка під час міграції даних:', err);
    }
}

// Дочірній компонент елемента
// Props: id, name, price, priority, isPurchased, onToggle, onChangePriority
function WishItem({ id, name, price, savedAmount, priority, isPurchased, onToggle, onChangePriority, onChangeSavedAmount, onDelete }) {
    let priorityClass = 'priority-medium';
    if (priority === 'високий') {
        priorityClass = 'priority-high';
    }
    if (priority === 'низький') {
        priorityClass = 'priority-low';
    }

    // Розрахунок відсотка для transition-анімації
    const currentSaved = savedAmount || 0;
    const progressPercent = price > 0 ? Math.min(100, Math.round((currentSaved / price) * 100)) : 0;

    return (
        <article className={`card ${priorityClass} ${isPurchased ? 'bought' : ''}`}>
            <h3>{name}</h3>
            <p>{price} $</p>

            {/* Блок анімованого прогрес-бару */}
            <div className="progress-container">
                <div className="progress-label">
                    <span>Накопичено: {currentSaved} $</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className="progress-bar">
                    <div 
                        className={`progress-bar__fill ${progressPercent >= 100 ? 'badge--completed' : ''}`} 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Введення внесеної суми */}
            <div style={{ marginTop: '10px' }}>
                <label htmlFor={`saved-${id}`}>Внести накопичення ($):</label>
                <input 
                    type="number" 
                    id={`saved-${id}`}
                    value={currentSaved} 
                    min="0"
                    max={price}
                    onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        onChangeSavedAmount(id, isNaN(val) ? 0 : val);
                    }}
                    style={{ width: '100%', padding: '5px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

            <label htmlFor={`wish-priority-${id}`} style={{ marginTop: '10px', display: 'block' }}>Пріоритет:</label>
            <select 
                id={`wish-priority-${id}`} 
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
            <div className="btn-card">
                <button 
                    type="button" 
                    onClick={() => onDelete(id)} 
                    className="btn-delete"
                    style={{ marginTop: '10px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Видалити
                </button>
                <a 
                    href={`#/wishes/${id}`} 
                    className="btn-nav btn-nav--detail"
                    onClick={(e) => {
                        if (onNavigate) {
                            e.preventDefault();
                            onNavigate(`#/wishes/${id}`);
                        }
                    }}
                >
                    <span>Переглянути деталі</span>
                </a>
            </div>
        </article>
    );
}

function WishDetailView({ id, wishes, onNavigate }) {
    const wish = wishes.find(item => String(item.id) === String(id));

    if (!wish) {
        return (
            <section>
                <h2>Бажання не знайдено 404</h2>
                <a 
                    href="#/" 
                    className="btn-nav btn-nav--back"
                    onClick={(e) => { e.preventDefault(); onNavigate('#/'); }}
                >
                    Повернутися на головну
                </a>
            </section>
        );
    }

    return (
        <section className="wish-detail">
            <h2>Деталі бажання: {wish.title}</h2>
            <p><strong>Ціна:</strong> {wish.price} $</p>
            <p><strong>Накопичено:</strong> {wish.savedAmount || 0} $</p>
            <p><strong>Пріоритет:</strong> {wish.priority}</p>
            <p><strong>Статус:</strong> {wish.purchased ? 'Придбано' : 'Ще не придбано'}</p>
            {wish.url && (
                <p>
                    <strong>Посилання:</strong>{' '}
                    <a href={wish.url} target="_blank" rel="noreferrer">
                        Перейти до товару
                    </a>
                </p>
            )}
            <br />
            <a 
                href="#/" 
                className="btn-nav btn-nav--back"
                onClick={(e) => { e.preventDefault(); onNavigate('#/'); }}
            >
                Назад до списку
            </a>
        </section>
    );
}

function PurchasedWishesView({ wishes, onToggle, onChangePriority, onChangeSavedAmount, onDelete, onNavigate }) {
    const purchasedWishes = wishes.filter(w => w.purchased);

    return (
        <section>
            <h2>Куплені бажання</h2>
            {purchasedWishes.length === 0 ? (
                <p>Ви ще нічого не придбали.</p>
            ) : (
                <div className="cards">
                    {purchasedWishes.map(wish => (
                        <WishItem 
                            key={wish.id}
                            id={wish.id}
                            name={wish.title}
                            price={wish.price}
                            savedAmount={wish.savedAmount}
                            priority={wish.priority}
                            isPurchased={wish.purchased}
                            onToggle={onToggle}
                            onChangePriority={onChangePriority}
                            onChangeSavedAmount={onChangeSavedAmount}
                            onDelete={onDelete}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
            )}
            <br />
            <a 
                href="#/" 
                className="btn-nav btn-nav--back"
                onClick={(e) => { e.preventDefault(); onNavigate('#/'); }}
            >
                Назад до всіх бажань
            </a>
        </section>
    );
}


function WishlistApp() {
    const [wishes, setWishes] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [priority, setPriority] = React.useState('середній');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    // Конфігурація маршрутів додатка
    const routes = [
        { path: '/', view: 'home' },
        { path: '/wishes/:id', view: 'detail' },
        { path: '/purchased', view: 'purchased' }
    ];

    const [currentHash, setCurrentHash] = React.useState(window.location.hash || '#/');

    function matchRoute(path) {
        const pathParts = path.split('/').filter(Boolean);
        
        for (const route of routes) {
        const routeParts = route.path.split('/').filter(Boolean);
        if (routeParts.length !== pathParts.length) continue;
        
        const params = {};
        const isMatch = routeParts.every((part, i) => {
            if (part.startsWith(':')) {
            params[part.slice(1)] = pathParts[i];
            return true;
            }
            return part === pathParts[i];
        });

        if (isMatch) return { view: route.view, params };
        }
        return null;
    }

    React.useEffect(() => {
        async function initData() {
        setLoading(true);
        try {
            await migrateFromLocalStorageIfNeeded();
            let items = await getAllItems();

            if (items.length === 0) {
            items = [
                { id: 1, title: "Машина", price: 18000, savedAmount: 4500, priority: "високий", purchased: false },
                { id: 2, title: "Яхта", price: 38000, savedAmount: 0, priority: "середній", purchased: false },
                { id: 3, title: "Ноутбук", price: 500, savedAmount: 500, priority: "низький", purchased: true }
            ];
            await putItemsBulk(items);
            }

            setWishes(items);
            saveToLocalStorage(items);
        } catch (err) {
            setError('Не вдалося відкрити сховище IndexedDB. Перевірте, чи не увімкнено приватний режим.');
            console.error(err);
        } finally {
            setLoading(false);
        }
        }

        initData();
    }, []);

    React.useEffect(() => {
        const handleHashChange = () => {
        setCurrentHash(window.location.hash || '#/');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navigate = (newHash) => {
        window.location.hash = newHash;
    };

    async function toggleWish(id) {
        const updated = wishes.map(item => 
        item.id === id ? { ...item, purchased: !item.purchased } : item
        );
        const updatedItem = updated.find(item => item.id === id);

        setWishes(updated);
        saveToLocalStorage(updated);
        await putItem(updatedItem);
    }

    async function changePriority(id, newPriority) {
        const updated = wishes.map(item => 
        item.id === id ? { ...item, priority: newPriority } : item
        );
        const updatedItem = updated.find(item => item.id === id);

        setWishes(updated);
        saveToLocalStorage(updated);
        await putItem(updatedItem);
    }

    async function changeSavedAmount(id, amount) {
        const updated = wishes.map(item => {
        if (item.id === id) {
            const newSaved = Math.max(0, amount);
            const isNowPurchased = newSaved >= item.price;
            return { ...item, savedAmount: newSaved, purchased: isNowPurchased };
        }
        return item;
        });
        const updatedItem = updated.find(item => item.id === id);

        setWishes(updated);
        saveToLocalStorage(updated);
        await putItem(updatedItem);
    }

    async function loadData() {
        setLoading(true);
        setError('');
        try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Сервер відповів кодом ${response.status}`);
        const data = await response.json();

        const formattedWishes = data.map((item, index) => {
            const itemPrice = (index + 1) * 100;
            return {
            id: item.id,
            title: item.title,
            price: itemPrice,
            savedAmount: item.completed ? itemPrice : 0,
            priority: item.completed ? 'низький' : 'високий',
            purchased: item.completed
            };
        });

        setWishes(formattedWishes);
        saveToLocalStorage(formattedWishes);
        await clearDB();
        await putItemsBulk(formattedWishes);
        } catch (err) {
        setError('Не вдалося завантажити дані з сервера.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    }

    async function handleAddWish(e) {
        e.preventDefault();
        if (!title.trim() || price === '' || Number(price) < 0) {
        alert("Будь ласка, заповніть усі поля коректно!");
        return;
        }

        const newWish = {
        id: Date.now(),
        title: title.trim(),
        price: Number(price),
        savedAmount: 0,
        priority: priority,
        purchased: false
        };

        const updated = [...wishes, newWish];
        setWishes(updated);
        saveToLocalStorage(updated);
        await putItem(newWish);

        setTitle('');
        setPrice('');
        setPriority('середній');
    }

    async function deleteWish(id) {
        const updated = wishes.filter(item => item.id !== id);
        setWishes(updated);
        saveToLocalStorage(updated);
        await deleteItem(id);
    }

    const totalPrice = wishes.reduce((sum, item) => sum + (item.price || 0), 0);

    const rawPath = currentHash.replace(/^#/, '') || '/';
    const match = matchRoute(rawPath);

    const renderContent = () => {
        if (!match) {
        return (
            <section>
            <h2>404 — Сторінку не знайдено</h2>
            <a href="#/" className="btn-nav btn-nav--back" onClick={(e) => { e.preventDefault(); navigate('#/'); }}>
                На головну
            </a>
            </section>
        );
        }

        switch (match.view) {
        case 'detail':
            return <WishDetailView id={match.params.id} wishes={wishes} onNavigate={navigate} />;

        case 'purchased':
            return (
            <PurchasedWishesView 
                wishes={wishes} 
                onToggle={toggleWish}
                onChangePriority={changePriority}
                onChangeSavedAmount={changeSavedAmount}
                onDelete={deleteWish}
                onNavigate={navigate}
            />
            );

        case 'home':
        default:
            return (
            <>
                <section id="add-wishes">
                <h2>Додати бажання</h2>
                <form onSubmit={handleAddWish} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                    <input 
                    type="text" 
                    placeholder="Назва бажання" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    />
                    <input 
                    type="number" 
                    placeholder="Ціна ($)" 
                    value={price} 
                    min="0"
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                    />
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="високий">Високий</option>
                    <option value="середній">Середній</option>
                    <option value="низький">Низький</option>
                    </select>
                    <button type="submit" className="btn-add">Додати</button>
                </form>
                </section>

                <section id="list-wishes" style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Мої бажання</h2>
                    <button onClick={loadData} disabled={loading}>
                    {loading ? 'Завантаження...' : 'Завантажити з API'}
                    </button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {loading ? (
                    <p>Завантаження даних...</p>
                ) : (
                    <div className="cards">
                    {wishes.map(wish => (
                        <WishItem 
                        key={wish.id}
                        id={wish.id}
                        name={wish.title}
                        price={wish.price}
                        savedAmount={wish.savedAmount}
                        priority={wish.priority}
                        isPurchased={wish.purchased}
                        onToggle={toggleWish}
                        onChangePriority={changePriority}
                        onChangeSavedAmount={changeSavedAmount}
                        onDelete={deleteWish}
                        onNavigate={navigate}
                        />
                    ))}
                    </div>
                )}
                </section>
            </>
            );
        }
    };

    return (
        <div>
        <header>
            <h1>Список бажань</h1>
            <nav>
            <a href="#/" onClick={(e) => { e.preventDefault(); navigate('#/'); }}>Усі бажання</a> | {' '}
            <a href="#/purchased" onClick={(e) => { e.preventDefault(); navigate('#/purchased'); }}>Придбані</a>
            </nav>
        </header>

        <div className="layout">
            <main id="app">
            {renderContent()}
            </main>

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
