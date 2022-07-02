const http = require("http");

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json'});

    if(request.url === "/users"){
        response.end(JSON.stringify({
            message: "Caiu em users"
        }))
    }

    if(request.url === "/menu"){
        response.end(JSON.stringify({
            message: "rota menu"
        }))
    }
    // response.end(JSON.stringify({
    //     message: "Hello, world!"
    // }))
}).listen(4001, () => console.log("Server online, port 4001"))