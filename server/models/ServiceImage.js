// models/ServiceImage.js
module.exports = (sequelize, DataTypes) => {
    const ServiceImage = sequelize.define('ServiceImage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    ServiceImage.associate = (models) => {
        ServiceImage.belongsTo(models.Service); // Define the association to Service
    };
   

    return ServiceImage;
};
