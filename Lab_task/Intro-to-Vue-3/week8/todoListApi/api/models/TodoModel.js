const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: Date,
    status: String
})

const TodoModel = mongoose.model("todos", TodoSchema)

module.exports = TodoModel