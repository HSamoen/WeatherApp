//Section 6: 39.ES6 Aside: Object property shorthand and destructuring

//object property shorthand syntax

const name = 'HSamoen'
const userAge = 23

const user = {
    name, //<--shorthand syntax: however needs to be defined above
    age: userAge,
    location: 'Charlotte'
}

console.log(user)

//object destructuring
//destructuring syntax: extract object properties and values into individual variables

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

// // const label = product.label
// // const stock = product.stock

// const {label: productLabel, stock, rating = 5} = product //<--object we are trying to destructure
// console.log(productLabel) //<--renaming varibale
// console.log(stock)
// console.log(rating)

// const transaction = (type, {label, stock}) => {
//    console.log (type,label,stock)
// }

//with default parameter
const transaction = (type, {label, stock = 0} = {}) => {
    console.log (type,label,stock)   
 }

transaction('order', product)
// transaction('order')