/**
 * @param {Object} base its the base object
 * @param {Object} object object from which function extracts  the same base object properties
 * @returns {Object} object with filtered properties 
 */

module.exports = function filterObjectProps(object,base){
    if(typeof object !=="object" || typeof base !== "object"){
        throw new Error("object and base must be objects!")
    }
    const newobject= {}  
    Object.keys(base).forEach(key=>{
          if(object.hasOwnProperty(key)){
            newobject[key] = object[key];
          }
      })
      return newobject;

}