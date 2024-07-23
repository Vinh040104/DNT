const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message: 'Todo deleted'});
});

router.put('/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedTodo);
});

router.patch('/:id/toggle', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.status = !todo.status;
    await todo.save();
    res.json(todo);
});

module.exports = router;
