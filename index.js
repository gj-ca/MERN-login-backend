const app = require("express")()

const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://glen-demo:TId7r1FphLDWMT5X@mern-demo.gltoh.mongodb.net/nodeExample?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to the database"))
.catch(() => console.log(`There was an error connecting to db`))

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Listening")
})