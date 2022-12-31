const fs = require("fs");
const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = JSON.stringify(fs.readFileSync("./root.json"));
console.log(MERKLE_ROOT);

app.post("/gift", (req, res) => {
  const { name, proof } = req.body;
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("Merry Christmas!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
