import mongoose from 'mongoose'

const todos = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    todo: {
        type: String,
        required: true,
    },
    list: [String],
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    todo_date: {
        type: Date,
        required: true,
    },
    due_date: {
        type: Date,
        required: false,
    }
},
{
    timestamps: true 
})

const TodoModel = mongoose.model('todos', todos)
export default TodoModel