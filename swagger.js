const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "CSE 341 Contacts API",
    version: "1.0.0"
  },
  host: process.env.RENDER_EXTERNAL_URL
    ? process.env.RENDER_EXTERNAL_URL.replace(/^https?:\/\//, "")
    : "localhost:8080",
  schemes: [process.env.RENDER_EXTERNAL_URL ? "https" : "http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
