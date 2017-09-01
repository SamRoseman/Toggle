module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
        len: [1]
      }
    },
  {
    timestamps: false
  });
  User.associate = function(models)
  {
    User.hasMany(models.Score, {
      onDelete: "cascade"
    });
  }
  return User;
};
