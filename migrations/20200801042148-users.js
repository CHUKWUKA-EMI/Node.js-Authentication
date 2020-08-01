"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			"Users",
			{
				id: {
					type: Sequelize.UUID,
					primaryKey: true,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
				},
				firstname: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						min: {
							msg: "Name must be a minimum of 3 characters",
							args: [3],
						},
					},
				},
				lastname: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						min: {
							msg: "Name must be a minimum of 3 characters",
							args: [3],
						},
					},
				},
				username: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
					validate: {
						min: {
							msg: "username must be a minimum of three characters",
							args: [3],
						},
					},
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						min: {
							msg: "username must be a minimum of six characters",
							args: [6],
						},
					},
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
					validate: {
						isEmail: true,
					},
				},
			},
			{ timestamps: false }
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Users");
	},
};
