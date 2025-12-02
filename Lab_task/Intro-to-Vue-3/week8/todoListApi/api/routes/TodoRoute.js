const TodoController = require('../controllers/TodoController')

const TodoRoute = (app) => {
    app.route('/api/todos')
        .get(TodoController.view_all_todos)
        .post(TodoController.add_new_todo)
        .delete(TodoController.delete_all_todos)


    app.route('/api/todos/:id')
        .get(TodoController.view_todo_by_id)
        .post(TodoController.update_todo)
        // .delete(TodoController.delete_todo)
    
    app.route('/api/todos/search/:keyword')
        .get(TodoController.search_todo)
}

module.exports = TodoRoute