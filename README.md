## Part 2: Follow-Up Questions

### Architecture Explanation
- **WebSocket Server**: The WebSocket server is capable of handling multiple connections and broadcasting messages to all connected clients except the one that sent the message. This is achieved by using the `ws` library and keeping track of clients in a `Set`. The server listens for incoming connections and `message` events to handle broadcast functionality.
  
  **Why this approach**: Using `Set` ensures efficient management of connections since clients can easily be added and removed, and the `broadcast` pattern is simple for real-time communication scenarios like chat applications.

- **RESTful API Server**: The API server uses the `express` framework for handling different HTTP methods such as POST, GET, DELETE with routes to manage resources. Each endpoint performs a specific task: create, read, or delete a resource. The in-memory `resources` object simulates a database, and resources are stored with a unique `id` for identification.

  **Why this approach**: Express is a minimal framework that allows for easy setup of RESTful APIs. By splitting the CRUD operations into separate routes, the API remains modular and easy to maintain. In a production environment, this could be extended with a SQL or NoSQL database for persistent storage.

### Design Decisions
- **Modular structure**: Code is organized into separate files for the WebSocket server, API server, and logging. This improves maintainability and allows each component to be developed and scaled independently.
- **Error Handling**: REST API endpoints handle errors such as missing data or invalid resource requests by returning proper HTTP status codes. In WebSockets, disconnections are handled according to best practices.

### Libraries Used
- **ws**: A lightweight WebSocket library to handle real-time connections.
- **express**: Provides a simple way to set up HTTP servers and manage routes.
- **morgan**: Logs HTTP requests for better debugging and auditing.

### Scalability and Future Extensions
- **For the WebSocket Server**: Additional functionality like user authentication, message queues, and chat rooms could be added to scale the server for more complex real-time interactions.
  
- **For the RESTful API Server**: The API could be extended to handle PUT requests, pagination for resource lists, and connection to a database for persistent storage. Error handling could also be enhanced with more specific responses based on different error types.

