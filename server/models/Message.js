module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.ChatRoom, { foreignKey: 'ChatRoomId' });
    Message.belongsTo(models.users, { as: 'sender', foreignKey: 'senderId' });
  };

  return Message;
};