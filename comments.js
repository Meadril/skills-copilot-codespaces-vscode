// Create web server
const express = require('express');
const app = express();

// Create a middleware to parse the request body
app.use(express.json());

// Create a variable to store comments
const comments = [];

// Create a route to get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Create a route to get a single comment
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  res.send(comment);
});

// Create a route to create a comment
app.post('/comments', (req, res) => {
  if (!req.body.message) return res.status(400).send('Message is required.');
  const comment = {
    id: comments.length + 1,
    message: req.body.message
  };
  comments.push(comment);
  res.send(comment);
});

// Create a route to update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  if (!req.body.message) return res.status(400).send('Message is required.');
  comment.message = req.body.message;
  res.send(comment);
});

// Create a route to delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.send(comment);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));