import { genSalt, hash, compare } from "bcryptjs"
import dayjs from "dayjs"
import Joi from 'joi'
import { sign } from "jsonwebtoken"
import Mail from "../mail/Mail"
import UserModel from "../models/UserModel"

class AuthController {
    // create new user
    async create(request, response) {
        try {
            // Validate request body Input | name | email | password |
            const schema = Joi.object({
                name: Joi.string().required().min(3).max(50),
                email: Joi.string().required().email(),
                password: Joi.string().required().min(8),
            })
            const { error } = schema.validate(request.body)
            if (error) throw error.details[0].message
            // check if email exists
            const exists = await UserModel.exists({ email: request.body.email })
            if (exists) throw 'Sorry! email already exist try login instead'
            // hash password
            const salt = await genSalt(10)
            const hashed_password = await hash(request.body.password, salt)
            // Insert user into monngoDB
            const user = await UserModel.create({
                name: request.body.name,
                email: request.body.email,
                password: hashed_password
            })
            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                email_verified: user.email_verified,
                createdAt: dayjs(user.createdAt).format('DD MMM YYYY'),
                updatedAt: dayjs(user.createdAt).format('DD MMM YYYY')
            }
            const mail_template = {
                email: request.body.email,
                subject: 'Welcome To anestordev TO-DO app',
                text: "Welcome to anestordev to-do app where you can make your todo list of things"
            }
            await Mail(mail_template)
            response.status(201).send({
                message: "Your account has been created successful",
                ...data
            })
        } catch (error) {
            response.status(400).send(error)
        }
    }

    // authenticate user
    async login(request, response) {
        try {
            // Login Validation request body | email | password
            const schema = Joi.object({
                email: Joi.string().required().email(),
                password: Joi.string().required().min(8),
            })
            const { error } = schema.validate(request.body)
            if (error) return response.status(422).send(error.details[0].message)
            // get user by email and validate email and pass
            const exists = await UserModel.exists({ email: request.body.email })
            if (!exists) throw 'Sorry! this user does not exist try signup instead'
            const user = await UserModel.findOne({ email: request.body.email })
            // validate password
            const valid_pass = await compare(request.body.password, user.password)
            if (!valid_pass) throw 'Sorry! your password is incorrent'
            // Create and Assign Token
            const token = sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'})
            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                email_verified: user.email_verified,
                createdAt: dayjs(user.createdAt).format('DD MMM YYYY'),
                updatedAt: dayjs(user.createdAt).format('DD MMM YYYY')
            }
            response.send({ token, ...data })
        } catch (error) {
            response.status(400).send(error)
        }
    }

    // send email with password reset link to user
    async sendPasswordResetEmail(request, response) {
        try {
            const schema = Joi.object({
                email: Joi.string().required().email(),
            })
            const { error } = schema.validate(request.body)
            if (error) throw error.details[0].message
            // Check if email Exits
            const exists = await UserModel.exists({ email: request.body.email })
            if (!exists) throw 'Sorry! this user does not exist try signup instead'
            const user = await UserModel.findOne({ email: request.body.email })
            const token = sign({ _id: user._id}, process.env.JWT_PASSWORD_RESET, { expiresIn: '1d'})
            const mail_template = {
                email: request.body.email,
                subject: 'Reset Your Password',
                text: `Click the link to reset passwod: http://localhost:8000/oauth/reset?token=${token}`
            }
            await Mail(mail_template)
            response.send({
                message: "Password reset link has been sent to your email - check your inbox",
                mail_template
            })
        } catch (error) {
            response.status(400).send(error)
        }
    }

    // update user forgot password
    async passwordReset(request, response) {
        try {
            const schema = Joi.object({
                password: Joi.string().required().min(8),
            })
            const { error } = schema.validate(request.body)
            if (error) throw error.details[0].message
            // Generate a Hashed Password
            const salt = await genSalt(10)
            const hashed_password = await hash(request.body.password, salt)
            const user = await UserModel.findById(request.user._id)
            user.password = hashed_password
            await user.save()
            response.send({ message: 'Your password has been updated success'})
        } catch (error) {
            response.status(400).send(error)
        }
    }
}

export default new AuthController