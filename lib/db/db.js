var mysql =require('mysql');
var conn =  mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"Chatbot"
});

conn.connect(function(err)
{
  if(err)
  {
    console.log('connection unsuccessful', err);
  }
  console.log('connection successfull');
})

module.exports = conn;
