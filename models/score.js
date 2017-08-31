module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    name: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
        len: [1]
      }
    });
  return Post;
};
