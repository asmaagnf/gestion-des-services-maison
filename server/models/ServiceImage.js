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

   

    return ServiceImage;
};
