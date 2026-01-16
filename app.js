import express from "express"
import connection from "./db.js";
import blogRouter from "./routers/blog.js";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Server is listening on port", port);
    }
})

app.use("/posts", blogRouter);



