import {cart , removeFromCart ,  updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utility/money.js';


let cartItemsHtml = '';
cart.forEach((cartItem)=>{

    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

  

  cartItemsHtml+=`
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
  `
});


document.querySelector('.js-order-summary').innerHTML = cartItemsHtml;

document.querySelectorAll('.js-dlt-link').forEach((link)=>{
  link.addEventListener('click' , ()=>{
    
    const productId = link.dataset.productId;
    removeFromCart(productId , updateCartQuantity);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    
    
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
    
  })

})


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
  })
})