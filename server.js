const http = require("http");
const { stdin } = require("process");
const extractProductId = require("./utils/extractProductId");
const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

//https://www.geeksforgeeks.org/node-js-response-writehead-method/ iniziare da qui domani
const server = http.createServer(function (request, response) {
  //è un server crud quindi ha
  //GET
  //POST
  //PUT
  //DELETE
  const url = request.url;

  if (request.method === METHODS.GET) {
    let data = {};
    console.log(url)
    if (url === "/api/products") {
      //getAllproducts();
      console.log("GET ALL PRODUCTS!");
    }
    if (url.match(/\/api\/products\/\w+/i)) {
      const productID = extractProductId(url);
      console.log(url, productID);
      //getProductById
    }
    response.writeHead(200, { "Content-Type": "text/plain" });

    response.end("TUTTO é ANDATO BENE!");
  } else if (request.method === METHODS.POST) {
  } else if (request.method === METHODS.PUT) {
  } else if (request.method === METHODS.DELETE) {
  } else {
    //
  }
});

let port = process.argv[2] || 3001;
server.listen(port);
console.log("ascolto su ", port);
console.log("q and newline to exit!!")
process.stdout.write(">");

//creare un event emitter per interrompere il server oppure utilizzare una stind
stdin.setEncoding("utf-8");
stdin.on("data", (data) => {
  console.log(data);
  let inserted = data.toString().trim();
  if (inserted === "q") {
    process.exit(0);
  } else {
    // process.stdout.clearLine();
    console.log("q to exit!");
    process.stdout.write(">");
  }
});
