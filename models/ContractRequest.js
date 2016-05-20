module.exports = function(sequelize, DataTypes) {

	var ContractRequest =  sequelize.define('ContractRequest', {
		request_for: { type: DataTypes.STRING, unique: 'compositeIndex' },
		contract_id: { type: DataTypes.STRING, unique: 'compositeIndex' },
		request_from: { type: DataTypes.STRING },
		accepted: { type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function(models) {
			}
		}
	});

	return ContractRequest;
};