// Sample product data (this would normally come from a backend)
let products = [
    {
        id: 1,
        name: "Produk 1",
        price: "Rp 50.000",
        image: "placeholder.jpg",
        stock: 10,
        description: "Deskripsi produk 1"
    },
    {
        id: 2,
        name: "Produk 2",
        price: "Rp 75.000",
        image: "placeholder.jpg",
        stock: 15,
        description: "Deskripsi produk 2"
    },
    // Add more products as needed
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.querySelector('.cart-count');

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Stok tidak mencukupi!');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Produk ditambahkan ke keranjang!');
}

// Function to create product cards
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
            <button class="add-to-cart" data-id="${product.id}">🛒</button>
        </div>
    `;

    // Add to cart functionality
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
    });

    // Add click event to view product details
    card.addEventListener('click', () => {
        window.location.href = `product-detail.html?id=${product.id}`;
    });

    return card;
}

// Function to display products
function displayProducts(productsToShow = products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Check if we're on the product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            document.querySelector('.product-name').textContent = product.name;
            document.querySelector('.product-price').textContent = product.price;
            document.querySelector('.product-stock').textContent = `stok: ${product.stock}`;
            document.querySelector('.product-description p').textContent = product.description;
            
            const addToCartBtn = document.querySelector('.add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    addToCart(product);
                });
            }
        }
    }
});
