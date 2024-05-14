// models/Reclamation.js

module.exports = (sequelize, DataTypes) => {
    const Reclamation = sequelize.define("Reclamation", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Reclamation.associate = (models) => {
        Reclamation.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
    };

    return Reclamation;
};
