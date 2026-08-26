import authMiddleware from '../middleware/authMiddleware.js';
import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, toggleTodo, deleteTodo } from "../controllers/todo.controller.js";

const route = express.Router();

/* For only testing
route.get('/todo', (req, res) => {
   res.send('Todo API is running');
});  */


//Create Todo
route.post('/', authMiddleware, createTodo);

//Get all Todos
route.get('/', authMiddleware, getTodos);

//Get Todo by ID
route.get('/:id', authMiddleware, getTodoById);

//Update Todo by ID
route.put('/:id', authMiddleware, updateTodo);

//Toggle Todo completion status by Id
route.patch('/:id/toggle', authMiddleware, toggleTodo);

//Delete TODO by ID
route.delete('/:id', authMiddleware, deleteTodo);

export default route;