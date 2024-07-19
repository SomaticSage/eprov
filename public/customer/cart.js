document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    let cart = [];

    // Load cart from local storage
    const loadCart = () => {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartDisplay();
    };

    // Save cart to local storage
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    // Update cart display
    const updateCartDisplay = () => {
        // Clear current cart display
        cartItemsContainer.innerHTML = '';

        let total = 0;

        // Create cart item elements
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                <button class="remove-from-cart" data-name="${item.name}"><i class="fas fa-trash-alt"></i></button>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Calculate total price
            total += item.price * item.quantity;
        });

        // Update total price display
        cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-name');
                removeFromCart(productName);
            });
        });
    };

    // Remove product from cart
    const removeFromCart = (productName) => {
        cart = cart.filter(item => item.name !== productName);
        saveCart();
    };

    // Initial load of cart
    loadCart();
});
