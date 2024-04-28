module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          role: {
            type: DataTypes.ENUM('client', 'pro', 'admin'),
            allowNull: false,
            defaultValue: 'client'
          },
          adresse: {
            type: DataTypes.STRING, // You can use a more specific data type like POINT for geographic coordinates
            allowNull: true // Location can be null for clients who choose not to provide it
          },
          image: {
            type: DataTypes.STRING, // Store the image path or URL
            allowNull: true // Image can be null for clients, but not for sellers
          },
          code_postal: {
            type: DataTypes.STRING,
            allowNull: true 
          }
        });
        users.associate = (models) => {
          users.hasMany(models.Service, {onDelete: "CASCADE" });
      };
  
    return users;
  };