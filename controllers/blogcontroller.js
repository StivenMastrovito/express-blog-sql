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

}

function update(req, res) {

}

function modify(req, res) {

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