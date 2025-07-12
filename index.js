import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser"

var da_date = new Date()
var current = da_date.getFullYear()

const __dirname = dirname(fileURLToPath(import.meta.url))
const da_app = express()
const port = 3000

var all_posts = []

da_app.use(bodyParser.urlencoded({ extended: true }))
da_app.use(express.static(`${__dirname}/public`))



da_app.get("/", (req, res) => {

    res.render("index.ejs", {year: current, posts: all_posts})

})

da_app.get("/faq", (req, res) => {

    res.render("faq.ejs", { year: current })

})

da_app.get("/about", (req, res) => {

    res.render("about.ejs", { year: current })

})

da_app.get("/form", (req, res) => {

    res.render("form.ejs", { year: current })

})

da_app.post("/form", (req, res) => {

    var request = []

    var da_body = req.body

    var da_name = da_body["user_nickname"]

    var subject = da_body["subject"]

    var message = da_body["comments"]

    request.push(da_name, subject, message)

    all_posts.push(request)

    res.redirect("/")

})

da_app.get("/pre/:postId", (req, res) => { // Long story short, when the user clicks on the post he wants to access, the server gets the parameters of the clicked post.

    // Based on its parameters, it inquires all_posts array, when it finds the matching array, it gets its index and passes on to a function, that's supposed to render the ejs.

    var da_request = req.params.postId

    var fin_req = da_request.split(",") // Modifying the parameters of the request, so that it looks just like in the index.ejs

    for (let i=0; i<all_posts.length; i++) { // This is overengineered as hell....

        if (fin_req[i] === all_posts[i][i]) {

            var da_index = all_posts.indexOf(all_posts[i])

        }
    }

    res.redirect(`/post/${da_index}`)

})

da_app.get("/post/:postID", (req, res) => {

    var fin_index = req.params.postID

    var exact_post = all_posts[fin_index]

    res.render("post.ejs", { year: current, title: exact_post[0], subtitle: exact_post[1], content: exact_post[2], post_number: fin_index })

})

da_app.get("/delete/:postID", (req, res) =>  {

    var del_index = req.params.postID

    all_posts.splice(del_index, 1)

    res.redirect("/")

})

da_app.listen(port, () => {

    console.log(`Running on port ${port}`)

})

//318 lines of active code... But yeah, I did it :D and it wasn't that atroscious. Though no "edit" feature :3
