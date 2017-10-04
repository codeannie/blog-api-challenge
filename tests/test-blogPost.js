'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require ('../server');
const should = chai.should();
const uuid = require('uuid');

chai.use(chaiHttp);

describe('Blog API', function() {
  const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
  //start the server before tests start
  before(function() {
    return runServer();
  });
  //stop server after tests are done 
  after(function() {
    return closeServer();
  });

  //Test GET all blog posts 
  it('should list all blog posts on GET request', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        res.body.forEach(function(post) {
          post.should.be.a('object');
          post.should.include.keys(expectedKeys);
        });
      });
  });

  //Test POST a new blog post
  it('should post a new blog post on POST request', function() {
    let newPost = {
      title : 'Testing POST request',
      content : 'I hope this works',
      author : 'Joe Bruin',
      publishDate : '10/03/2017'
    };
    return chai.request(app)
      .post('/blog-posts')
      .send(newPost)
      .then(function(res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.include.keys(expectedKeys);
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newPost, {id:res.body.id}));
      });
  });

  //Test PUT on existing blog post 
  it('should update an existing blog post on PUT request', function() {
    const updatePost = {
      title : 'We are updating with PUT!',
      content : 'I hope this changed with PUT'
    };
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        updatePost.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-posts/${updatePost.id}`)
          .send(updatePost);
      })
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.deep.equal(updatePost);
      });
  });  

  //Test DELETE an existing blog post 
  it('should remove an existing blog post on DELETE request', function () {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});