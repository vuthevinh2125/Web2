//step1: import HTTP module(package)
const http = require('http')
//step2: set up web server
const server = http.createServer((request, response) => {
    //add content of the web
    response.write("<h1 style='color: red'>Hello World !</h1>")
    response.write("<h2 style='background-color: yellow'>That's enough. We take a short break here !</h2>")
    // this will be added later
    response.end()
})
//step3: define server port
const port = 3000       // 3000: default part for Node.JS
//step4: run web server (by listening port)
server.listen(port, () => {
    console.log("Web server is running at port " + port)
})

//test web server ??? nodemon server.js
