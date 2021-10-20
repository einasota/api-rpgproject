import knex from "../database/index"
import "dotenv/config"
import {Request, Response, NextFunction} from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import mailer from '../config/mailer'
// const AuthConfig =  require("../config/auth")

function generateToken(params = {}){
    return jwt.sign({id: params}, process.env.SECRET, {
        expiresIn: 86400,
    })
}

export default {
    async create (req: Request, res: Response, next: NextFunction) {
        try {
            const { name, username, email, password } = req.body
            const encrypted = await bcrypt.hash(password, 10)
            const insert = await knex('users').insert({ name, username, email, password: encrypted})
            const list = await knex('users').select().where({id: insert[0]})
            list[0].password = undefined
            return res.status(201).send({list, token: generateToken({id: insert[0]})})
        } catch (error) {
            next(error)
            console.log(error)
        }
    },
    async login (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const user = await knex('users').select().where({email})
            if(user[0] == undefined) {
                return res.status(400).send({error: "User not found"})
            }
            if(!await bcrypt.compare(password, user[0].password))
                return res.status(400).send({error: 'Invalid password'})
            user[0].password = undefined
            res.status(200).send({user,token: generateToken({id: user[0].id})})
        } catch (error) {
            next(error)
        }

    },
    async recovery (req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            const user = await knex('users').select('email').where({ email: email})
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1)
            await knex('users').select({id: user[0].id}).update({passwordResetToken: token}, {passwordResetExpires: now})
            console.log(token, now)
            mailer.sendMail({
                to: email,
                from: 'suporte@rpg-project.com',
                template: 'forgot_password',
                context: {token}
            }, (err) => { if(err){
                return res.status(400).send({error:"Cannot send forgot password email"})
            }})
            res.send()
        } catch (error) {
            next(error)
        }
    }
}
