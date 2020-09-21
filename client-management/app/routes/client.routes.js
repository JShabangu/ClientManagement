module.exports = app => {
  const clients = require("../controllers/client.controller.js");

  var router = require("express").Router();

  // Create a client
  router.post("/", clients.create);

  // Search client using id
  router.get("/:id", clients.findOne);

  // Update a client using id
  router.put("/:id", clients.update);
  
  // Search client using first name
  router.get("/:firstName", clients.findOne);

  // Update a client using first name
  router.put("/:firstName", clients.update);
  
  // Search client using mobile number
  router.get("/:mobileNumber", clients.findOne);

  // Update a client using mobile number
  router.put("/:mobileNumber", clients.update);

  app.use("/api/clients", router);
};
