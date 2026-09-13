const express = require("express");

const securityKeyMiddleware = require("./securityKey.middleware");

const apiSecurityMiddleware = [
  securityKeyMiddleware,

  express.text({
    type: ["text/plain", "application/encrypted"],
  }),

  express.json(),
];

module.exports = apiSecurityMiddleware;
