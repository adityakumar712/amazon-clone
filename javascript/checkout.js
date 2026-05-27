import {renderOrderSummary} from '../javascript/checkout/ordersummary.js';
import {renderPaymentSummary} from './checkout/paymentsummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';
import {loadProductsFetch }  from '../data/products.js';
import { loadCart } from '../data/cart.js';

// new Promise((resolve)=>{
 
//  loadProducts(()=>{
//     resolve();

//  });
// }).then(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
    
// })


//do the same thing as  nested callback using promises.
// new Promise((resolve)=>{
//     loadProducts(()=>{
//        resolve('value1');
//     });

// }).then((value)=>{
//     console.log(value);
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//     });

//     }).then(()=>{
//         renderCheckoutHeader();
//         renderOrderSummary();
//         renderPaymentSummary();
//     });





// do the same thing above using promise(inbuilt class)
// this is callback.
// loadProducts(()=>{
//     loadCart(()=>{
//         renderCheckoutHeader();
//         renderOrderSummary();
//         renderPaymentSummary();

//     });
   

// });


// we can run only one promise at a time. but now we can run multiple promises at a time by using promise.all().
/*
Promise.all([
   loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
 }),

]).then((value)=>{
    console.log(value);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    })

*/
  
 
//Now we are using Async it is a better way to handle the asynchronous code.
//it reduces the code from promises like writing new promise()
//and writing resolve().

async function loadPage(){

    await loadProductsFetch();

    await new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
 });

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();

}

loadPage();