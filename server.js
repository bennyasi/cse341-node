const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./routes"));

// Connect to MongoDB and start server
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Swagger Docs: http://localhost:${port}/api-docs`);
    });
  }
});