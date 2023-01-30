const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(express.json())
var database

app.get('/', (req, resp) => {
    resp.send('Welcome to MongoDb API')
})

app.get('/hi', (req, resp) => {
    resp.send('Welcome')
})

app.get('/api/users', (req, resp) =>{
    database.collection('users').find({}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })
})

app.listen(8082, () => {
    MongoClient.connect('mongodb+srv://mukish:Hsikum%40321@cluster0.minsz0l.mongodb.net/test', (error, result) => {
        if(error) throw error
        database = result.db('test')
        console.log('Connection successful!!!')
    })
})