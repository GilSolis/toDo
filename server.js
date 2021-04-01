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

app.get('/', async (request, response) => {
    let infoData = await db.collection('toDo').find().toArray()
    let completedData = await db.collection('completed').find().toArray()
    console.log(infoData, completedData)
    try {
        response.render('index.ejs', { info: infoData, completed: completedData })
    } catch (error) {
        console.log(error)
    }
})

app.post('/addTask', (request, response) => {
    db.collection('toDo').insertOne(request.body)
        .then(result => {
            console.log('task added')
            response.redirect('/')
        })
})

app.post('/addCompleted', (request, response) => {
    db.collection('completed').insertOne(request.body)
        .then(result => {
            console.log('completed task added')
            response.json('task moved to completed')
        })
})

app.delete('/deleteTask', (request, response) => {
    console.log(request.body)
    console.log("this is req.body.task " + request.body.taskToDo)
    db.collection('toDo').deleteOne({ taskToDo: request.body.taskToDo })
        .then(result => {
            console.log('task deleted')
            response.json('task deleted')
        })
        .catch(error => console.error(error))
})
app.delete('/removeCompletedtask', (request, response) => {
    db.collection('completed').deleteOne({ completedTask: request.body.completedTask })
        .then(result => {
            console.log('task deleted')
            response.json('task deleted')
        })
        .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on PORT 9000')
})