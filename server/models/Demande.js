module.exports = (sequelize, DataTypes) => {
const Demande = sequelize.define('Demande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
      },
      adresse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taille: {
        type: DataTypes.STRING,
        allowNull: false,
    }
      });
      Demande.associate = (models) => {
        Demande.belongsTo(models.Service); 
        Demande.belongsTo(models.users, { foreignKey: 'userId' });
      };
  return Demande;
};