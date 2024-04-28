
// models/Subcategory.js
module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Subcategory.associate = (models) => {
        Subcategory.hasMany(models.Service);
    };

    return Subcategory;
};
