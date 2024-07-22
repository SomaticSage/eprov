document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const cartCountContainer = document.getElementById('cart-count');
    const tabButtons = document.querySelectorAll('.tab-button');
    const searchInput = document.querySelector('.search-bar input');

    let products = [];
    let cart = [];

    // Load products from local storage
    const loadProducts = () => {
        products = getProducts();
        displayProducts(products);
    };

    // Load cart from local storage
    const loadCart = () => {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartCount();
    };

    // Save cart to local storage
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    // Display products based on the filter condition
    const displayProducts = (productsToDisplay) => {
        productsContainer.innerHTML = '';
        productsToDisplay.forEach(product => addProductToDOM(product));
    };

    // Add product to the DOM
    const addProductToDOM = (product) => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('product');
        newProduct.innerHTML = `
            <div class="product-info" data-name="${product.name}">i</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart">Add to Cart</button>
        `;

        productsContainer.appendChild(newProduct);
        addEventListenersToProduct(newProduct, product.quantity);
    };

    // Add event listeners to a product element
    const addEventListenersToProduct = (productElement, maxQuantity) => {
        const addToCartButton = productElement.querySelector('.add-to-cart');
        const infoButton = productElement.querySelector('.product-info');

        addToCartButton.addEventListener('click', () => {
            showQuantityDropdown(productElement, maxQuantity);
        });

        infoButton.addEventListener('click', () => {
            const productName = infoButton.getAttribute('data-name');
            let interestedProducts = JSON.parse(localStorage.getItem('interestedProducts')) || [];
            if (!interestedProducts.includes(productName)) {
                interestedProducts.push(productName);
                localStorage.setItem('interestedProducts', JSON.stringify(interestedProducts));
                alert('Product name has been saved to the interested list.');
            } else {
                alert('This product is already in your interested list.');
            }
        });
    };

    // Show quantity dropdown
    const showQuantityDropdown = (productElement, maxQuantity) => {
        let dropdown = productElement.querySelector('.quantity-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('select');
            dropdown.classList.add('quantity-dropdown');
            for (let i = 1; i <= maxQuantity; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                dropdown.appendChild(option);
            }
            productElement.appendChild(dropdown);

            dropdown.addEventListener('change', () => {
                const selectedQuantity = parseInt(dropdown.value);
                const productName = productElement.querySelector('.product-name').textContent;
                const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));

                // Find product in cart
                const existingProductIndex = cart.findIndex(item => item.name === productName);

                if (existingProductIndex >= 0) {
                    // Update quantity if product already in cart
                    cart[existingProductIndex].quantity = selectedQuantity;
                } else {
                    // Add new product to cart with selected quantity
                    cart.push({ name: productName, price: productPrice, quantity: selectedQuantity });
                }

                saveCart();
                dropdown.remove(); // Remove dropdown after selection
            });
        }
    };

    // Update cart count display
    const updateCartCount = () => {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountContainer.textContent = itemCount;
    };

    // Filter products based on condition
    const filterProducts = (condition) => {
        const filteredProducts = products.filter(product => product.condition === condition);
        displayProducts(filteredProducts);
    };

    // Search products based on input
    const searchProducts = (searchTerm) => {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayProducts(filteredProducts);
    };

    // Initial load of products and cart
    loadProducts();
    loadCart();

    // Add event listeners to filter buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const condition = button.getAttribute('data-condition');
            filterProducts(condition);
        });
    });

    // Add event listener to search input
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        searchProducts(searchTerm);
    });
});
