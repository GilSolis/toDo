const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config()

let db;
let dbConnectionStr = process.env.DB_STRING
let dbName = 'toDo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response) => {
    let data;
    response.render('index.ejs', { info: data })
})


app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on PORT 9000')
})