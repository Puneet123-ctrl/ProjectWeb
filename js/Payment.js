document.addEventListener('DOMContentLoaded', function() {
    const orderTotal = sessionStorage.getItem('orderTotal');
    if (orderTotal) {
        document.getElementById('finalTotal').textContent = orderTotal;
    } else {
        document.getElementById('finalTotal').textContent = 'Error: Total not found';
    }
});

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Perform your validation here using regular expressions
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const email = document.getElementById('email').value;
    const postalCode = document.getElementById('postalCode').value;

    const cardNumberRegex = /^[0-9]{13,19}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // Canadian postal code example

    let errors = [];

    if (!cardNumberRegex.test(cardNumber)) {
        errors.push('Invalid card number.');
    }
    if (!expiryDate) {
        errors.push('Please enter the expiry date.');
    }
    if (!/^[0-9]{3,4}$/.test(cvv)) {
        errors.push('Invalid CVV.');
    }
    if (!emailRegex.test(email)) {
        errors.push('Invalid email address.');
    }
    if (postalCode && !postalCodeRegex.test(postalCode)) {
        errors.push('Invalid postal code format.');
    }

    if (errors.length > 0) {
        alert('Please correct the following errors:\n' + errors.join('\n'));
    } else {
        // If no errors, you would typically process the payment and potentially
        // store the data in a cookie or send it to a server.
        alert('Payment submitted successfully!');
        sessionStorage.removeItem('orderTotal'); // Clear the total after submission
        // Optionally redirect to a thank you page
    }

    // Before quitting the page, you might want to clear the session storage
    // sessionStorage.clear();
});