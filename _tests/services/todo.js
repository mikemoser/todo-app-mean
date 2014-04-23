var testHelper = require('../test-helper');
var Services = require('../../services');
var Models = require('../../models')
var should = require('should');

describe('Todo Service', function () {
  describe('create', function () {
    var user = null;
    before(function (done) {
      // Setup test user
      user = new Models.User({ 
        username: 'test user', 
        password: '123' 
      });

      user.save(function (error) {
        done();
      });
    });

    it('should create a new todo', function (done) {
      Services.Todo.create(user._id, { 
        description: 'my test todo'
      })
      .then(function (todo) {
        should.exist(todo);
        done();
      }, function (error) {
        should.not.exist(error);
        done();
      })
    });
  });

  describe('update', function () {
    it.skip('should update the todo')
  })

  describe('delete', function () {
    it.skip('should update the todo')
  })
  
  describe('getTodosByUserId', function () {
    it.skip('should return all todos for a given user');
  })
});