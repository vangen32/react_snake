const { DataTypes, Model } = require('sequelize');
const db = require("../db/db")

class Score extends Model {}

Score.init({
    id : {
      type : DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true
    },
    username : {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : "Username"
    },
    score : {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue: 0
    }
  },
  {
    sequelize : db.sequelize,
    modelName: 'Scores',
  })

module.exports = Score;