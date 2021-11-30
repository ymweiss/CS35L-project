const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost', //localhost
    user: 'root', //root
    password: "password", //password
    database: 'shop_app' //shop_app
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('App is listening on port ' + listener.address().port)
})


app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/users", (req, res) => {
    const insertQuery = "INSERT INTO users VALUES(4, 'user4', 'pass', 0.00);"
    db.query(insertQuery, req.body, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Added to Database");
        }
    });
});