const http = require('http')
const server = http.createServer((req, res) => {
    //display home page
    if (req.url == '/') { 
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write("This is homepage.PM76")
    }

    else if (req.url == '/student') { 
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write("This is student Page.")

    }

    //display admin page
    else if (req.url == '/admin') { 
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write("This is admin page")
    }
    
    
    else if (req.url == '/data') { 
        res.writeHead(200, {'Content-Type' : 'application/json'})
        const products = [
            {
                "message" : "Hello World JSON",
                
            },
            
        ]
        res.write(JSON.stringify(products))
    }
    else  { 
        res.writeHead(404, {'Content-Type' : 'text/html'})
        res.write("Invalid Request!")
    }
    //end the response (never forget it)
    res.end()
}).listen(8080, () => {
    console.log("Server is running at http://localhost:8080")
})  