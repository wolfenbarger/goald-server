var expect = require("chai").expect;
var models = require('../../../models');


describe('user creation', function(){

  beforeEach(function(done) {
    models.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it('should create a new user', function(done){
	  var testUser = { 
	    facebook_id: '1',
	  }
    models.User.create(testUser).then(function(user) {
      expect(user.facebook_id).to.equal(testUser.facebook_id);
      done();
    });
  });

  it('should create two new users', function(done){
	  var testUser1 = { 
	    facebook_id: '1',
	  }
	  var testUser2 = { 
	    facebook_id: '2',
	  }
    models.User.create(testUser1).then(function() {
	    models.User.create(testUser2).then(function() {
	      models.User.findAll().then(function(users) {
	      	expect(users.length).to.equal(2);
	      	done();
	      });
	    });
    });
  });

});