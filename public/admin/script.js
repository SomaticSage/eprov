document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const addProductButton = document.getElementById('add-product-button');

    // Load products from local storage
    const loadProducts = () => {
        const products = getProducts();
        products.forEach(product => addProductToDOM(product));
    };

    // Save products to local storage
    const saveProducts = () => {
        const products = [];
        document.querySelectorAll('.product').forEach(productElement => {
            const productName = productElement.querySelector('.product-name').value;
            const productPrice = productElement.querySelector('.product-price').value;
            const productQuantity = productElement.querySelector('.product-quantity').value;
            const productCondition = productElement.querySelector('.product-condition').value;
            products.push({ name: productName, price: productPrice, quantity: productQuantity, condition: productCondition });
        });
        setProducts(products);
    };

    // Add product to the DOM
    const addProductToDOM = (product) => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('product');
        newProduct.innerHTML = `
            <input type="text" class="product-name" value="${product.name}">
            <input type="text" class="product-price" value="${product.price}">
            <input type="number" class="product-quantity" value="${product.quantity}" min="0">
            <select class="product-condition">
                <option value="first-hand" ${product.condition === 'first-hand' ? 'selected' : ''}>First Hand</option>
                <option value="second-hand" ${product.condition === 'second-hand' ? 'selected' : ''}>Second Hand</option>
            </select>
            <button class="delete-product">Delete Product</button>
        `;

        productsContainer.appendChild(newProduct);
        addEventListenersToProduct(newProduct);
    };

    // Add event listeners to a product element
    const addEventListenersToProduct = (productElement) => {
        const productNameInput = productElement.querySelector('.product-name');
        const productPriceInput = productElement.querySelector('.product-price');
        const productQuantityInput = productElement.querySelector('.product-quantity');
        const productConditionSelect = productElement.querySelector('.product-condition');
        const deleteButton = productElement.querySelector('.delete-product');

        productNameInput.addEventListener('input', saveProducts);
        productPriceInput.addEventListener('input', saveProducts);
        productQuantityInput.addEventListener('input', saveProducts);
        productConditionSelect.addEventListener('change', saveProducts);

        deleteButton.addEventListener('click', () => {
            productElement.remove();
            saveProducts();
            console.log('Product deleted');
        });
    };

    // Add new product event listener
    addProductButton.addEventListener('click', () => {
        const productName = document.getElementById('new-product-name').value;
        const productPrice = document.getElementById('new-product-price').value;
        const productQuantity = document.getElementById('new-product-quantity').value;
        const productCondition = document.getElementById('new-product-condition').value;

        if (productName && productPrice && productQuantity && productCondition) {
            const newProduct = { name: productName, price: productPrice, quantity: productQuantity, condition: productCondition };
            addProductToDOM(newProduct);
            saveProducts();
        }
    });

    // Initial load
    loadProducts();
});
