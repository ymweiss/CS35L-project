const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
//const login = require('./Login');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", //use password for your mysql database
    database: "shop_app"
});
/*
db.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});
*/

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


app.post("/login", (req, res) => {
	console.log("login");
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const check = "SELECT username , password FROM logininfo WHERE username = ? and password = ?"; //check if the user exist

    db.query(check, [username, password], 
        (err, result) => {
            if(err){
                console.log("error: ", err);
            }
            
            else if (result.length === 0){
				
                const stmnt = "INSERT INTO logininfo (id, username, password) VALUES (?, ?, ?)";
                db.query(stmnt, [id, username, password], (err_1, result_1) => {
                    if(err_1){
                        console.log(err_1);
                    }
                    
                    res.send(req.body);
                });
            }

    });
	res.end();
});


app.listen(3001, (err) => {
    if(err){
        console.log("error: ", err);
    }
    console.log("running on port 3001");
    
});


app.set('view engine', 'ejs')
//app.use(expressLayouts);

app.get('/', function (req, res) {
  res.render('index', {});
});

