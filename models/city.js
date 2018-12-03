module.exports = class City{
    constructor (name,id) {
        this.name= name 
        this.id= id
        this.readers=[] 
        this.books=[] 
    }
    sayName() {console.log(this.name);} 

    static create (obj) {
        return new City(obj.name,obj.id); 
    } 
 } 