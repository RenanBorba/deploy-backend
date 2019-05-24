const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require("./config/multer");

const Post = require("./models/Post");


routes.get("/posts", async (req, res) => {
    const posts = await Post.find();

    return res.json(posts);
});


//RestFUL
routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    console.log(req.file);

    //destruturação
    const { originalname: name, size, key, location: url  = "" } = req.file;


    const post = await Post.create({
        //name: req.file.originalname,
        name,
        //size: req.file.size,
        size,
        //key: req.file.filename,
        key,
        url
    });

    return res.json(post);
});

routes.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
});

module.exports = routes;