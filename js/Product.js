function calculateTotal() {
    let subtotal = 0;
    const products = document.querySelectorAll('.product');
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = ''; // Clear previous list

    products.forEach((product, index) => {
        const name = product.querySelector(`[id^="product${index + 1}_name"]`).value;
        const price = parseFloat(product.querySelector(`[id^="product${index + 1}_price"]`).value);
        const quantity = parseInt(product.querySelector(`[name="product${index + 1}_qty"]`).value);

        if (quantity > 0) {
            const itemTotal = price * quantity;
            subtotal += itemTotal;
            productListDiv.innerHTML += `<p>${name} x ${quantity}: $${itemTotal.toFixed(2)}</p>`;
        }
    });

    const shipping = 7.00; // Updated shipping cost
    const taxes = subtotal * 0.15; // HST in Quebec
    const orderTotal = subtotal + shipping + taxes;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
    document.getElementById('orderTotal').textContent = `$${orderTotal.toFixed(2)}`;
}

function saveCart() {
    calculateTotal(); // Ensure the total is updated before saving

    const orderTotal = document.getElementById('orderTotal').textContent;
    sessionStorage.setItem('orderTotal', orderTotal);

    // You would typically save the product selections to session storage here as well
    // For simplicity, we're just saving the total

    window.location.href = 'Payment.html'; // Assuming your payment page is named 'payment.html'
}