import knex from "../database/index"
import {Request, Response, NextFunction} from "express"
import bcrypt from "bcryptjs"

export default {
    async create (req: Request, res: Response, next: NextFunction) {
        try {
            const { name, username, email, password } = req.body
            console.log(name, username, email, password)
            const encrypted = await bcrypt.hash(password, 10)
            await knex('users').insert({ name, username, email, password: encrypted})
            return res.status(201).send()
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}
