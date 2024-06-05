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
        type: DataTypes.ENUM('en cours', 'refusé', 'complété'),
        defaultValue: 'en cours',
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
        Demande.hasMany(models.Message);
    Demande.belongsTo(models.ChatRoom, { foreignKey: 'chatRoomId' });
  };
  return Demande;
};