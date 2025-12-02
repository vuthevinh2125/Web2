const TodoModel = require("../models/TodoModel")

const view_all_todos = async (req,res) => {
    try{
        const todos = await TodoModel.find({})

        res.status(200).json(todos)
    } catch (err){
        console.error(err)
    }
}

const view_todo_by_id = async (req,res) => {
    try{
        const id = req.params.id

        const todo = await TodoModel.findById(id)
        res.status(200).json(todo)
    } catch (err) {
        console.error(err)
    }
}

const add_new_todo = async (req,res) => {
    try{
        const todo = req.body

        await TodoModel.create(todo)
        res.status(200).json(todo)
    } catch (err) {
        console.error(err)
    }
}

const update_todo = async (req,res) => {
    try{
        const id = req.params.id
        const todo = req.body
        await TodoModel.findByIdAndUpdate(id, todo)
        res.json({"message" : "update todo successd !"})

    } catch (err) {
        console.error(err)
    }
}

const delete_all_todos = async (req, res) => {
    try{
        await TodoModel.deleteMany({})
        res.json({"message" : "delete all "})

    } catch (err) {
        console.error(err)
    }
}

const search_todo = async (req,res) => {
    try{
        const keyword = req.params.keyword
        const todos = await TodoModel.find({name: new RegExp (keyword, "i") });
        res.status(200).json(todos)

    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    view_all_todos,
    view_todo_by_id,
    add_new_todo,
    delete_all_todos,
    update_todo,
    search_todo
}
