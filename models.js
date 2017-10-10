'use strict';

const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema ({
  author: {firstName: String, lastName: String},
  title: String,
  content: {type: String}, //what's the difference in syntax for title vs content? 
  created: {type: Date, default: Date.now},
});

const blogPosts = mongoose.model(blogPosts, blogPostSchema);
//should this be {blogPosts} ? 
module.exports = blogPosts;