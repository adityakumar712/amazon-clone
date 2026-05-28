import {cart , calculateCartQuantity} from '../../data/cart.js';
import{getProductById} from '../../data/products.js';
import {getDeliveryOptionById} from '../../data/deliveryOption.js';
import{formatCurrency} from '../utility/money.js';
import { addOrder } from '../../data/order.js';

export function renderPaymentSummary(){
    let productTotalCents = 0;
    let deliveryTotalCents = 0;

    cart.forEach((cartItem)=>{
        const product = getProductById(cartItem.productId);
        productTotalCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
        deliveryTotalCents += deliveryOption.priceCents;
        // Do something with the delivery option if needed
    });

    const totalBeforeTaxCents = productTotalCents + deliveryTotalCents;
    const taxCents = totalBeforeTaxCents * 0.1; 
    const totalCents = totalBeforeTaxCents + taxCents;
 
  
   function calculateCartQuantity(){
      let cartQuantity = 0;
     cart.forEach((cartItem)=>{
     cartQuantity+=cartItem.quantity;

    });
    return cartQuantity;
   }


    const paymentSummaryHtml = `

     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productTotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(deliveryTotalCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button js-place-order-button button-primary">
            Place your order
          </button>
    
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    document.querySelector('.js-place-order-button').addEventListener
    ('click' , async()=>{

      try{
        const response = await fetch('https://supersimplebackend.dev/orders' ,{
        method:'POST',
        headers:{
          'content-type' : 'application/json'
        },
        body:JSON.stringify({
          cart:cart
        }) 
      })

        const order =  await response.json();  //this is also promise(response).
        addOrder(order);

         //now we check on the console orders stored on localstorage(ordersummary).

      }catch(error){
          console.log('unexpected Error . try again later');
      }
      
      window.location.href='orders.html';
    
    });

}

    
