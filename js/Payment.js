let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
let totalAmount = sessionStorage.getItem('totalAmount') || 0;

function displayCartDetails() {
    const cartItemsList = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('totalAmount');

    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - $${item.price} x${item.quantity}`;
        cartItemsList.appendChild(li);
    });

    totalAmountElement.textContent = `$${parseFloat(totalAmount).toFixed(2)}`;
}

// Time tracking
const startTime = new Date();
setInterval(() => {
    const timeSpent = Math.floor((new Date() - startTime) / 1000);
    document.getElementById('timeSpent').textContent = `Time spent on this page: ${timeSpent} seconds`;
}, 1000);

// Validation
function isValidCardNumber(number) {
    return /^\d{13,19}$/.test(number.replace(/\s+/g, ''));
}
function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}
function isValidExpiryDate(date) {
    return !!date;
}

// Form submission
$('#paymentForm').submit(function (e) {
    e.preventDefault();

    let isValid = true;

    const cardNumber = $('#cardNumber').val().replace(/\s+/g, '');
    const expiryDate = $('#expiryDate').val();
    const cvv = $('#cvv').val();

    if (!isValidCardNumber(cardNumber)) {
        $('#cardError').show();
        isValid = false;
    } else {
        $('#cardError').hide();
    }

    if (!isValidExpiryDate(expiryDate)) {
        $('#expiryError').show();
        isValid = false;
    } else {
        $('#expiryError').hide();
    }

    if (!isValidCVV(cvv)) {
        $('#cvvError').show();
        isValid = false;
    } else {
        $('#cvvError').hide();
    }

    if (isValid) {
        sessionStorage.clear();
        alert('Payment Successful!');
        window.location.href = 'OrderConfirmation.html';
    }
});

$(document).ready(function () {
    displayCartDetails();
});
