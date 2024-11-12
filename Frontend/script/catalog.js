import { backendPort, backendUrl } from "./API.js";

$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    function loadProducts() {
        $.ajax({
            url: `${backendUrl}:${backendPort}/products/available`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(products) {
                const productsHtml = products.map(product => `
                    <div class="product-card">
                        <img src="${product.imageUrl}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
                    </div>
                `).join('');
                $('#products').html(productsHtml);
            },
            error: function() {
                alert('Error al cargar los productos');
            }
        });
    }

    function initializeProducts() {
        $.ajax({
            url: `${backendUrl}:${backendPort}/products/initialize`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function() {
                loadProducts(); 
            },
            error: function() {
                alert('Error al inicializar los productos');
            }
        });
    }

    window.addToCart = function(productId) {
        $.ajax({
            url: `${backendUrl}:${backendPort}/cart/add`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            contentType: 'application/json',
            data: JSON.stringify({ productId }),
            success: function() {
                alert('Producto añadido al carrito');
            },
            error: function() {
                alert('Error al añadir al carrito');
            }
        });
    };

    $('#logout').click(function() {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    $('#initializeProducts').click(function() {
        initializeProducts();
    });

    loadProducts();
});