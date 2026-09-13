const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const apiSecurityMiddleware = require("../middleware/apiSecurity.middleware");
const errorMiddleware = require("../middleware/error.middleware");

app.use(apiSecurityMiddleware);

const microservicesPath = path.join(__dirname, "../microservices");

// Load microservices
fs.readdirSync(microservicesPath, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .forEach((service) => {
    const serviceFolder = path.join(microservicesPath, service.name);

    fs.readdirSync(serviceFolder)
      .filter((file) => file.endsWith("routes.js"))
      .forEach((file) => {
        const servicePath = path.join(serviceFolder, file);

        const routes = require(servicePath);

        app.use(`/api/${service.name}`, routes);
      });
  });

app.use(errorMiddleware);

// HOME / UNKNOWN PATH RESTRICTION
app.use((req, res) => {
  const filepath = path.join(__dirname, "../pages/404.html");
  const html = fs.readFileSync(filepath, "utf-8");

  return res.status(404).send(html);
});

module.exports = app;
