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
    password: "kn1ght21", //use password for your mysql database
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
				console.log("false");
				res.send({isLoggedIn: false});
			}
			
			else {
				console.log("true");
				res.send({isLoggedIn: true});
			}

	});
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const check = "SELECT username , password FROM logininfo WHERE username = ?"; //check if the user exist

    db.query(check, username, 
        (err, result) => {
            if(err){
                console.log("error: ", err);
            }
            
            else if (result.length === 0){
				const count = "SELECT COUNT(*) FROM logininfo";
				db.query(count, (err_1, result_1) => {
					const id = result_1[0]['COUNT(*)'] + 1;
					const stmnt = "INSERT INTO logininfo (id, username, password) VALUES (?, ?, ?)";
					db.query(stmnt, [id, username, password], (err_2, result_2) => {
						if(err_2){
							console.log(err_2);
						}
                    
						res.send(req.body);
					});
				});
			}

    });
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

