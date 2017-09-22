'use strict';

const express = require('express');
const morgan = require('morgan');

//create new express app
const app = express();
//export modules in order to use it
const blogPostRouter = require('./blogPostRouter');
//logs http layer
app.use(morgan('common'));

app.get('/blog-post', (req, res) => {
  res.json(BlogPost.get());
});

app.use('/blog-post', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

