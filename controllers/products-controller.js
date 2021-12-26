const http = require("http");
const extractProductId = require("../utils/extractProductId");
const productInstance = require("../models/Products");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */

const getAllProducts = async (req, res) => {
  const products = await productInstance.find();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(products));
};


/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const getProductById = async (req, res) => {
    const productID = extractProductId(req.url);
    const foundproduct= {};
    try{
      const product =await productInstance.findById(productID);
      foundproduct.product=product;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(foundproduct));

    }catch(err){
      res.writeHead(400,{'Content-type':'text/plain'})
      res.end(err.message)
    }
    
   

};

//this isnt the final version its just to see if it works
const createProduct = async (product) => {
  if (!product) {
    return;
  }
  let created = await productInstance.create(product);
  if (created) {
    console.log("prodotto creato!!");
  }
};

module.exports = { getAllProducts, createProduct, getProductById };
