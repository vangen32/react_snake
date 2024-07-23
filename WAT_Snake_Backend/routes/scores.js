const express = require('express');
const Score = require("../models/score");
const router = express.Router();

router.post('/create', async function(req, res, next) {
  console.log(req.body)
  if (!req.body.username || !req.body.score) {
    res.status(422).send({
      message: "Username or score are invalid"
    });
    return;
  }

  const score = {
    ...req.body
  };

  await Score.create(score)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Score."
      });
    });
});

router.get('/list', async function(req, res, next) {
  let page = parseInt( req.query.page, 10) - 1
  let limit = parseInt( req.query.limit, 10)
  if(isNaN(page))
    page = 0
  if(isNaN(limit))
    limit = 50
  if(typeof page !== 'number' || page < 0 )
    res.status(422).send({
      message : "Page must be a positive number"
    })
  if(typeof limit !== 'number' || limit < 0)
    res.status(422).send({
      message : "Limit must be a positive number"
    })

  await Score.findAll(
    {
      order: [['score', 'DESC']],
      limit: limit,
      offset : page * limit
    }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the Scores."
      });
    });
});


module.exports = router;
