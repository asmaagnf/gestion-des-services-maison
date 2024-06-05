module.exports = (sequelize, DataTypes) => {
    const ChatRoom = sequelize.define('ChatRoom', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          }
    });

  ChatRoom.associate = (models) => {
    ChatRoom.hasMany(models.Message, { onDelete: 'CASCADE' });
    ChatRoom.belongsTo(models.users, { as: 'client', foreignKey: 'clientId' });
    ChatRoom.belongsTo(models.users, { as: 'pro', foreignKey: 'proId' });
  };

  return ChatRoom;
};