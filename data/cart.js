export const cart =[];

//function for adding the products to the cart.
export function addToCart(productId, selectorQunatityValue){
    let matchingItem;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

        if(matchingItem){
            matchingItem.quantity+=selectorQunatityValue;
        }

        else{
            cart.push({
            productId : productId,
            quantity : selectorQunatityValue,
        });
        }
}


