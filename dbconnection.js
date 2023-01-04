var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: '',      
  database: 'moon' 
}); 
 
//connection done with sorting asc and dec
    conn.connect(function(err) {
      if (err) throw err;
      //conn.query("SELECT * FROM students ORDER BY name DESC", function (err, result, fields)
      conn.query("SELECT * FROM users ORDER BY name", function (err, result, fields) {
       if (err) throw err;
      console.log(result);
      });
    });


module.exports = conn;