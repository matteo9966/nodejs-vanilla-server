const http = require("http");
const extractProductId = require("../utils/extractProductId");
const productInstance = require("../models/Products");
const ObjectFromStream = require("../utils/ObjectFromStream");
const asyncWrapper = require("../utils/asyncWrapper");
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */

const errorCallback = (res, err) => {
  res.writeHead(400, { "Content-type": "text/plain" });
  res.end(err.message);
};

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await productInstance.find();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(products));
}, errorCallback);

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */


const getProductById = asyncWrapper(async (req, res) => {
  const productID = extractProductId(req.url);
  const foundproduct = {};
  const product = await productInstance.findById(productID);
  foundproduct.product = product;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(foundproduct));
}, errorCallback);

//this isnt the final version its just to see if it works
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */


const createProduct = asyncWrapper(async (req,res)=>{
  const product = await ObjectFromStream(req);
  const createdProduct = await productInstance.createProduct(product); //se non crea nulla in teoria lancia un errore!

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(createdProduct));
},errorCallback)



const deleteProductById = asyncWrapper(async (req,res)=>{
  const id = extractProductId(req.url);
  if (!id) {
    throw new Error("please provide a valid ID")
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  const newList = await productInstance.delete(id);
  console.log(newList);
  res.end(JSON.stringify(newList));
},errorCallback);

const updateProductById = asyncWrapper(async (req,res)=>{
  const id = extractProductId(req.url);
  if (!id) {
    throw new Error("please provide a valid ID")
  }
  const product = await ObjectFromStream(req);
  const updated = await productInstance.updateProduct(id, product);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(updated));

},errorCallback)

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
