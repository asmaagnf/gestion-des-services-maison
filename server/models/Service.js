// models/Service.js
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        yearsOfExperience: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Service.associate = (models) => {
        Service.hasMany(models.ServiceImage, {  onDelete: "CASCADE" });
      
    };

    return Service;
};
