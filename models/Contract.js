module.exports = function(sequelize, DataTypes) {

	var Contract =  sequelize.define('Contract', {
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		description: DataTypes.STRING,
		title: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Contract.belongsTo(models.User);
				/*
				User.belongsToMany(User, {
				    as: "Friends",
				    through: "Friend",
				    foreignKey: 'user',
				    otherKey: 'friend'
				});
				*/
			}
		}
	});

	return Contract;
};