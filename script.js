const products = [
    {
        id: 1,
        name: "headphone",
        image: "tomasz-gawlowski-YDZPdqv3FcA-unsplash.jpg",
        price: 55
    },
    {
        id: 2,
        name: "bag",
        image: "arno-senoner-oCXVxwTFwqE-unsplash.jpg",
        price: 27
    },
    {
        id: 3,
        name: "glasses",
        image: "charlesdeluvio-1-nx1QR5dTE-unsplash.jpg",
        price: 70
    },
    {
        id: 4,
        name: "waterbottle",
        image: "joan-tran-reEySFadyJQ-unsplash.jpg",
        price: 15
    },
    {
        id: 5,
        name: "perfume",
        image: "jessica-weiller-So4eFi-d1nc-unsplash.jpg",
        price: 35
    },
    {
        id: 6,
        name: "sneakers",
        image: "ryan-plomp-jvoZ-Aux9aw-unsplash.jpg",
        price: 60
    }
];

let cart = [];
// Select elements
const productContainer = document.querySelector(".product-container");
const shoppingCart = document.querySelector(".shopping-cart");
const cartCount = document.querySelector("#cart-count");
const subtotal = document.querySelector("#subtotal");
const shipping = document.querySelector("#shipping");
const total = document.querySelector("#total");
const btn = document.querySelector("#Checkout");
// Display products
function displayProducts() {
    productContainer.innerHTML = "";
    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}
// Add product to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    updateCart();
}
// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}
// Change quantity
function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (!product) return;
    product.quantity += change;
    if (product.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    updateCart();
}
// Update cart
function updateCart() {
    shoppingCart.innerHTML = "";
    if (cart.length === 0) {
        shoppingCart.innerHTML = "<h4>Your cart is empty</h4>";
    } else {
        cart.forEach(item => {
            shoppingCart.innerHTML += `
                <div class="cart-item">
                    <p>
                        $${item.price} × ${item.quantity}
                    </p>
                    <button onclick="changeQuantity(${item.id}, -1)">-
                    </button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+
                    </button>
                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            `;
        });
    }
    updateTotals();
}
// Update cart count and prices
function updateTotals() {
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const subtotalValue = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const shippingValue = cart.length > 0 ? 6 : 0;
    const totalValue = subtotalValue + shippingValue;
    if (cartCount) {
        cartCount.textContent = count;
    }
    subtotal.textContent = `$${subtotalValue}`;
    shipping.textContent = `$${shippingValue}`;
    total.textContent = `$${totalValue}`;
}
// Checkout
btn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
});
// Start the shop
displayProducts();
updateCart();
