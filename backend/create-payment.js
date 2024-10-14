// create-payment.js
const axios = require('axios');

const createPayment = async (description, orderId, amount) => {
    const { data } = await axios.post(
        'https://api.yookassa.ru/v3/payments',
        {
            amount: {
                value: amount.toString(),
                currency: 'RUB',
            },
            capture: true,
            description,
            metadata: {
                order_id: orderId,
            },
            confirmation: {
                type: 'redirect',
                return_url: "https://pirog-dvor.netlify.app/form",
            },
        },
        {
            auth: {
                username: '469077',
                password: 'test_rA2RKX9ZtQiVLHintw6W64Lm2OShcMafpcJg3GtWLko',
            },
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString(36).substring(7),
            },
        }
    );

    return data;
};

module.exports = createPayment;
