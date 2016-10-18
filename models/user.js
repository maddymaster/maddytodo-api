var bcrypt = require('bcrypt');
var _ = require('underscore');

module.exports = function (sequelize, DateTypes) {
	return sequelize.define('user', {
		email: {
			type: DateTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		salt:{
			type: DateTypes.STRING
		},
		password_hash:{
			type: DateTypes.STRING
		},
		password: {
			type: DateTypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function (value) {
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash, hashedPassword');

			}
		}

	}, {
		hooks: {
			beforeValidate: function (user, options) {
				//user.email
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		}
	});

}