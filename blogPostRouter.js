'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuid = require('uuid');

const {BlogPosts} = require('./models');

BlogPosts.create(
  { 
    id: uuid.v4(),
    title: 'Post 1',
    content: 'This is the first post',
    author: 'Natsumi',
    publishDate: '10/01/2017'
  });

BlogPosts.create(
  { 
    id: uuid.v4(),
    title: 'Post 2',
    content: 'This is the second post',
    author: 'Natsumi',
    publishDate: '10/02/2017'
  });

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const blogPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(blogPost);
})

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  const updatedBlogPost = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.id}\``);
  res.status(204).end();
});

module.exports = router; 