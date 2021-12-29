const { isJSONstring } = require("../utils/utils");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid").v4;
const writeDataToFile = require('../utils/writeDataToFile')
function findByKey(parameter = {}) {
  let parameterKey = Object.keys(parameter)[0]; // solo il primo parametro

  if (!parameterKey) {
    return (object) => true;
  }

  return (object) => {
    if (object.hasOwnProperty(parameterKey)) {
      if (object[parameterKey] === parameter[parameterKey]) {
        return true;
      }
    } else return false;
  };
}

class MODEL {
  constructor(schema) {
    // nome del file su cui sono salvate le  cose

    this.schema = schema; // questo sarà lo schema da cui prendere i dati.

    this._createSchema();
  }

  //all methods will return promises!
  schemaExists() {
    //se esiste va bene altrimenti crealo:
    if (fs.existsSync(this.schema)) {
      return true;
    }
    return false;
  }

  //se il file non esiste lo crea!
  _createSchema() {
    if (!this.schemaExists()) {
      //crealo nella cartella in cui esiste con this.schema
      fs.mkdir(path.dirname(this.schema), { recursive: true }, (err) => {
        console.log(err);
        return err;
      }); //con questo creo la cartella
      fs.closeSync(fs.openSync(this.schema, "a")); // con questo creo il file in quella cartella.
      console.log("creato: ", this.schema);
    }
  }

  //è una funzione che restituisce in modo asincrono i dati!
  _readSchema() {
    return new Promise((resolve, reject) => {
      if (!this.schemaExists()) {
        reject("schema doesnt' exist! create a schema");
      }
      fs.readFile(this.schema, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        }
        if (isJSONstring(data)) {
          const dataArray = JSON.parse(data);
          resolve(dataArray);
        }
      });
    });
  }

  //pass a object {key:value} with one key and one value and it returns the occurences of that in the array!
  find(parameter = {}) {
    return new Promise((resolve, reject) => {
      try {
        if (!this.schemaExists()) {
          throw new Error("path non esiste :(");
        }
        let data = fs.readFileSync(this.schema, "utf-8"); //data deve essere un unico array
        let dataArray = JSON.parse(data || "[]");
        let result = Array.from(dataArray).filter(findByKey(parameter)); // questo filtra in base alla chiave
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  findById(id) {
    if (!!!id) {
      //id must be unique!
      return Promise.reject(new Error("provide a valid id!"));
    }
    const element = this.find({ _id: id });
    if (!!element) {
      return element;
    }
    return Promise.resolve({});
  }

  //resolves with true or false
  create(object) {
    return new Promise((resolve, reject) => {
      if (!this.schemaExists()) {
        reject(false);
      }
      const newItem = { _id: uuid().toString(), ...object };
      this._readSchema().then((data) => {
        data.push(newItem);
         writeDataToFile(this.schema,data).then(()=>resolve(newItem));
       
      });
    
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      if (!this.schemaExists()) {
        reject(new Error("schema does not exist"));
      }

      this._readSchema()
        .then((data) => {
          const elements = Array.from(data);
          const index = elements.findIndex((el) => {
            return el._id === id;
          });
          if (index < 0) {
            throw new Error("Element not Found!!");
          }

          elements.splice(index, 1);
          writeDataToFile(this.schema,elements).then(res=>resolve(res));
  
        })
        .catch((err) => reject(err));
    });
  }
       
//quello che posso fare è 

  update(id,newValues={}){
    return new Promise((resolve,reject)=>{
      if (!this.schemaExists()) {
       return  reject(new Error("schema does not exist"));
      }
      if(typeof newValues !=='object') {
       return reject(new Error("Provide valid object values!"))
      }

      this._readSchema().then((data)=>{
        const elements = Array.from(data);
        const index = elements.findIndex((el) => {
          return el._id === id;
        });
        if (index < 0) {
          throw new Error("Element not Found!!");
        }
        const found =  elements[index];
        const updated ={...found,...newValues};
        elements.splice(index,1,updated); //in questo modo dovrei aver sostituito con l'elemento nuovo
        writeDataToFile(this.schema,elements).then(res=>resolve(res));
        

      })
      .catch((err) => reject(err));
    })

  }
}

module.exports = MODEL;
