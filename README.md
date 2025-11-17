<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Хогвартс — Магический Мир</title>
    <link rel="stylesheet" href="style.css" />
</head>

<body>

    <div class="header">
        <h1 class="main-title">🏰 Хогвартс</h1>
        <p class="main-subtitle">Магия начинается здесь</p>
    </div>

    <div class="menu">
        <button class="menu-btn" onclick="openPage('sorting')">🎩 Распределение</button>
        <button class="menu-btn" onclick="openPage('spells')">🪄 Заклинания</button>
        <button class="menu-btn" onclick="openPage('profile')">📜 Профиль</button>
        <button class="menu-btn" onclick="openPage('inventory')">🎒 Инвентарь</button>
        <button class="menu-btn" onclick="openPage('pet')">🐾 Питомец</button>
    </div>


    <!-- 🎩 Распределение -->
    <div id="sorting" class="page hidden">
        <h2>🎩 Шляпа Распределения</h2>
        <p>Готов(а) узнать свой факультет?</p>
        <button id="sortBtn" class="btn">Определить факультет</button>
        <div id="sortingResult" class="result hidden"></div>
    </div>

    <!-- 🪄 Заклинания -->
    <div id="spells" class="page hidden">
        <h2>🪄 Заклинание дня</h2>
        <button id="spellBtn" class="btn">Получить заклинание</button>
        <div id="spellOutput" class="result"></div>
    </div>

    <!-- 📜 Профиль -->
    <div id="profile" class="page hidden">
        <h2>📜 Твой профиль</h2>

        <div class="profile-box">
            <p><b>Имя:</b> <span id="profileName">Незнакомец</span></p>
            <p><b>Факультет:</b> <span id="profileHouse">—</span></p>
            <p><b>Питомец:</b> <span id="profilePet">—</span></p>
        </div>

        <input id="nameInput" class="input" placeholder="Введи своё имя" />
        <button class="btn" onclick="saveName()">Сохранить</button>
    </div>

    <!-- 🎒 Инвентарь -->
    <div id="inventory" class="page hidden">
        <h2>🎒 Инвентарь</h2>
        <ul id="inventoryList" class="inventory-list"></ul>
        <button class="btn" onclick="addItem()">Добавить случайный предмет</button>
    </div>

    <!-- 🐾 Питомец -->
    <div id="pet" class="page hidden">
        <h2>🐾 Выбор питомца</h2>

        <div class="pets">
            <button class="pet-btn" onclick="choosePet('🐱 Кот')">🐱 Кот</button>
            <button class="pet-btn" onclick="choosePet('🦉 Сова')">🦉 Сова</button>
            <button class="pet-btn" onclick="choosePet('🐸 Жаба')">🐸 Жаба</button>
            <button class="pet-btn" onclick="choosePet('🔥 Феникс')">🔥 Феникс</button>
        </div>

        <p id="petResult" class="result"></p>
    </div>


<script src="script.js"></script>
</body>
</html>
