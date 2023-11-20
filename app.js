//SERVER & CORS
const express = require('express')
const cors = require('cors')
const path = require('path');
//CONFIGS
require('dotenv').config()
const mongodb = require('./config/db')
const upload = require('./config/storage')
//ROUTER
const auth = require('./routers/auth')
const users = require('./routers/users')
const references = require('./routers/references')
const projects = require('./routers/projects')
const doings = require('./routers/doings')
const teams = require('./routers/teams')
const socials = require('./routers/socials')
const theme = require('./routers/theme')
const uploads = require('./routers/uploads')
const images = require('./routers/images')
//INITIALIZATION
const server = express()
server.use(cors())
server.use(express.json({extended: true, limit: '30mb'}))
server.use(express.urlencoded({extended: true, limit: '30mb'}))
//PATHS
server.use('/auth', auth)
server.use('/users', users)
server.use('/projects', projects)
server.use('/references', references)
server.use('/doings', doings)
server.use('/teams', teams)
server.use('/socials', socials)
server.use('/theme', theme)
server.use('/images', images)
server.use('/upload', upload.single('photo'), uploads)
server.use('/uploads', express.static(path.join(__dirname, 'uploads')))
//INDEX
server.get('/', (_, res) => {
    res.send('FZ Mimarlik - Web Site API by Proba Media')
})
//SERVER
const PORT = 4000 || process.env.PORT
server.listen(PORT, () => {
    mongodb()
    console.log(`Sunucuya ${PORT} portu üzerinden bağlantı başarılı.`)
})