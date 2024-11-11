import { backendPort, backendUrl } from "./API.js";

$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    $.ajax({
        url: `${backendUrl}:${backendPort}/cart/items`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(data) {
            console.log(data);
            const cartItems = data.productList;
            const cartContainer = $('#cartItems');
            cartContainer.empty();
            cartItems.forEach(item => {
                cartContainer.append(`
                    <div class="product-card">
                        <h3>${item.name}</h3>
                        <p>Description: ${item.description}</p>
                        <img src="${item.imageUrl}" alt="${item.name}" />
                    </div>
                `);
            });
        },
        error: function() {
            alert('Error al cargar los artículos del carrito');
        }
    });

    $('#purchaseBtn').click(function() {
        $.ajax({
            url: `${backendUrl}:${backendPort}/cart/purchase`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function() {
                alert('Compra realizada con éxito');
                window.location.href = 'catalog.html';
            },
            error: function() {
                alert('Error al procesar la compra');
            }
        });
    });

    $('#logout').click(function() {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
});