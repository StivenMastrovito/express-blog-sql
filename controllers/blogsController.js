import connection from "../db.js";


function index(req, res) {
    const query = `
    select * 
    from posts`;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "internal error",
            })
        }

        res.json(results);
    })
}

function show(req, res) {
    const id = req.params.id;

    const query = `
    select * 
    from posts
    where id = ?`

    connection.query(query, [id], (err, postsResults) => {
        if (err) {
            return res.status(500).json({
                message: "internal error",
            })
        }

        if (postsResults.length !== 1) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        const tagQuery = `
        select tags.*
        from tags
        inner join post_tag
        on tags.id = post_tag.tag_id
        where post_tag.post_id = ?
        `

        connection.query(tagQuery, [id], (err, tagsResults) => {
            if (err) {
                return res.status(500).json({
                    message: "internal error",
                })
            }

            if (tagsResults.length < 1) {
                return res.status(404).json({
                    message: "Tags not found"
                })
            }

            const postDetails = {
                ...postsResults[0],
                tags: tagsResults,
            }

            res.json(postDetails)
        })


    })

}

function store(req, res) {
    const dati = req.body;
    
    const query = `
    insert into posts (title, content, image)
    values (?, ?, ?)
    `
    connection.query(query, [dati.title, dati.content, dati.image], (err, results) => {
        if(err){
            return res.status(500).json({
                message: "internal error",
            })
        }

        res.status(201).json(dati)
    })
}

function update(req, res) {
    const idPost = req.params.id
    const dati = req.body;
    
    const query = `
    update posts 
    set title = ?, content = ?, image = ?
    where id = ?
    `
    connection.query(query, [dati.title, dati.content, dati.image, idPost], (err, results) => {
        if(err){
            return res.status(500).json({
                message: "internal error",
            })
        }

        res.status(201).json({
            id: idPost,
            title: dati.title,
            content: dati.content,
            image: dati.image
        })
    })

}

function modify(req, res) {
    const id = req.params.id;
    const dati = req.body;

    const query = `
    update posts 
    set ${dati.name} = ?
    where id = ?
    `
    connection.query(query, [dati.content, id], (err, results) => {
        if(err){
            return res.status(500).json({
                message: "internal error",
            })
        }

        res.status(201).json({
            [dati.name]: dati.content,
        })
    })
}

function destroy(req, res) {
    const id = req.params.id;

    const query = `
    delete from posts
    where id = ?`;

    connection.query(query, [id], (err, results) => {
        if (err) {
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