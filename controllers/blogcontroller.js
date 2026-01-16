import connection from "../db.js";


function index(req, res){
    const query = `
    select * 
    from posts`;

    connection.query(query, (err, results) => {
        if(err){
            return res.status(500).json({
                message: "internal error",
            })
        }

        res.json(results[0]);
    })
}