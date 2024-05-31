// Server/models/Comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Service, { foreignKey: 'ServiceId' }); // Un commentaire appartient à un service
        Comment.belongsTo(models.users, { foreignKey: 'UserId' }); // Un commentaire est écrit par un utilisateur
    };

    return Comment;
};
