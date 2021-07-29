import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('connected')
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        console.log('received: %s', message);
        wss.clients.forEach(client => {
            if (client != ws) {
                client.send(message);
            }    
        });
    });
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    const address = server.address() as WebSocket.AddressInfo;
    console.log(`Server started on port ${address.port}`);
});