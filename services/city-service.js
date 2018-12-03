const fs = require("fs") 
const CircularJSON = require ("circular-json") 
const CityModel = require('../models/city') 

const dbPath = `${__dirname}/../city-database.json`; 

function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)

            const cities = CircularJSON.parse(file).map(CityModel.create)

            resolve(cities) 
        })
    }) 
}
 
async function add(city) {
    const allCities = await findAll()
    const lastCity = allCities[allCities.length - 1]
    const lastCityId = lastCity && lastCity.id || 0
    city.id = lastCityId + 1 

    city = CityModel.create(city)
    allCities.push(city) 

    await saveAll(allCities)

    return city
}

async function del(cityId) {
    const allCities = await findAll()
    const cityIndex = allCities.findIndex(p => p.id == cityId)
    if (cityIndex < 0) return 

    allCities.splice(cityIndex, 1) 

    saveAll(allCities) 
}

async function find(cityId) {
    const allCities = await findAll()

    return allCities.find(p => p.id == cityId)
}

async function saveAll(cities) { 
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, CircularJSON.stringify(cities), (err, file) => {
            if (err) return reject(err) 

            resolve()
        })
    })
} 

module.exports = {
    findAll,
    find,
    add,
    del,
    saveAll
}; 