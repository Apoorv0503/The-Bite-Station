import {sum} from "../Components/sum1.js"

test("Sum function should caculate the sum of two numbers correctly", ()=>{
    const result=sum(2,4);

    expect(result).toBe(6);
});

