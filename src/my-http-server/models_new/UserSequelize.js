const { getSequelize, getDataTypes } = require("../db/sequelize");

const UserModel = () => {
    const sequelize = getSequelize();
    const DataTypes = getDataTypes();

    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "users",
            timestamps: false,
        },
    );

    return User;
};

module.exports = UserModel;
