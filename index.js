const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shop_app"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

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


app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const check = "SELECT username , password FROM logininfo WHERE username = ? and password = ?"; //check if the user exist
    
    db.query(check, [username, password], 
        (err, result) => {
            if(err){
                console.log("error: ", err);
            }
            
            else if (result.length === 0){
               
                const stmnt = "INSERT INTO logininfo (username, password) VALUES (?, ?)";
                db.query(stmnt, [username, password], (err_1, result_1) => {
                    if(err_1){
                        console.log(err_1);
                    }
                    
                    res.send(req.body);
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
