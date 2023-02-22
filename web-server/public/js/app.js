const weatherForm = document.querySelector('form')
//to wire up client side javascript code
const search = document.querySelector('input')
//gives us access to 'search'
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents default refreshing

    const location = search.value //extracts input value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => { 
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
//takes input/request from browser --> fetch from server --> returns back to browser