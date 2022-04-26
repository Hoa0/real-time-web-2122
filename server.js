/*
https://socket.io/get-started/chat
*/

const express = require('express')
const app = express()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
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

app.get('/', (req, res) => {
    res.render('index', {
    pageTitle: 'Home'
    });
})

// index route
app.get('/chatroom', (req, res) => {
        res.render('artGame', {
        pageTitle: 'Chat'
        });
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
