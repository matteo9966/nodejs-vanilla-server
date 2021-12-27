const http = require("http");
/**
 * @param {http.IncomingMessage} req
 * 
 */
const ObjectFromStream =(req)=>{
    return new Promise((resolve,reject)=>{
        let data='';
        req.on('data',(chunk)=>{
            console.log(chunk)
            data+=chunk
        })
        req.on('end',()=>{
            console.log('stream finito!')
            let obj = JSON.parse(data);
            resolve(obj)
        })
        req.on('error',(err)=>reject(err));

    })
}

module.exports=ObjectFromStream

