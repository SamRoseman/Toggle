module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fbId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      }
    },
  {
    timestamps: false
  });
  User.associate = function(models)
  {
    // User.hasMany(models.Score, {
    //   onDelete: "cascade"
    // });
  }
  return User;
};
