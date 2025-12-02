const express = require('express')

const app = express()

const mongoose = require('mongoose')

const database = "mongodb://localhost:27017/todo_db"

mongoose.connect(database)
    .then(() => console.log("Connect to DB successd !"))
    .catch((err) => console.log("Connect to DB failed !" + err))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const TodoRouter = require('./api/routes/TodoRoute')

TodoRouter(app)

const port = 3000

app.listen(port, () => {
    console.log("Server is running at port" + port)
})
