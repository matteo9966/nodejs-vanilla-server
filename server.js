const http = require('http');

const METHODS = {
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE",

}


//https://www.geeksforgeeks.org/node-js-response-writehead-method/ iniziare da qui domani
const server= http.createServer(function(request,response){
    //è un server crud quindi ha 
    //GET
    //POST
    //PUT
    //DELETE
    if(request.method===METHODS.GET){

    }
    else if(request.method===METHODS.POST){

    }
    else if(request.method===METHODS.PUT){

    }
    else if(request.method===METHODS.DELETE){

    }else{
        //
    }

});