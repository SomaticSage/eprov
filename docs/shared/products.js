const getProducts = () => {
    return JSON.parse(localStorage.getItem('products')) || [];
};

const setProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};
 