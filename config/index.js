require('dotenv').config();

module.exports = {
    jwtSecret: process.env.SECRET_KEY,
    database: {    
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST
    },
    dialect: process.env.DIALECT
}