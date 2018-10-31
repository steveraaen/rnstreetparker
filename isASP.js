/*import aspDays from "./asp.js"
import aspDays19 from "./asp19.js"
import moment from "moment"*/

function fib(no) {
var arr = [0,1]
for (let i = 2; i < no; i++) {
	arr.push( arr[i - 1] + arr[i - 2])
}
console.log(arr)
console.log(typeof(true))
}
fib(8)
function FirstFactorial(num) { 
	var a, b
for(let i = num; i >=0; i--) {
	a = i * (i - 1)
	 console.log(a); 
}

 
         
} FirstFactorial(8)