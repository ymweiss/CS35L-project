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


app.post("/shopping", 
    (req, res) => {
        console.log(req.body);
        const id = req.body.props.id;
        const name = req.body.props.name;
        const price = req.body.props.price;

        const stmnt = "INSERT INTO shopcart VALUES (?, ?, ?)";
        db.query(stmnt, [id, name, price], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.send(result);
            }
        })

    }
);

app.post("/increase", (req, res) => {
    const id = req.body.props.id;
    const name = req.body.props.Name;
    const stmnt = "SELECT * FROM shopcart " + 
        "WHERE id = ? and name= ?";
    db.query(stmnt, [id, name], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            if(result){
                db.query("INSERT INTO shopcart VALUES (?, ?, ?)", [result[0].id, result[0].name, result[0].price] , 
                (err_1, result_1) => {
                    if(err){
                        console.log(err_1);
                    }
                    else {
                        res.send(result_1);
                    }
                });
            }
            
        }
        
    });
});

app.post("/decrease", (req, res) => {
    const id = req.body.props.id;
    const name = req.body.props.Name;
    console.log(req.body);
    const stmnt = "DELETE FROM shopcart " + 
        "WHERE id = ? and name = ? " + 
        "LIMIT 1";
    db.query(stmnt, [id, name], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get("/deletecart", (req, res) => {
    const stmnt = "DELETE FROM shopcart";
    db.query(stmnt, (err, result) => {
        if(err){
            console.log(err);
        
        }
        else{
            console.log(result);
            res.send(result);
        }
        
    });
});

app.post("/search", 
    (req, res) => {
        let cat = req.body.category;
        let search = req.body.search.toLowerCase();
        if(search.length > 0){
            let result = [];
            console.log(search, cat);

            const stmnt = "SELECT * FROM " + cat + 
            " WHERE name LIKE '%" + search + "%'";
            db.query(stmnt, (err, result) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.send(result);
                    console.log(result);
                }
            })
            
        }
        
        
    });

app.get("/cart", 
    (req, res) => {
        const stmnt = "SELECT id , name AS Name, COUNT(*) AS Quantity," + 
        "ROUND(SUM(price), 2) AS Price " +
        "FROM shopcart " + 
        "GROUP BY id, name";
        db.query(stmnt, (err, result) => {
            if(err){
                console.log(err);

            }
            else{
                
                res.send(result);
            }
        })
        
});

app.post("/categories", 
    (req, res)=>{
    
        const categ = req.body.category;
        console.log(categ);

        if(categ === "produce"){
            const stmnt = "SELECT * FROM produce" ;
        
            db.query(stmnt, (err, result) => {
                if(err){
                    console.log("error: ", err);
                }
                else{
                    console.log(result);
                    res.send(result);
                }
                
            });
        }

        if(categ === "dairy"){
            const stmnt = "SELECT * FROM dairy" ;
        
            db.query(stmnt, (err, result) => {
                if(err){
                    console.log("error: ", err);
                }
                else{
                    console.log(result);
                    res.send(result);
                }
                
            });
        }

        if(categ === "meat"){
            const stmnt = "SELECT * FROM meat" ;
        
            db.query(stmnt, (err, result) => {
                if(err){
                    console.log("error: ", err);
                }
                else{
                    console.log(result);
                    res.send(result);
                }
                
            });
        }

        if(categ === "pantry"){
            const stmnt = "SELECT * FROM pantry" ;
        
            db.query(stmnt, (err, result) => {
                if(err){
                    console.log("error: ", err);
                }
                else{
                    console.log(result);
                    res.send(result);
                }
                
            });
        }

        if(categ === "bakery"){
            const stmnt = "SELECT * FROM bakery" ;
        
            db.query(stmnt, (err, result) => {
                if(err){
                    console.log("error: ", err);
                }
                else{
                    console.log(result);
                    res.send(result);
                }
                
            });
        }
        
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

