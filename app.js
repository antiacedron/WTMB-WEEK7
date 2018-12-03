const express = require('express')
const bodyParser = require('body-parser') 


const app = express() 
require ("./mongo-connection") 

// const Person= require ("./models/person") 
// const Book= require ("./models/book") 
// const City= require ("./models/city") 
const Personservice= require ("./services/person-service") 
const Bookservice= require ("./services/book-service") 
const Cityservice= require ("./services/city-service") 

app.set('view engine', 'pug') 
app.use(bodyParser.json()) 

app.get('/',(req, res, next) => {
    res.render("index") 
    //res.sendFile(__dirname + "/index.html") 
    //res.send(await Personservice.findAll()) 
  }) 

  // PERSON ENDPOINTS 
  
  app.get('/person/all', async (req, res, next) => {
    const people = await Personservice.findAll()
    //res.render('person', { people: people }) 
    res.send(people) 
  }) 
  
  app.get('/person/:id', async (req, res) => {
    const user = await Personservice.findById(req.params.id)
    res.send(user)  
  }) 

  app.get("/person/name/:name", async (req, res) => {
    const user = await Personservice.findByName(req.params.name)
    res.send(user) 
  }) 
  
  app.post('/person', async (req, res, next) => {
    const person = await Personservice.add(req.body) 
    res.send(person) 
  }) 

  app.delete('/person/:personId', async (req, res) => {
    await Personservice.del(req.params.personId)
    res.send("ok") 
  }) 

  app.get('/person/:id/json', async (req, res) => {
    const user = await Personservice.findById(req.params.id)
    if (!user) res.status(404) 
    res.send(user)
  }) 
  
 

//BOOK ENDPOINTS 

// app.get('/book/all-list', async (req, res) => {
//   const books = await Bookservice.findAll()
//   res.render('data', { data: books }) 
// }) 

app.get('/book/all', async (req, res, next) => {
  const books = await Bookservice.findAll()
  //res.render('book', { books: books }) 
  //res.send(books) 
  res.render('data', { data: books })
}) 

// app.get('/book/:id', async (req, res) => {
//   const book = await Bookservice.findByID(req.params.id)
//   res.send(book)  
// }) 

app.get('/book/:id', async (req, res) => {
  const book = await Bookservice.find(req.params.id)
  res.render('data', { data: book })
}) 

app.get("/book/title/:title", async (req, res) => {
  const book = await Bookservice.findByTitle(req.params.title)
  res.send(book)  
}) 

app.post('/book', async (req, res, next) => {
  const booktitle = await Bookservice.add(req.body) 
  res.send(booktitle) 
}) 

app.post('/book/add-reader', async (req, res, next) => {
  const bookreader = await Bookservice.addReader(req.body.bookId, req.body.personId) 
  res.send(bookreader) 
}) 

app.post('/book/:id/add-reader', async (req, res) => {
  const bookreader = await Bookservice.addReader(req.params.id, req.body.personId)
  res.send(bookreader) 
}) 

app.delete('/book/:bookId', async (req, res) => {
  await Bookservice.del(req.params.bookId)
  res.send("ok") 
}) 

app.get('/book/:id/json', async (req, res) => {
  const book = await Bookservice.findByID(req.params.id)
  if (!book) res.status(404) 
  res.send(book)
}) 


module.exports = app 