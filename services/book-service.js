const fs = require("fs") 
const CircularJSON = require ("circular-json") 
const BookModel = require('../models/book') 
const PersonModel = require("../models/person") 

const dbPath = `${__dirname}/../book-database.json`; 

async function addReader(bookId, personId) {
    const book = await BookModel.findOne({_id: bookId})
    const person = await PersonModel.findOne ({_id: personId}) 

    book.readers.push(person) 

    await book.save()
    return book 
}

async function findAll() {
    return BookModel.find().populate("readers") 
} 

async function add(book) {
   return BookModel.create(book) 
} 

async function del(bookId) {
    return BookModel.deleteOne({_id: bookId})
}

async function findByID(bookId) {
   return BookModel.findOne({_id: bookId}).populate("readers") 
}

async function findByTitle(bookTitle) { 
    return BookModel.find({title: bookTitle}) 
 } 
 

async function saveAll(books) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, CircularJSON.stringify(books), (err, file) => {
            if (err) return reject(err) 

            resolve()
        })
    })
}

module.exports = {
    findAll,
    findByID,
    findByTitle,
    add,
    del,
    saveAll,
    addReader 
}; 
