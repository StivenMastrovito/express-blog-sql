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

        res.json(results);
    })
}

function show(req, res){

}

function store(req, res){
    
}

function update(req, res){
    
}

function modify(req, res){
    
}

function destroy(req, res){
    const id = req.params.id;

    const query = `
    delete from posts
    where id = ?`;

    connection.query(query, [id], (err, results) => {
        if(err){
            return res.status(500).json({
                message: "internal error",
            })
        }

        res.status(204).json({
            message: "elimination done"
        })
    })
}



export default {
    index,
    show,
    store,
    modify,
    update,
    destroy
}