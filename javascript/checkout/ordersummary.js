import {cart , removeFromCart ,  updateQuantity ,updateDeliveryOption } from '../../data/cart.js';
import { products , getProductById} from '../../data/products.js';
import { formatCurrency } from '../utility/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions , getDeliveryOptionById} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentsummary.js';


export function renderOrderSummary()
{
let cartItemsHtml = '';
cart.forEach((cartItem)=>{

    const productId = cartItem.productId;

    const matchingProduct = getProductById(productId);
   
    
    const deliveryOptionsId =  cartItem.deliveryOptionId;
    
    const deliveryoption = getDeliveryOptionById(deliveryOptionsId);

    

    const today = dayjs();
    const deliveryDate = today.add(deliveryoption.deliveryDays , 'days');
    const dateString = deliveryDate.format('dddd , MMMM D');


  

  cartItemsHtml+=`
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>

                  <span class="link-primary js-update-quantity-link update-quantity-link" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>

                    <input type="number" class= "quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                  
                  <span class="js-dlt-link link-primary" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               
                   ${deliveryOptionsHtml(matchingProduct , cartItem)}
              
                  
                </div>
              </div>
            </div>
          </div>
  
  `
});

function deliveryOptionsHtml(matchingProduct  , cartItem){
  let html = '';

  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays , 'days');
    const dateString = deliveryDate.format('dddd , MMMM D');

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

   html+=`
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
        </div>         
      </div>
    
    `;

  });

  return html;
}


document.querySelector('.js-order-summary').innerHTML = cartItemsHtml;

document.querySelectorAll('.js-dlt-link').forEach((link)=>{
  link.addEventListener('click' , ()=>{
    
    const productId = link.dataset.productId;
    removeFromCart(productId , updateCartQuantity);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    
    renderPaymentSummary();
  });
});



function updateCartQuantity(){
 let cartQuantity = 0;

cart.forEach((cartItem)=>{
  cartQuantity+=cartItem.quantity;

});

document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}

updateCartQuantity();


//update quantity functionality
document.querySelectorAll('.js-update-quantity-link').forEach((updatelink)=>{
  updatelink.addEventListener('click' , ()=>{
    const productId = updatelink.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.classList.add('is-editing-quantity');
  
    
  });

});


//save quantity functionality
document.querySelectorAll('.js-save-link').forEach((savelink)=>{
  savelink.addEventListener('click' , ()=>{
    const productId = savelink.dataset.productId;

   

    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);

    if(newQuantity <=0 || newQuantity >= 1000){
      alert("Quantity must be less than 1000 and greater than 0");
      return;
    }
    updateQuantity(productId , newQuantity);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;
    updateCartQuantity();
  });
});



document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click' , ()=>{

    // const productId = element.dataset.productId;
    // const deliveryOptionId = element.dataset.deliveryOptionId;
    //shorthand for the above code
    const {productId , deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId , deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});

}

