/*
https://socket.io/get-started/chat
*/

const express = require('express')
const app = express()
const fetch = require('node-fetch')
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const PORT = process.env.PORT || 4242

// Template files
app.set('views', 'views');

// app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve('static')))

const endpoint= 'https://dog.ceo/api/breeds/list/all'
/*
app.get('/', (req, res) => {
    fetch(`${endpoint}`)
        .then(async response => {
            const artCollection = await response.json()
            res.render('index', {
                title: 'Art overview',
                titlePage: 'Artcollection',
                data: artCollection.artObjects
            })
        })
        .catch(err => res.send(err))
})*/
// index route
app.get('/', (req, res) => {
    fetch(endpoint)
    .then(async response =>{
        const collection = await response.json()
        res.render('index', {
        pageTitle: 'Chat',
        data:collection.message
        
    })
    console.log("check test",collection);
    })
    .catch(err => res.send(err))
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(PORT, () => {
    console.log('listening on port ', PORT)
})
