const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const createPayment = require('./create-payment');

const token = '6484000395:AAHbVvVv5WcUZtFBxMlV2ThDI7PVnO2cxYI';
const webAppUrl = 'https://pirog-dvor.netlify.app/';
const webUrlCont = 'https://pirogov-dvorik.ru/kontakty/';

const bot = new TelegramBot(token, {polling: true});
const app = express();
const PORT = 5000;


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const photo = 'src/slayd.jpg'
    const caption = 'СКИДКА 20% В ПОДАРОК В ЧЕСТЬ ДНЯ РОЖДЕНИЯ!\n Мы дарим скидку 20% на ваш заказ! Но это еще не все, при заказе от 1000 рублей в чат-боте или через call-центр вы сможете выбрать себе подарок: сохранить скидку 20% на весь заказ или выбрать Говядину в соусе с пюре совершенно бесплатно к вашему заказу!'

    if(text === '/news') {
        await bot.sendPhoto(chatId, photo, {caption})
    }

    if(text === '/contact') {
        await bot.sendMessage(chatId, '+78126004202')
        await bot.sendContact(chatId, '+78126004202', 'Колл-Центр')
    }

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Приветствуем вас в нашем чат-боте\n\nЗдесь вы можете начать оформлять заказ по кнопке ниже\n\nНапишите /contact чтобы узнать контактную информацию ресторана или получить помощь', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
            await bot.sendMessage(chatId, 'Ваш номер телефона: ' + data?.number);
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);
        } catch (e) {
            console.log(e);
        }
    }
});

app.use(cors({
    origin: 'https://pirog-dvor.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Proxy server is running on https://pirog-dvor.netlify.app`);
});
