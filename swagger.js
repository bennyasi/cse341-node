const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "CSE 341 Contacts API Documentation",
    version: "1.0.0"
  },
  host: "cse341-node-1-onl8.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger.json";

const endpointsFiles = [
  "./routes/index.js",
  "./routes/contacts.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger file generated successfully!");
});