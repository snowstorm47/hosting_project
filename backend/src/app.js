require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const history = require('connect-history-api-fallback')
const cors = require('cors')
const path = require('path')
const app = express()

const { connect } = require('./db/db')

app.use(helmet())
app.use(cors())
app.use(express.json())

var root = path.join(__dirname + '/../public')
app.use(history({ index: 'index.html' }))
app.use(express.static(root))

app.use('/api/v1/images', express.static(path.join(process.cwd(), 'uploads')))

const instructorRoutes = require('./routes/instructor')
const coachRoutes = require('./routes/coach')
const authRoutes = require('./routes/auth')

app.use('/api/v1', authRoutes)
app.use('/api/v1', instructorRoutes)
app.use('/api/v1', coachRoutes)

const port = process.env.PORT || 8080

app.listen(port, async () => {
  await connect()
  console.log(
    `app started at ${new Date().getUTCMinutes()} on http://localhost:${port}`
  )
})
