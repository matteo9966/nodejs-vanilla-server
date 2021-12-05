function extractProductId(route=""){
   if(!route){
      return
   }
   let splitted=route.split('/');

   const id= splitted[splitted.length-1];
    
   return id;
}

module.exports=extractProductId;