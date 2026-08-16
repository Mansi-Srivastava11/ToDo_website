import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, toggleTodo, deleteTodo } from "../controllers/todo.controller.js";

const route = express.Router();

/* For only testing
route.get('/todo', (req, res) => {
   res.send('Todo API is running');
});  */


//Create Todo
route.post('/create', createTodo);

//Get all Todos
route.get('/', getTodos);

//Get Todo by ID
route.get('/:id', getTodoById);

//Update Todo by ID
route.put('/:id', updateTodo);

//Toggle Todo completion status by Id
route.patch('/:id/toggle', toggleTodo);

//Delete TODO by ID
route.delete('/:id/', deleteTodo)

export default route;