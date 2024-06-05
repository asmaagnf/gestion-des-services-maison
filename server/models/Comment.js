module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Service, {
        foreignKey: 'ServiceId',
        as: 'service',
      });
      Comment.belongsTo(models.users, {
        foreignKey: 'UserId',
        as: 'user',
      });
    };
  
    return Comment;
  };