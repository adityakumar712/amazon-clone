import {getProductById , loadProductsFetch} from '../data/products.js';
import {orders} from '../data/order.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from './utility/money.js';
import {addToCart} from '../data/cart.js';

async function loadPage(){
    try{

        console.log('1. starting loadpage');
    await loadProductsFetch();

    console.log('2. products loaded');

    console.log('3. orders:', orders);


    let ordersHTML = '';

    orders.forEach((order)=>{
        console.log('4. Processing order:', order);
        const orderTimingString = dayjs(order.orderTime).format('MMMM D');


        ordersHTML += `
            <div class="order-container">
            
            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderTimingString}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
                </div>

                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${productsListHTML(order)}
            </div>
            </div>
        
        `;

    });

    console.log('5. HTML generated');

   function productsListHTML(order) {

    // Prevent crash if products array is missing
    if (!order.products) {
        console.error('Missing products in order:', order);
        return '';
    }

    let productsListHTML = '';

    order.products.forEach((productsDetails) => {

        const product = getProductById(productsDetails.productId);

        // Prevent crash if product doesn't exist
        if (!product) {
            console.error(
                'Product not found:',
                productsDetails.productId
            );
            return;
        }

        productsListHTML += `
            <div class="product-image-container">
                <img src="${product.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-delivery-date">
                    Arriving on:
                    ${dayjs(
                      productsDetails.estimatedDeliveryTime
                    ).format('MMMM D')}
                </div>

                <div class="product-quantity">
                    Quantity: ${productsDetails.quantity}
                </div>

                <button
                    class="buy-again-button button-primary js-buy-again-button"
                    data-product-id="${product.id}"
                >
                    <img
                      class="buy-again-icon"
                      src="images/icons/buy-again.png"
                    >

                    <span class="buy-again-message">
                        Buy it again
                    </span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });

    return productsListHTML;
}
    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
     console.log('6. HTML inserted');

}catch(error){
    console.error('Error loading orders:', error);
}


  console.log('7. Adding button listeners');

     document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
        button.addEventListener('click' , ()=>{
            addToCart(button.dataset.productId );

            // (Optional) display a message that the product was added,
           // then change it back after a second.

           button.innerHTML = 'Added';

           setTimeout(()=>{
            button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">

             <span class="buy-again-message">Buy it again</span>

            `;

           },1000);

        });

     });
}


loadPage();
