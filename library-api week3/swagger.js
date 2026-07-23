const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Library API",
    description: "CSE 341 Library API",
    version: "1.0.0"
  },
  host: "cse341-node.git", // Update this to your deployed Render URL if needed
  schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);