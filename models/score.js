module.exports = function(sequelize, DataTypes)
{
  var Score = sequelize.define("Score", {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    word: {
      type: DataTypes.STRING
    }

  },
{
  timestamps: false
});
Score.associate = function(models)
{
    Score.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
}
  return Score;
};
