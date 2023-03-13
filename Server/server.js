const express = require('express');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 8080

const app = express();
const server = http.createServer(app);

require('./socketIo')(server)

app.use(cors());

app.get('/', (req, res) =>{
    res.status(200).send('Sever Initialized and Online. Ready to take OFF!');
});

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
