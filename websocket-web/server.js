const express = require('express');
const path = require('path');
const cors = require('cors');

// configura os protocolos http e wss
const app = express();
const server = require('http').createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
    // cors: {
    //     origin: "http://localhost:8100",
    //     methods: ["GET", "POST"],
    //     transports: ['websocket', 'polling'],
    //     credentials: true
    // },
    allowEIO3: true
});
// const io = require('socket.io')(server);

// definir pasta dos arquivos do projeto frontend
app.use(express.static(path.join(__dirname, 'public')));

// configurar node para utilizar html
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// quando acessar o endereço padrão do app, renderizar a index.html
app.use('/', (req, res) => {
    res.render('index.html');
});

// emula um DB para enviar mensagens anteriores quando um socket novo se conecta
let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('receivedMessage', {user: 'CHAT', message: 'Bem vindo!'})
    socket.emit('previousMessages', messages);

    socket.on('disconnect', () => {
        console.log(`User desconectado: ${socket.id}`);
    });

    // front ta enviando o evento de nome 'chat message'
    socket.on('chat message', (msg) => {
        messages.push(msg);
        console.log('Message: ', msg)
        
        // socket.emit (mensagem exclusivamente para esse socket.id); .on (ouvir uma mensagem); .broadcast.emit (envia para todos os sockets conectados na aplicacao)
        socket.broadcast.emit('receivedMessage', msg)
    })
})

server.listen(3000, () => {
    console.log('listening on 3000')
});
