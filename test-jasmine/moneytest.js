import {formatCurrency} from '../javascript/utility/money.js';

describe('test suite: formatCurrency' , ()=>{
    it('converts cents into dollars' , ()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('work with zero' , ()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('round up to the nearest cent' , ()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
    
    it('work with negative value' , ()=>{
        expect(formatCurrency(-504.61)).toEqual('-5.05');
    });
});