var conn = require("../db/db");
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
module.exports = {
  login: function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("login", { errors: errors.array() });
    } else {
      //get inputed username and password
      var username = req.body.email;
      var password = req.body.password;
      //check if username and password match with database table
      conn.query(
        `SELECT * FROM user WHERE username = ? and password =?`,[username, password],
        (err, rows, fields) => {
          if (rows != "") {
            var user = {
              id:rows[0].id,
              name:rows[0].name,
              username: rows[0].username,
              password: rows[0].password,
              phone: rows[0].phone
            };
            //generate JWT token with secret key
            jwt.sign(
              { user },
              "super-secret",
              { expiresIn: "1h" },
              (err, token) => {
                if (err) {
                  console.log(err);
                } else {
                  res.cookie("authorization", token);
                  res.status(200).json(token);
                }
              }
            );
          } else {
            res.status(401).json("Username or password is not correct..!");
            // res.render('login',{er: "Authentication failed..!"});
          }
        }
      );
    }
  },
  signup: function(req, res) {
    const data = {
      name: req.body.fname,
      password: req.body.password,
      username: req.body.email,
      phone: req.body.phone
    };
    conn.query("Insert into user set ?", data, function(err, result, fields) {
      if (err) {
        res.status(500).json({ code: "not found", message: "data not found" });
      } else {
        res
          .status(200)
          .json({ code: 200, message: "Data successfully insert" });
      }
    });
  },
  sendMessage: function(req,res) {
    const data = {
      sender_id: req.body.senderid,
      reciever_id: req.body.reciverid,
      message: req.body.message,
    };
    console.log(data)
    conn.query("Insert into chatting set ?", data, function(err, result, fields) {
      if (err) {
        res.status(500).json({ code: "not found", message: "data not found" });
      } else {
        res
          .status(200)
          .json({ code: 200, message: "Data successfully insert" });
      }
    });
  },
  Getchat: function(req, res) {
    const query = `select * from chatting where sender_id=? or reciever_id=? `;
    conn.query(query, [req.body.sender_id, req.body.sender_id],function(err, row) {
      if (err) {
        res
          .status(500)
          .json({ code: "Something went wrong", data: "Data not insert" });
      } else {
        console.log(row)
        res
          .status(200)
          .json({ code: "Data insert", data: row });
      }
    });
  },
  GetUsers: function(req, res) {
    const query = `select * from user`;
    conn.query(query, function(err, row) {
      if (err) {
        res
          .status(500)
          .json({ code: "Something went wrong", data: "Data not insert" });
      } else {
        res
          .status(200)
          .json({ code: "Data insert", data: row });
      }
    });
  },
};
