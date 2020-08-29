const express = require('express')
const router = express.Router()
const db = require('../data/dbConfig')

// GET all tasks
router.get('/', async (req, res, next) => {
    try {
        // const tasks = await db.select("*").from("task")
        const tasks = await db("task")
            .join("project", "project.id", "=", "task.project_id")
            .select(
                "project.name as Project Name", 
                "project.description as Project Description", 
                "task.project_id as Project ID", 
                "task.description as Task Description", 
                "task.notes as Task Notes", 
                "task.completed as Task Completed"
                )
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
})

// POST new task
router.post('/', async (req, res, next) => {
    try {
        const newTaskID = await db

        .insert({
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed,
            project_id: req.body.project_id
        })
        .into("task")

        const viewTask = await db("task").where("id", newTaskID).limit(1)
        res.status(201).json(viewTask)
    } catch (error) {
        next(error)
    }
})

module.exports = router