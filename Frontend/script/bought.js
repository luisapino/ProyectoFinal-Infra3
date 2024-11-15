import { backendPort, backendUrl } from "./API.js";

$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    function loadBoughtProducts() {
        $.ajax({
            url: `${backendUrl}:${backendPort}/products/bought`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(products) {
                if (products.length === 0) {
                    $('#products').html('<p class="no-products">No has comprado ningún producto todavía.</p>');
                    return;
                }

                const productsHtml = products.map(product => `
                    <div class="product-card">
                        <img src="${product.imageUrl}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Precio: $${product.price}</p>
                    </div>
                `).join('');
                $('#products').html(productsHtml);
            },
            error: function(xhr) {
                if (xhr.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = 'index.html';
                } else {
                    alert('Error al cargar los productos comprados');
                }
            }
        });
    }

    $('#logout').click(function() {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    // Botón para volver al catálogo
    $('#back-to-catalog').click(function() {
        window.location.href = 'catalog.html';
    });

    loadBoughtProducts();
});