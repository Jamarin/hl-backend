const stripe = require('stripe')(process.env.STRIPE_TOKEN);
const express = require('express')
const router = express.Router()

router.post('/customer-portal', async (req, res) => {



    const session = await stripe.billingPortal.sessions.create({
        customer: 'cus_ISfxBvm5IyImfj',
        return_url: 'http://127.0.0.1/',
    });

    res.redirect(session.url);
});

module.exports = router