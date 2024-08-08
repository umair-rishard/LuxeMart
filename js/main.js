document.addEventListener('DOMContentLoaded', () => {
    
    const menuButton = document.getElementById('menu-button');
    const navigationBar = document.querySelector('.navbar');

    if (menuButton && navigationBar) {
        menuButton.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
               
                navigationBar.classList.toggle('active');
            }
        });

      
        if (window.innerWidth <= 991) {
            navigationBar.classList.remove('active');
        }

      
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991) {
                navigationBar.classList.remove('active');
            } else {
                navigationBar.classList.remove('active');
            }
        });
    } else {
        console.error('Menu button or navigation bar element not found.');
    }


    const cartTableBody = document.querySelector('#cart-table tbody') || document.querySelector('#order-table tbody');
    const totalPriceElement = document.getElementById('total-price') || document.getElementById('order-total-price');
    const buyNowButton = document.getElementById('buy-now-btn');
    const addToFavouritesButton = document.getElementById('add-to-favourites') || document.getElementById('add-to-favourites-order');
    const applyFavouritesButton = document.getElementById('apply-favourites') || document.getElementById('apply-favourites-order');
    let cartItems = {};

    function updateTotalPrice() {
        let totalPrice = 0;
        for (let key in cartItems) {
            const item = cartItems[key];
            totalPrice += item.quantity * item.price;
        }
        totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} RS`;
        if (buyNowButton) {
            if (Object.keys(cartItems).length === 0) {
                buyNowButton.setAttribute('disabled', 'disabled');
            } else {
                buyNowButton.removeAttribute('disabled');
            }
        }
    }

    function addItemToCart(name, quantity, price, unit) {
        if (cartItems[name]) {
            cartItems[name].quantity += quantity;
            cartItems[name].row.cells[1].textContent = `${cartItems[name].quantity} ${cartItems[name].unit}`;
            cartItems[name].row.cells[2].textContent = (cartItems[name].quantity * cartItems[name].price).toFixed(2) + ' RS';
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${quantity} ${unit}</td>
                <td>${(price * quantity).toFixed(2)} RS</td>
                <td><button class="remove-btn"><i class="fas fa-trash"></i> Remove</button></td>
            `;
            cartTableBody.appendChild(row);

            const removeButton = row.querySelector('.remove-btn');
            removeButton.addEventListener('click', () => {
                removeItemFromCart(name);
            });

            cartItems[name] = {
                quantity: quantity,
                price: price,
                unit: unit,
                row: row
            };
        }
        updateTotalPrice();
    }

    function removeItemFromCart(name) {
        const item = cartItems[name];
        item.row.remove();
        delete cartItems[name];
        updateTotalPrice();
    }

    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const quantityInput = button.previousElementSibling;
            const quantity = parseInt(quantityInput.value);
            const price = parseFloat(quantityInput.getAttribute('data-price'));
            const unit = quantityInput.getAttribute('data-unit') || '';

            if (quantity > 0) {
                addItemToCart(itemName, quantity, price, unit);
                quantityInput.value = 0;
            }
        });
    });

    if (buyNowButton) {
        buyNowButton.addEventListener('click', (event) => {
            if (Object.keys(cartItems).length === 0) {
                event.preventDefault();
                alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
            } else {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
        });
    }

    
    addToFavouritesButton.addEventListener('click', () => {
        const favourites = {};
        for (const name in cartItems) {
            favourites[name] = {
                quantity: cartItems[name].quantity,
                price: cartItems[name].price,
                unit: cartItems[name].unit
            };
        }
        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert('Cart items have been saved to favourites.');
    });

    
    applyFavouritesButton.addEventListener('click', () => {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites') || '{}');
        cartTableBody.innerHTML = ''; 
        cartItems = {}; 
        for (const name in savedFavourites) {
            addItemToCart(name, savedFavourites[name].quantity, savedFavourites[name].price, savedFavourites[name].unit);
        }
        updateTotalPrice();
    });

   
    if (window.location.pathname.includes('order-page.html')) {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
        localStorage.removeItem('cartItems'); 
        for (const name in savedCartItems) {
            addItemToCart(name, savedCartItems[name].quantity, savedCartItems[name].price, savedCartItems[name].unit);
        }

        
        cartTableBody.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const row = event.target.closest('tr');
                row.remove();
                updateTotalPrice();
            });
        });
    } else {
       
        const savedFavourites = JSON.parse(localStorage.getItem('favourites') || '{}');
        for (const name in savedFavourites) {
            addItemToCart(name, savedFavourites[name].quantity, savedFavourites[name].price, savedFavourites[name].unit);
        }
    }

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            const paymentMethod = orderForm.querySelector('[name="payment-method"]').value;
            if (!paymentMethod) {
                event.preventDefault();
                alert('Please select a payment method.');
            } else {
                
                alert('Your order is confirmed and you will receive your order on 8th August.');
                
            }
        });
    }
});