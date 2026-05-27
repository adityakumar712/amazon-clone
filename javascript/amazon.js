import {cart , addToCart} from '../data/cart.js';
import { products , loadProducts } from '../data/products.js';
import { formatCurrency } from './utility/money.js';

loadProducts(renderProductsGrid);


function renderProductsGrid(){

  let productsHtml = '';

  products.forEach((products)=>{

      let html = `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${products.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${products.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${products.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${products.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-qunatity-selector-${products.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

          ${products.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-pop-msg-${products.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products.id}">
              Add to Cart
            </button>
          </div>
      `;

      productsHtml+=html;

  });

  document.querySelector('.js-grid').innerHTML = productsHtml;


  let timeoutId;
  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
      button.addEventListener('click', ()=>{
          const productId = button.dataset.productId;

          let selectorQunatity = document.querySelector(`.js-qunatity-selector-${productId}`).value;
          let selectorQunatityValue = Number(selectorQunatity);

          addToCart(productId  , selectorQunatityValue);
          updateCartQuantity();

          const message = document.querySelector(`.js-pop-msg-${productId}`);

          message.classList.add('active');

          clearTimeout(message.timeoutId);
          message.timeoutId = setTimeout(()=>{
          message.classList.remove('active');
          },2000);
            
      });

  });



  //function for updating the cart quantity in the header.
  function updateCartQuantity(){
    let cartQuantity = 0;
          cart.forEach((item)=>{
              cartQuantity+=item.quantity;

          });

          document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  updateCartQuantity();

}