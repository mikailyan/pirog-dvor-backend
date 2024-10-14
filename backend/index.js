// index.js
const express = require('express');
const cors = require('cors');
const createPayment = require('./create-payment'); // Импорт функции из файла create-payment.js

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'https://pirog-dvor.netlify.app', // замените на ваш домен
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // допустимые методы
  }));

app.use(express.json());

app.post('/api/create-payment', async (req, res) => {
    const { description, orderId, amount } = req.body;
    try {
        const paymentData = await createPayment(description, orderId, amount);
        res.status(200).json(paymentData);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании платежа', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on https://pirog-dvor.netlify.app`);
});
