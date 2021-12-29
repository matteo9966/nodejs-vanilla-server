const http = require("http");
const { stdin } = require("process");
const extractProductId = require("./utils/extractProductId");

const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("./controllers/products-controller");
const Product = require("./classes/Product");
const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const server = http.createServer(function (request, response) {
  request.setEncoding("utf-8");

  //è un server crud quindi ha
  //GET
  //POST
  //PUT
  //DELETE

  /* 
  # Routes
GET      /api/products     FATTO
POST     /api/products     FATTO
GET      /api/products/:id FATTO
PUT      /api/products/:id 
DELETE   /api/products/:id FATTO

  */
  const url = request.url;

  if (request.method === METHODS.GET) {
    let data = {};
    console.log(url);
    if (url === "/api/products") {
      getAllProducts(request, response);
      return;
    }
    if (url.match(/\/api\/products\/\w+/i)) {
      getProductById(request, response);
      return;
    }

    // response.end("TUTTO é ANDATO BENE!");
  } else if (request.method === METHODS.POST) {
    if (request.url === "/api/products") {
      createProduct(request, response);
      return;
    }
  } else if (request.method === METHODS.PUT) {
    if(url.match(/\/api\/products\/\w+/i)){
      updateProductById(request, response);

    }
    return;
  } else if (request.method === METHODS.DELETE) {
    deleteProductById(request, response);
  } else {
    response.writeHead(400, { "Content-type": "text/plain" });
    response.end("BAD REQUEST!");
  }
});

let port = process.argv[2] || 3001;
server.listen(port);
console.log("ascolto su ", port);
console.log("q and newline to exit!!");
process.stdout.write(">");

// createProduct(new Product('spazzolino',10,"spazzolino da denti molto resistente di colore blu")).then(()=>console.log("prodotto creato"))

// creare un event emitter per interrompere il server oppure utilizzare una stind
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
