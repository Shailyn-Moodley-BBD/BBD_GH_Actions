const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory data store
let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
    res.status(200).json({ todos });
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json({ message: 'Todo deleted' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});