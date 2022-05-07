import { genSalt, hash } from "bcryptjs"
import Joi from 'joi'

class AuthController {
    test(request, response) {
        response.send("Hello user, this is a testing route")
    }
    // create new user
    create(request, response) {
        // Validate request body Input | name | email | password |
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(50),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8),
        })
        const { error } = schema.validate(request.body)
        if (error) return response.status(422).send(error.details[0].message)

        // Check if email Exits
        response.send("register")
    }

    login(request, response) {
        // Login Validation request body | email | password
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8),
        })
        const { error } = schema.validate(request.body)
        if (error) return response.status(422).send(error.details[0].message)


        response.send('Login')
    }

    sendPasswordResetEmail(request, response) {
        const schema = Joi.object({
            email: Joi.string().required().email(),
        })
        const { error } = schema.validate(request.body)
        if (error) return response.status(422).send(error.details[0].message)

        // Check if email Exits
        response.send('send email')
    }

    // async passwordReset(request, response) {
    //     const schema = Joi.object({
    //         password: Joi.string().required().min(8),
    //     })
    //     const { error } = schema.validate(request.body)
    //     if (error) return response.status(422).send(error.details[0].message)

    //     // Generate a Hashed Password
    //     const salt = await genSalt(10)
    //     const hashedPassword = await hash(request.body.password, salt)
    //     const data = [ hashedPassword, request.user.id ]

    //     response.send({ data })
    // }
}

export default new AuthController