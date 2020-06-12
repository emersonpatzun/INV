module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      iduser: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );

  user.associate = function (models) {
    user.hasMany(models.roleUser, {
      foreignKey: "iduser",
      as: "roleUser",
    });
  };

  user.associate = function (models) {
    user.hasMany(models.userPoint, {
      foreignKey: "iduser",
      as: "userPoint",
    });
  };

  user.associate = function (models) {
    user.hasMany(models.transaction, {
      foreignKey: "iduser",
      as: "transaction",
    });
  };

  return user;
};
