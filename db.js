import mysql from "mysql2"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "blog_db"
});

connection.connect((err) => {
    if(err){
        return console.log(err);
    }
    console.log(`Connection to blog_db done`);
})

export default connection;