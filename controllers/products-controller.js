// const Products = require('../classes/Product');
const productInstance = require('../models/Products');

const getAllProducts = async ()=>{
    const products = await productInstance.find();
    console.log(products);

}
//this isnt the final version its just to see if it works
const createProduct = async (product) =>{
    if(!product){
        return 
    }
    let created = await productInstance.create(product);
    if(created){
       console.log('prodotto creato!!')
    }
}

module.exports={getAllProducts,createProduct};