import connection from "../db.js";

function index(req, res) {
    const query = `
    select * 
    from tags`;

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
    from tags
    where id = ?`

    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "internal error",
            })
        }

        if (results.length !== 1) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        const queryPost = `
        select distinct posts.*
        from posts
        inner join post_tag
        on posts.id = post_tag.post_id
        where post_tag.tag_id = ?
        `

        connection.query(queryPost, [id], (err, postResults) => {
            if (err) {
                return res.status(500).json({
                    message: "internal error",
                })
            }

            res.json({
                ...results[0],
                posts: postResults
            })
        })
    })
}

function store(req, res) {
    const dati = req.body;

    const query = `
    insert into tags (label)
    values (?)
    `
    connection.query(query, [dati.label], (err, results) => {
        if (err) {
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
    update tags 
    set label = ?
    where id = ?
    `

    connection.query(query, [dati.label, idPost], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "internal error",
            })
        }

        res.status(201).json({
            id: idPost,
            label: dati.label
        })
    })

}

function modify(req, res) {
    const id = req.params.id;
    const dati = req.body;

    const query = `
    update tags 
    set ${dati.name} = ?
    where id = ?
    `
    connection.query(query, [dati.content, id], (err, results) => {
        if (err) {
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
    delete from tags
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