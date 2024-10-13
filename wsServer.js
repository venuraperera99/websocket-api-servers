const WebSocket = require('ws');

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Track connected clients
const clients = new Set();

// Handle new connection
wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('New client connected');
  
  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log('Received from client:', message);
    
    // Broadcast the message to all clients
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle socket disconnection
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
  
  // Send initial message to the new client
  ws.send('Welcome to WebSocket server!');
});
