const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());
app.use(logger);

// Simulated in-memory data
let resources = {};
let resourceId = 1;

// CREATE Resource
app.post('/resources', (req, res) => {
  const { name, value } = req.body;
  if (!name || !value) {
    return res.status(400).json({ error: 'Name and value are required' });
  }
  const id = resourceId++;
  resources[id] = { id, name, value };
  res.status(201).json({ message: 'Resource created', resource: resources[id] });
});

// READ Resource
app.get('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resource = resources[id];
  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.status(200).json({ resource });
});

// DELETE Resource
app.delete('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!resources[id]) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  delete resources[id];
  res.status(200).json({ message: 'Resource deleted' });
});

app.listen(3000, () => {
  console.log('RESTful API server running on port 3000');
});
