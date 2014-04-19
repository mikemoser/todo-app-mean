var testHelper = require('../test-helper');
var Services = require('../../services');
var should = require('should');

describe('User Service', function () {
  describe('create User', function () {
    it('should create a valid user', function (done) {
      Services.User.create('michael moser', 'password')
      .then(function (user) {
        should.exist(user);
        done();
      }, function (error) {
        should.not.exist(error);
        done();
      })
    });
    it.skip('should hash the password')
    it.skip('should not insert duplicate usernames')
    it.skip('should validate usernames')
    it.skip('should validate password')
  });
  describe('create User', function () {
    it.skip('should authenticate a value username and password')
    it.skip('should not authenticat an invalid username')
    it.skip('should not authenticat an invalid password')
  });
});