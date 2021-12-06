const fs = require("fs");

function findByKey(parameter = {}) {
  let parameterKey = Object.keys(parameter)[0]; // solo il primo parametro

  if (!parameterKey) {
    return (object) => true;
  }

  return (object) => {
    if (object.hasOwnProperty(parameterKey)) {
      return true;
    } else return false;
  };
}

class MODEL {
  constructor(schema) {
    // nome del file su cui sono salvate le  cose

    this.schema = schema; // questo sarà lo schema da cui prendere i dati.
  }

  //all methods will return promises!
  schemaExists(){
   
       if(fs.existsSync(this.schema)){
          
           return true 
       }
       return false
 
  }

  find(parameter = {}) {
    return new Promise((resolve, reject) => {
      try {
        if(!this.schemaExists()){
            throw new Error("path non esiste :(")
        }  
        let data = fs.readFileSync(this.schema, "utf-8"); //data deve essere un unico array
        let dataArray = JSON.parse(data || '[]');
       

        if (!Array.isArray(dataArray)) {
          dataArray = [];
        }

        let result = dataArray.filter(findByKey(parameter));
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports= MODEL