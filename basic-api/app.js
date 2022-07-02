const express = require("express");
const { randomUUID } = require("crypto")
const app = express();

//.use serve como um midway entre a requisição e a aplicação
app.use(express.json())

const products = [];
// nome e preco

// params (parametro de rota) => /products/12312
// query (não obrigatórios) => /product?id=221&value=12312
app.post("/products", (request, response) => {
    console.log(request.body);

    const { name, price } = request.body;
    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product);

    return response.json({
        message: "inserido",
        data: product
    });
})

app.get("/products", (request, response) => {
    return response.json(products);
})

app.get("/products/:id", (request, response) => {
    const id = request.params.id;
    const res = products.find(x => x.id === id);

    return response.json(res);
});

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    let index = products.findIndex(x => x.id === id);

    if (index) {
        products[index] = {
            ...products[index],
            name,
            price
        }
        return response.json({ message: "alterado" })
    } else {
        return response.json("erro")
    }
});

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;

    const index = products.findIndex(x => x.id === id);

    if (index) {
        products.splice(index, 1);
        return response.json({ message: "removido" })
    } else {
        return response.json({ message: "erro" })
    }
})

app.listen(4002, () => console.log("rodando na 4002"));