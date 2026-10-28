import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];
let nextId = 1;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts })
})

app.get("/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/posts", (req,res) => {

    const newPost = {
        id: nextId++,
        title: req.body["title"],
        content: req.body["content"],
        date: new Date().toLocaleDateString()
    };
  posts.unshift(newPost);   // unshift = put newest at the top
  res.redirect("/"); 

})


// Open the edit form for one post
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("edit.ejs", { post: post });
});

// Save the changes
app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

// delete post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.redirect("/");
});

// app listen function
app.listen(port, () => {
    console.log(`the server is running on ${port}`)
});