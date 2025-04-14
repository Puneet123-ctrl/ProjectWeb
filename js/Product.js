let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function calculateTotals() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let shipping = 7.00;
    let taxes = subtotal * 0.15;
    let total = subtotal + taxes + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
    document.getElementById('orderTotal').textContent = `$${total.toFixed(2)}`;

    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('totalAmount', total);
}

function displayCartDetails() {
    const sidebarCartItemsList = document.getElementById('sidebarCartItems');
    sidebarCartItemsList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.product} - $${item.price} x${item.quantity}
            <button onclick="removeFromCart('${item.product}')">Remove</button>`;
        sidebarCartItemsList.appendChild(li);
    });

    calculateTotals();
}

$('.add-to-cart').click(function () {
    const product = $(this).data('product');
    const price = parseFloat($(this).data('price'));

    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }

    displayCartDetails();
});

function removeFromCart(product) {
    cart = cart.filter(item => item.product !== product);
    displayCartDetails();
}

document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.toggle('open');
});

document.getElementById('closeSidebar').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('open');
});

displayCartDetails();
