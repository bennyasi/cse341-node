const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors"); // <-- Added CORS package
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors()); // <-- Enable CORS for all routes (including Swagger UI requests)
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./routes"));

// Initialize MongoDB and start server
mongodb.initDb((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    if (process.env.RENDER_EXTERNAL_URL) {
      console.log(
        `Swagger Docs: ${process.env.RENDER_EXTERNAL_URL}/api-docs`
      );
    } else {
      console.log(`Swagger Docs: http://localhost:${port}/api-docs`);
    }
  });
});
