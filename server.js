const express = require('express');
const app = express();

// ВАЖНО: разрешаем большие запросы
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Разрешаем запросы с любых сайтов
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// Хранилище
let storage = {
    users: [],
    gov: { 
        members: [], 
        businesses: [], 
        courtCases: [], 
        wanted: [], 
        news: [],
        taxes: [],
        constructions: [],
        salaries: [],
        mortgages: [],
        lawyers: [],
        decrees: []
    },
    chat: []
};

// ПОЛУЧИТЬ данные
app.get('/api/sync', (req, res) => {
    console.log('📤 Отдаю данные, сотрудников:', storage.gov.members.length);
    res.json(storage);
});

// СОХРАНИТЬ данные
app.post('/api/sync', (req, res) => {
    try {
        if (req.body && req.body.gov) {
            storage = req.body;
            console.log('📥 Получены данные, сотрудников:', storage.gov.members?.length || 0);
            res.json({ success: true, message: 'Данные сохранены' });
        } else {
            res.json({ success: false, message: 'Пустые данные' });
        }
    } catch (e) {
        console.error('Ошибка:', e);
        res.json({ success: false, message: e.message });
    }
});

// Тестовая страница
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="background:#1a1a2e;color:white;font-family:sans-serif;padding:30px;text-align:center;">
            <h1>🏛️ Правительство Родины RP</h1>
            <p>✅ Сервер работает!</p>
            <p>👥 Сотрудников: <b>${storage.gov.members?.length || 0}</b></p>
            <p>💼 Бизнесов: <b>${storage.gov.businesses?.length || 0}</b></p>
            <p>📊 Данные синхронизируются</p>
            <hr>
            <p style="color:#b0b0b0;">Подключите в приложении: ⚙️ Админ → Синхронизация</p>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Сервер запущен на порту ' + PORT);
});