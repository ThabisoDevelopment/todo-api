import Joi from "joi"
import TodoModel from "../models/TodoModel"

class TodoController {

    // get all todos that belongs to user
    async index(request, response) {
        try {
            const todos = await TodoModel.find({ user_id: request.user._id})
            response.send(todos)
        } catch (error) {
            response.status(400).send(error) 
        }
    }

    // create a new todo
    async create(request, response) {
        try {
            const schema = Joi.object({
                todo: Joi.string().required().min(5),
                list: Joi.array(),
                todo_date: Joi.date().required(),
                due_date: Joi.date()
            })
            const { error } = schema.validate(request.body)
            if (error) throw error.details[0].message
            const todo = await TodoModel.create({
                user_id: request.user._id,
                todo: request.body.todo,
                list: request.body.list,
                todo_date: request.body.todo_date,
                due_date: request.body.due_date? request.body.due_date : null
            })
            response.send(todo)
        } catch (error) {
            response.status(400).send(error)
        }
    }

    // update current todo
    async update(request, response) {
        try {
            const schema = Joi.object({
                todo: Joi.string().required().min(5),
                list: Joi.array(),
                todo_date: Joi.date().required(),
                due_date: Joi.date()
            })
            const { error } = schema.validate(request.body)
            if (error) throw error.details[0].message
            const todo = await TodoModel.findById(request.params.id)
            todo.todo = request.body.todo
            todo.list = request.body.list
            todo.todo_date = request.body.todo_date
            todo.due_date = request.body.due_date
            todo.done = false
            await todo.save()
            response.send(todo)
        } catch (error) {
            response.status(400).send(error) 
        }
    }

    // update and mark todo as done = true
    async done(request, response) {
        try {
            const todo = await TodoModel.findById(request.params.id)
            todo.done = true
            await todo.save()
            response.send(todo)
        } catch (error) {
            response.status(400).send(error) 
        }
    }

    // add new todo item to list of todos
    async addListItem(request, response) {
        try {
            const schema = Joi.object({
                list: Joi.array()
            })
            const { error } = schema.validate(request.body)
            if (error) throw error.details[0].message
            const todo = await TodoModel.findById(request.params.id)
            await request.body.list.forEach(item => todo.list.push(item))
            await todo.save()
            response.send(todo)
        } catch (error) {
            response.status(400).send(error) 
        }
    }

    // remove todo item from list
    async removeListItem(request, response) {
        try {
            const schema = Joi.object({
                list: Joi.array()
            })
            const { error } = schema.validate(request.body)
            if (error) throw error.details[0].message
            const todo = await TodoModel.findById(request.params.id)
            await request.body.list.forEach(item => todo.list.pull(item))
            await todo.save()
            response.send(todo)
        } catch (error) {
            response.status(400).send(error) 
        }
    }

    // remove || delete the entire todo
    async destroy(request, response) {
        try {
            const todo = await TodoModel.findById(request.params.id)
            await todo.delete()
            response.send({ message: 'Todo item has been deleted successful' })
        } catch (error) {
            response.status(400).send(error) 
        }
    }
}

export default new TodoController