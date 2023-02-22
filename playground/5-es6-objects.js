//object property shorthand syntax
const name = 'HSamoen'
const userAge = 23

const user = {
    name, //<--shorthand syntax: needs to be defined above
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

//with default parameter
const transaction = (type, {label, stock = 0} = {}) => {
    console.log (type,label,stock)   
 }

transaction('order', product)
// transaction('order')