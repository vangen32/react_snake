const createError = require('http-errors');
const express = require('express');
const db = require('./db/db.js')
const dotenv = require("dotenv");
dotenv.config();


const indexRouter = require('./routes/scores');
const cors = require("cors");
const dbConfig = require("./db/config");

const app = express();
app.use(cors({
  origin : "*"
}));

console.log("########################################################")
console.log({...db.sequelize.options,
  db_name : dbConfig.DB,
  db_user : dbConfig.USER,
  db_password : dbConfig.PASSWORD
})
console.log("########################################################")
db.sequelize.sync(/*{ force: process.env.NODE_ENV !== "production" }*/)
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.use(express.json());
app.use('/scores', indexRouter);

app.listen(3000, ()=>{
  console.log("App started successful on port " + 3000)
})
