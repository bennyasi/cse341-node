const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "Contacts API Documentation",
    version: "1.0.0",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json";

// Scan only the contacts routes
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger file generated successfully!");
});