module.exports = function(sequelize, DataTypes) {

	var User =  sequelize.define('User', {
		facebook_id: { type: DataTypes.STRING, primaryKey: true  },
		facebook_access_token: DataTypes.STRING,
		facebook_refresh_token: DataTypes.STRING,
		email: DataTypes.STRING,
		name: DataTypes.STRING
	}/*, {
		classMethods: {
			associate: function(models) {
				User.hasMany(models.QuizDescriptor);
			}
		}
	}*/);

	return User;
};