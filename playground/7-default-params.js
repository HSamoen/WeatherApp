//allows us to set a default value for a function parameter should no argument be passed in
const greeter = (name = 'user', age) => {
    console.log('Hello ' + name)
}

greeter('HSamoen')
greeter()