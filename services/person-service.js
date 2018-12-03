const fs = require("fs") 
const CircularJSON = require ("circular-json") 
const PersonModel = require('../models/person') 

const dbPath = `${__dirname}/../person-database.json`;  


async function findAll() {
    return PersonModel.find()
} 

async function add(person) {
   return PersonModel.create(person) 
}

async function del(personId) {
    return PersonModel.deleteOne({_id: personId})
}

async function findById(personId) {
   return PersonModel.findOne({_id: personId}) 
}

async function findByName(personName) { 
    return PersonModel.find({name: personName}) 
 } 
 

async function saveAll(people) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, CircularJSON.stringify(people), (err, file) => {
            if (err) return reject(err) 

            resolve()
        })
    })
}

module.exports = {
    findAll,
    findById,
    findByName,
    add,
    del,
    saveAll
}; 


