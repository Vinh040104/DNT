const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://root:Kinai_911@atlascluster.n3euukb.mongodb.net/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const {id} = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {new: true});
    res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({message: 'Todo deleted'});
});

app.patch('/todos/:id/toggle', async (req, res) => {
    const {id} = req.params;
    const todo = await Todo.findById(id);
    todo.status = !todo.status;
    await todo.save();
    res.json(todo);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

