const MODEL = require("./MODEL");
const path = require("path");
const Product = require("../classes/Product");
const { timeStamp } = require("console");
const filterObjectProps = require('../utils/filterObjectProps');
class Products extends MODEL {
  //could also add some setters to check for price or name validity!

  constructor(path) {
    super(path);
  }

  /**
   * @param {Object} object
   * @param {string} object.name
   * @param {Number} object.price
   * @param {string} object.description
   * */

  
  createProduct(object) {
    //qui devo filtrare i prodotti

    //check if is an object
    if (typeof object !== "object") {
      Promise.reject(new Error("invalid object!"));
    }else{
        return this.create(new Product(object));
        
    }

  }
  updateProduct(id,object={}){
    if(!id){
        return Promise.reject(new Error("provide id!"))
    }

    if(typeof object!== "object"){
      Promise.reject(new Error("invalid object"))
    }else {
       const filteredobject = filterObjectProps(object,new Product({}))
       return this.update(id,filteredobject);
    }
  }
}

//qui creo l'istanza di Products e lo esporto?
const absolutePath = path.resolve("./DB/PProducts.json");
// console.log(absolutePath);

module.exports = new Products(absolutePath);
