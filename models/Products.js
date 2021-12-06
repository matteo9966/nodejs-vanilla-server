const MODEL = require('./MODEL');
const path = require('path')

class Products extends MODEL {
    constructor(path){
       super(path)
    }

}

//qui creo l'istanza di Products e lo esporto?
const absolutePath = path.resolve('./DB/products.json')
console.log(absolutePath);

module.exports = new Products(absolutePath);