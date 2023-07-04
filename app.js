const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongodb = require('./config/db')

const auth = require('./routers/auth')
const users = require('./routers/users')
const posts = require('./routers/posts')
const projects = require('./routers/projects')
const bookmarks = require('./routers/bookmarks')
const techs = require('./routers/techs')
const socials = require('./routers/socials')

const server = express()
server.use(cors())
server.use(express.json({extended: true, limit: '30mb'}))
server.use(express.urlencoded({extended: true, limit: '30mb'}))

server.use('/auth', auth)
server.use('/users', users)
server.use('/posts', posts)
server.use('/projects', projects)
server.use('/bookmarks', bookmarks)
server.use('/techs', techs)
server.use('/socials', socials)

server.get('/', (_, res) => {
    res.send('Ozan Alper Yalçın - Portfolio API')
})

const PORT = 4000 || process.env.PORT
server.listen(PORT, () => {
    mongodb()
    console.log(`Sunucuya ${PORT} portu üzerinden bağlantı başarılı.`)
})