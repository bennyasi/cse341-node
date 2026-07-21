const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "CSE 341 Contacts API",
    version: "1.0.0"
  },
  host: "cse341-node-iyr8.onrender.com", // Change this to your current Render URL
  schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);