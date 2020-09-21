const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {check, validationResult} = require('express-validator');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/form', [
  check('firstName').isAlpha(),
  check('lastName').isAlpha(),
  check('mobileNumber').isNumeric({ max: 10 }),
  check('id').isNumeric({ max: 13 }),
  check('physicalAddress').isAlpha()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  
  const firstName  = req.body.firstName
  const lastName = req.body.lastName
  const id   = req.body.id
  const mobileNumber = req.body.mobileNumber
  const physicalAddress   = req.body.physicalAddress
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Investec" });
});

require("./app/routes/client.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
