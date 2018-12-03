const mongoose = require ("mongoose"); 

mongoose.connect ("mongodb://localhost/virtuallibrary", { useNewUrlParser: true }) 
    .then ( () => {
        console.log ("connected")
    }) 
