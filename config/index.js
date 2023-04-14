require('dotenv').config();

module.exports = {
    PORT:process.env.PORT,
    DB:process.env.DB,
    PASSWORD:process.env.PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
    
}