document.addEventListener('DOMContentLoaded', function() {
    const navBarIcon = document.querySelector(".Nav-bar-icon");
    const navBarR = document.querySelector(".Nav-bar");
    const viewportWidth = window.innerWidth;

    if (navBarIcon && navBarR) {
        navBarIcon.style.position = "fixed";
        navBarIcon.style.right = "0";
        navBarIcon.onclick = responsive;

        function responsive() {
            if (navBarR.style.display === "flex") {
                navBarR.style.display = "none";
            } else {
                navBarR.style.display = "flex";
                navBarR.style.opacity = "1";
                navBarR.style.width = "90%";
                navBarR.style.color = "#e6f3ff";
            }
        }
    }
});
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/charge', async (req, res) => {
    const amount = req.body.amount * 100;
    const token = req.body.stripeToken;

    try {
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: 'Donation',
            source: token,
        });

        res.send('Success');
    } catch (error) {
        res.status(500).send('Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
document.addEventListener('DOMContentLoaded', function() {
    const stripe = Stripe('your-publishable-key-here');
    const elements = stripe.elements();

    const card = elements.create('card');
    card.mount('#card-element');

    card.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    const form = document.getElementById('donation-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                stripeTokenHandler(result.token);
            }
        });
    });

    function stripeTokenHandler(token) {
        const form = document.getElementById('donation-form');
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);

        form.submit();
    }
});
