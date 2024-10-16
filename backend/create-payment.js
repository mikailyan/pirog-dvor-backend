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
                username: '385657',
                password: 'test_CBydYSOMhpF8CuhTLBAJlS-qZWz_PeyQ-qJK_z47NrY',
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
