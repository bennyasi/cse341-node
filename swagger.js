const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Library API",
    description: "CSE 341 Project 3 - Library API",
    version: "1.0.0"
  },
  host: "localhost:8080",
  schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./routes/index.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);