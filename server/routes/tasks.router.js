//const { Router } = require('express');
const express = require('express');
const tasksRouter = express.Router();
const pool =require('../modules/pool');



tasksRouter.get('/', (req, res) => {
    console.log("Inside of tasksRouter");
    let queryText = 'SELECT * from "tasks" ORDER by "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
        console.log("result.rows ", result.rows);
     })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

tasksRouter.post('/', (req, res) => {
    let newTasks = req.body;
    console.log('inside of add tasks POST', newTasks);

    const queryText = `INSERT INTO "tasks" ("tasks", "completed", "notes")
    VALUES ($1, $2, $3);`;

    pool.query(queryText, [newTasks.tasks, newTasks.completed, newTasks.notes])
        .then((results) => {
            res.sendStatus(200);
            console.log('POST WORKED', results)
        }).catch((error) => {
            console.log('error adding tasks post', error);
            alert('POST DID NOT WORK');
            res.sendStatus(500);
        });
});

tasksRouter.delete('/:id', (req,res) => {
    console.log("Inside of /:id, DELETE request: ");
    const idToDelete = req.params.id;
    const sqlToDelete = 'DELETE FROM tasks WHERE id=$1'

        pool.query(sqlToDelete, [idToDelete])
        .then((result) => {
            console.log("Successful deletion ", idToDelete);
            res.sendStatus(200)
        }).catch((error) => {
            console.log(`Error in making query:, ${sqlText}`, error)
            res.sendStatus(500)
        })
})



module.exports = tasksRouter;
