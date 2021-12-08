const {
    v4: uuidv4,
  } = require('uuid');

module.exports = class Product {
    
    constructor(name,price,description){
        this._id =uuidv4();
        this.name=name;
        this.price=price;
        this.description=description;
           
    }

}