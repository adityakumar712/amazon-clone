import {formatCurrency} from '../javascript/utility/money.js';


console.log('testing with Zero');

if(formatCurrency(0) === '0.00'){
    console.log('Test Passed');
} else {
    console.log('Test Failed');
}

console.log('testing with normal value');

if(formatCurrency(1920) === '19.20'){
    console.log('Test Passed');
} else {
    console.log('Test Failed');
}

console.log('testing with edge case value');
if(formatCurrency(199) === '1.99'){
    console.log('Test Passed');
} else {
    console.log('Test Failed');
}


console.log('testing with edge case value point');
if(formatCurrency(1.9930) === '1.99'){
    console.log('Test Passed');
} else {
    console.log('Test Failed');
}
