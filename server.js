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


// app.get('/', (request, response) => {
//     let data;
//     response.render('index.ejs', { info: data })
// })

app.get('/', (request, response) => {
    db.collection('toDo').find().toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        }).catch(err => console.error(err))
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
            response.redirect('/')
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

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on PORT 9000')
})