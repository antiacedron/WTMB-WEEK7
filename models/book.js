const mongoose = require ("mongoose") 

const BookSchema = new mongoose.Schema({
    title:String, 
    location:String,
    readers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }] 
})

module.exports = mongoose.model("Book", BookSchema); 





// module.exports = class Book
//     constructor (title,id) {
//         this.title=title
//         this.id=id
//         this.readers=[] 
//         this.cities=[]
//     } 

//     located (city) {
//         this.cities.push (city)
//         city.books.push (this)   
//     }
//     static create (obj) {
//         return new Book(obj.title,obj.id); 
//     } 
// } 