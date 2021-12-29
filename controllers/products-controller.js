const http = require("http");
const extractProductId = require("../utils/extractProductId");
const productInstance = require("../models/Products");
const ObjectFromStream =require("../utils/ObjectFromStream");

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
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const createProduct = async (req,res) => {
  try{
    const product=await ObjectFromStream(req);
     const createdProduct = await productInstance.createProduct(product); //se non crea nulla in teoria lancia un errore!

     res.writeHead(200, { "Content-Type": "application/json" });
     res.end(JSON.stringify(createdProduct))
   

  }catch(err){
    res.writeHead(400,{'Content-type':'text/plain'})
    res.end(err.message)
  }


};

const deleteProductById =async (req,res) => {
  const id = extractProductId(req.url);
  if(!id){
    res.writeHead(400,{'Content-type':'text/plain'})
    res.end("no id! :(")
    return
  }
  try{
    res.writeHead(200, { "Content-Type": "application/json" });
    const newList= await productInstance.delete(id)
    console.log(newList);
    res.end(JSON.stringify(newList));
    
  }catch(err){
    
    res.writeHead(400,{'Content-type':'text/plain'})
    res.end(err.message)
  } 


}

const updateProductById= async (req,res)=>{
  const id = extractProductId(req.url);
  if(!id){
    res.writeHead(400,{'Content-type':'text/plain'})
    res.end("no id! :(")
    return
  }
  const product=await ObjectFromStream(req);
  try{
    const updated=await productInstance.updateProduct(id,product);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updated));
  }catch(err){
    res.writeHead(400,{'Content-type':'text/plain'})
    res.end(err.message)
  }



}

module.exports = { getAllProducts, createProduct, getProductById,deleteProductById,updateProductById };
