function isJSONstring(data){
    if(!data){
      return false
    }
    try {
      JSON.parse(data)
    }catch(e){
      return false
    }
     return true
  }

  module.exports=isJSONstring