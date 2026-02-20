//in js first we save the data so we use array and object. array store multiple elements and object lets us store various data.

// let products = [{}]; now we use the file which link in amazon.html which have lots of produts.

//create a blank string to store the data which find by using loop thriugh array like below.

/*here we use .toFixed to show or force the number always with two places after decimal.(line number 61)*/

/** data-product-name="${product.name} when we use queryselectorAll(btn) so nodelst of btn and when we set the listener so how we now which btn is clicked so we use html attribute data-product-name(data-(your coice to set the name)) line -> 61 after this we use in inside functin button.dataset (.dataset) it will give the all data attribute that attached to button after this we are able to get the product name*/

let productsHTML = '';

//loop through array and data comes one by one in product.which is provided by us like product and we fetch the data by using this( like this ${product.name , product.image etc}).

products.forEach((product)=>{
    //we can also write like this (productHTML+= this is called accumulator pattern).
    productsHTML = productsHTML +`
    <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents/100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select>
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

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
    `; 
});


document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click' , ()=>{
       const productId = button.dataset.productId;
       
       let matchingItem;
       cart.forEach((item)=>{
        if(productId === item.productId){
           matchingItem = item;
        }
       });

       if(matchingItem){
        matchingItem.Quantity++;
       }
       else{
        cart.push({
        productId:productId,
        Quantity:1
       });
       }

       let cartQuantity = 0;

       cart.forEach((item)=>{
        cartQuantity+=item.Quantity; 
       });

       document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

        console.log(cartQuantity);
       
          console.log(cart);
    });
});