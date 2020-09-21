const db = require("../models");
const Client = db.clients;

// Create a new Client
exports.create = (req, res) => {
// Validate request
	if (!req.body.firstName) {
	res.status(400).send({ message: "Client's name cannot be empty" });
	return;
	}
  
    if (!req.body.lastName) {
    res.status(400).send({ message: "Client's last name cannot be empty" });
    return;
	}
  
    if (!req.body.id) {
    res.status(400).send({ message: "Client's id cannot be empty" });
    return;
  }

  // Create client - data
  const client = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
	id: req.body.id,
	mobileNumber: req.body.mobileNumber,
	physicalAddress: req.body.physicalAddress
  });

  // Save Client in the database
  client
    .save(client)
    .then(data => {
		
		Client.findOne({id:req.body.id}, function(err, client){
        if(Boolean(client)) {
            reject(new Error('Client already exist'));
        }	
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error whilst creating Client"
      });
    });
};

// Find a Client using id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Could not find client with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with id: " + id });
    });
};

// Find a Client using phoneNumber
exports.findOne = (req, res) => {
  const mobileNumber = req.params.mobileNumber;

  Client.findById(mobileNumber)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Could not find client with mobile number: " + mobileNumber });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with mobile number: " + mobileNumber });
    });
};

// Find a Client using First Name
exports.findOne = (req, res) => {
  const firstName = req.params.firstName;

  Client.findById(firstName)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Could not find client with name: " + firstName });
      else res.send(data);	
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with name: " + firstName });
    });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid data"
    });
  }

  const id = req.params.id;

  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if(Boolean(id)) {
         reject(new Error('Client already exist'));
      }
      resolve(true)
		
      if (!data) {
        res.status(404).send({
          message: `Client with id=${id} not found`
        });
      } else res.send({ message: "Client updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};