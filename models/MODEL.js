const { create } = require("domain");
const {isJSONstring} = require('../utils/utils')
const fs = require("fs");
const path = require("path");

function findByKey(parameter = {}) {
  let parameterKey = Object.keys(parameter)[0]; // solo il primo parametro

  if (!parameterKey) {
    return (object) => true;
  }

  return (object) => {
    if (object.hasOwnProperty(parameterKey)) {
      if(object[parameterKey]===parameter[parameterKey]){

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
  schemaExists(){
        //se esiste va bene altrimenti crealo:
       if(fs.existsSync(this.schema)){
          
           return true 
       }
       return false
 
  }

  //se il file non esiste lo crea!
  _createSchema(){
    if(!this.schemaExists()){
      //crealo nella cartella in cui esiste con this.schema
      fs.mkdir(path.dirname(this.schema),{recursive:true},(err)=>{console.log(err);return  err}); //con questo creo la cartella
      fs.closeSync(fs.openSync(this.schema, 'a'))// con questo creo il file in quella cartella.
      console.log("creato: ",this.schema);
    } 
  }
 
  //è una funzione che restituisce in modo asincrono i dati!
  _readSchema(){
    return new Promise((resolve,reject)=>{
      if(!this.schemaExists()){
       reject("schema doesnt' exist! create a schema")
      }
      fs.readFile(this.schema,'utf-8',(err,data)=>{
        if(err){
          reject(err)
        }
        if(isJSONstring(data)){
          const dataArray = JSON.parse(data);
          resolve(dataArray);
        }
      })
      

    })
    
  }
   
  //pass a object {key:value} with one key and one value and it returns the occurences of that in the array!
  find(parameter = {}) {
    return new Promise((resolve, reject) => {
      try {
        if(!this.schemaExists()){
            throw new Error("path non esiste :(")
        }  
        let data = fs.readFileSync(this.schema, "utf-8"); //data deve essere un unico array
        let dataArray = JSON.parse(data || '[]');
      
        let result = dataArray.filter(findByKey(parameter)); // questo filtra in base alla chiave
        result = result.filter()
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  findById(id){
    if(!!!id){ //id must be unique!
      return {}
    }
    const element = this.find({id});
    if(!!element){
       return element
    }
    return {}
  
  }
  
  //resolves with true or false 
  create(object){
    
    return new Promise((resolve,reject)=>{
      if(!this.schemaExists()){
      reject(false)
      }
      

       const newItem = {_id:"id",...object};

       //leggi dal file 1
        this._readSchema().then(data=>{
          data.push(newItem);
          const dataToWrite=JSON.stringify(data);
          fs.writeFile(this.schema,dataToWrite,(err)=>{
             if(err){
               reject(false)
             }
            resolve(true)})
        })
       //fai un append 
       // restituisci il nuovo array
       //fine
 
    })
    
  }

}


module.exports= MODEL