let allProducts = [];
let cartCount = 0;
let cartItems = [];
let cartTotal = 0;

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set greeting
    const user = JSON.parse(userStr);
    const greetingEl = document.getElementById('user-greeting');
    if (greetingEl) {
        greetingEl.textContent = `Hello, ${user.name.split(' ')[0]}`;
    }

    fetchProducts();
});

// Fetch products from the Node.js backend
async function fetchProducts() {
    const container = document.getElementById('product-container');
    try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }
        
        allProducts = await response.json();
        renderProducts(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        container.innerHTML = `
            <div class="error-message">
                <strong>Error loading products:</strong><br>
                ${error.message}<br><br>
                Please ensure both your MySQL database is running and your Node.js server (server.js) is started.
            </div>`;
    }
}

// Dynamically generate HTML for the products
function renderProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear existing items

    if (!document.querySelector('h2')) {
       // if missing for some reason
    }

    if (products.length === 0) {
        container.innerHTML = '<p style="font-size: 1.2rem;">No products found for this search or category.</p>';
        return;
    }

    products.forEach(product => {
        // Create the card element
        const card = document.createElement('div');
        card.className = 'product-card';

        // Use standard placeholders to simulate product images since we don't have local image files.
        // It uses ui-avatars to create a nice initials based background block.
        const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=random&color=fff&size=200&font-size=0.25&rounded=false`;
        
        // Multiply by 83 for realistic INR values since DB is in USD
        const priceInRupees = Number(product.price) * 83;

        card.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <p class="product-desc">${product.description || 'A great product.'}</p>
                <div class="product-price">₹${Number(priceInRupees).toLocaleString('en-IN')}</div>
            </div>
            <button class="add-to-cart" onclick="addToCart('${product.name}', ${priceInRupees})">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// Handle category filtering
function filterCategory(category, buttonElement) {
    // Update active visual state for buttons
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    // Filter products logic
    if (category === 'All') {
        renderProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Simple search functionality
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    
    // Also reset categories to "All" when searching
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[0].classList.add('active'); // "All" button

    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

// Simple Cart Interaction
function addToCart(productName, price) {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    
    // Add item to cart array and update total
    cartItems.push({ name: productName, price: Number(price) });
    cartTotal += Number(price);
    
    updateCartUI();
    
    alert(`Added ${productName} to your cart!`);
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartContainer.innerHTML = ''; // blank it to re-render
        cartItems.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <span>${index + 1}. ${item.name}</span>
                    <span>₹${Number(item.price).toLocaleString('en-IN')}</span>
                </div>
            `;
        });
    }
    totalEl.textContent = Number(cartTotal).toLocaleString('en-IN');
}

// Modal Toggle Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modals when clicking the dim background outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Logout Logic
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Checkout Logic
function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    alert(`Order placed successfully!\nTotal paid: ₹${Number(cartTotal).toLocaleString('en-IN')}`);
    
    // Clear the cart
    cartItems = [];
    cartCount = 0;
    cartTotal = 0;
    document.getElementById('cart-count').textContent = cartCount;
    updateCartUI();
    closeModal('cart-modal');
}
