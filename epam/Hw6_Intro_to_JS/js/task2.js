let a = +prompt('enter first side length');
let b = +prompt('enter second side length');
let c = +prompt('enter third side length');

if (a === b && b === c) {
    console.log('Equivalent triangle');
} else if (a === b || b === c || c === a) {
    console.log('Isosceles triangle');
} else if (a < b + c && b < a + c && c < a + b) {
    console.log('Normal triangle');
} else {
    console.log("Triangle doesn't exist")
}