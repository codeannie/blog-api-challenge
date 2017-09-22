'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
  { 
    id: uuid.v4(),
    title: 'Post 1',
    content: 'This is the first post',
    author: 'Natsumi',
    publishDate: Date.now()
  });

BlogPosts.create(
  { 
    id: uuid.v4(),
    title: 'Post 2',
    content: 'This is the second post post',
    author: 'Natsumi',
    publishDate: Date.now()
  });
