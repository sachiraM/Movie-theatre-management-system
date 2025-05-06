const express = require('express');
const Payment = require('../models/payment');
const stripe = require('stripe')('sk_test_51Ns9obAuazamskfx2FbGPFJyekhZ7Le2CEX6fBvU18ZnocXHhBGhz3FQdy1kjQ9BTgPGvyiq8XsOxvHOhrG5w9eI00zvkNE8OF');
const router = express.Router();

// Payment route
router.post('/payment', async (req, res) => {
  try {
    // Assuming req.body contains the data that we need to save to the database
    const {
      email,
      phoneNumber,
      cardHolderName,
      cartItems,
      totalCartPrice,
    } = req.body;

    const paymentData = new Payment({
      email,
      phoneNumber,
      cardHolderName,
      cartItems,
      totalCartPrice,
    });

    // Use await to wait for the save operation to complete
    await paymentData.save();

    res.status(201).json({ message: 'Payment data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving payment data' });
  }
});

router.get('/paymentrecords', async (req, res) => {
  try {
    const paymentRecords = await Payment.find();
    res.json(paymentRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching payment records' });
  }
});


// Checkout API
router.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Products must be an array.' });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'lkr',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect to success page on payment success
      cancel_url: 'http://localhost:3000/cancel', // Redirect to cancel page on payment cancel
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
  }
});


module.exports = router;
