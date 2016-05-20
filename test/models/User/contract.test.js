var expect = require("chai").expect;
var models = require('../../../models');


describe('user creation', function(){

  beforeEach(function(done) {
    models.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it('should create a contract for a user', function(done){
  	var user;
    models.User.create({ facebook_id: '1' }).then(function(u) {
      user = u;
      return user.createContract({title: "Sample Contract", description: "Sample contract description."})
    }).then(function() {
    	return user.getContracts();
    }).then(function(contracts) {
    	expect(contracts.length).to.equal(1);
    	expect(contracts[0].title).to.equal("Sample Contract");
    	done();
    });
  });

});