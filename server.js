const express = require('express');
const app = express();
app.use(express.json());

let sharedData = {};

app.post('/api/sync', (req, res) => {
    sharedData = req.body;
    res.json({ success: true, data: sharedData });
});

app.get('/api/sync', (req, res) => {
    res.json(sharedData);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Сервер запущен на порту 3000');
});