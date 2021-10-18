import knexfile from "../../knexfile.js"
import knex from "knex"

const knexconfig = knex(knexfile.development)

module.exports = knexconfig
