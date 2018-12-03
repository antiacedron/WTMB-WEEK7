const mongoose = require("mongoose") 

const PersonSchema = new mongoose.Schema ({
    name:String,
    age:Number 
})

module.exports = mongoose.model("Person", PersonSchema); 



// module.exports = class Person { 
//     constructor(name,age,id) { 
//         this.name=name
//         this.age=age
//         this.id=id  
//         this.books= []
//         this.cities=[] 
//     }  
  
//     read (book) {
//         this.books.push (book)
//         book.readers.push (this) 
//         } 
//     live(city) {
//         this.cities.push (city) 
//         city.readers.push(this) 
//     }  
//     static create (obj) {
//         return new Person(obj.name,obj.age,obj.id); 
//     } 
//   }  