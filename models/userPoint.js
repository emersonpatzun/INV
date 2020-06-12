module.exports = (sequelize, DataTypes) => {
  const userPoint = sequelize.define(
    "userPoint",
    {
      iduserPoint: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "userPoint",
      timestamps: false,
    }
  );

  userPoint.associate = function (models) {
    userPoint.belongsTo(models.user, {
      foreignKey: "iduser",
      as: "user",
    });
  };
  userPoint.associate = function (models) {
    userPoint.belongsTo(models.pointOfSale, {
      foreignKey: "idpointOfSale",
      as: "pointOfSale",
    });
  };

  return userPoint;
};
