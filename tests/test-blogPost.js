'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const {app, runServer, closeServer} = require ('../server');

chai.use(chaiHttp);

describe('createBlogPosts', function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

})