// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// create an express app
const app = express();

// use body-parser middleware
app.use(bodyParser.json());

// use cors middleware
app.use(cors());

const posts = {};

// handle post request to /posts
app.post('/posts', async (req, res) => {
  // get data from request body
  const { title } = req.body;

  // create post object
  const post = { title };

  // add post object to posts object
  posts[post.id] = post;

  // send post object to event bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: post,
  });

  // send response
  res.status(201).send(post);
});

// handle post request to /events
app.post('/events', (req, res) => {
  // get data from request body
  const { type, data } = req.body;

  // log event type
  console.log(`Event received: ${type}`);

  // send response
  res.send({});
});

// listen on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000');
});
