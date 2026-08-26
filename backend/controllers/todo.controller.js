import Todo from "../models/todo.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../middleware/asyncHandler.js";

// Create Todo
export const createTodo = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  // Validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  // Create Todo
  const todo = await Todo.create({
    title,
    description,
    priority,
    dueDate,
    userId: req.user.id,
  });

  return res.status(201).json({
    success: true,
    message: "Todo created successfully",
    data: todo,
  });
});


// Get all Todos
export const getTodos = asyncHandler(async (req, res) => {
  const { search, sort, page = 1, limit = 10 } = req.query;

  // Base Query - ONLY logged-in user's todos
  let query = {
    userId: req.user.id,
  };

  // Search by title
  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  // Sorting
  let sortOption = {};

  if (sort === "asc") {
    sortOption.createdAt = 1;
  } else {
    sortOption.createdAt = -1;
  }

  // Pagination
  const skip = (page - 1) * limit;

  const todos = await Todo.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit));

  const totalTodos = await Todo.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Todos fetched successfully",
    total: totalTodos,
    page: Number(page),
    limit: Number(limit),
    data: todos,
  });
});


// Get Todo by ID
export const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo Id",
    });
  }

  // Find Todo ONLY belonging to logged-in user
  const todo = await Todo.findOne({
    _id: id,
    userId: req.user.id,
  });

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Todo fetched successfully",
    data: todo,
  });
});


// Update Todo by ID
export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate } = req.body;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo Id",
    });
  }

  // Validate input
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  // Update ONLY logged-in user's Todo
  const todo = await Todo.findOneAndUpdate(
    {
      _id: id,
      userId: req.user.id,
    },
    {
      title,
      description,
      priority,
      dueDate,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: todo,
  });
});


// Toggle Todo by ID
export const toggleTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo Id",
    });
  }

  // Find ONLY logged-in user's Todo
  const todo = await Todo.findOne({
    _id: id,
    userId: req.user.id,
  });

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  // Toggle completion
  todo.isCompleted = !todo.isCompleted;

  await todo.save();

  return res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: todo,
  });
});


// Delete Todo by ID
export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo Id",
    });
  }

  // Delete ONLY logged-in user's Todo
  const todo = await Todo.findOneAndDelete({
    _id: id,
    userId: req.user.id,
  });

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    data: todo,
  });
});