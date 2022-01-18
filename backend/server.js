const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

// get all todos

app.get("/todos", async (req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todos");

        res.json(allTodos.rows);
    } catch(err) {
        console.error(err.message)
    }
})

// create a todo

app.post("/todos", async(req, res) => {
    try {
    const {id, title, editing} = req.body;
    const newTodo = await pool.query("INSERT INTO todos (id, title, editing)  VALUES ($1, $2, $3) RETURNING *",
    [id, title, editing]
    );

    res.json(newTodo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
})

// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1",
        [id]);

        res.json("Todo was successfully deleted!");
    } catch(err) {
        console.error(err.message);
    }
})

// update a todo

app.put("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {title} = req.body;

        const updateTodo = await pool.query("UPDATE todos SET title = $1 WHERE id = $2",
        [title, id]);
    
        res.json("Todo was updated")
    } catch(err) {
        console.error(err.message);
    }
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})