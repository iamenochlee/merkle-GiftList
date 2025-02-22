const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const merkleTree = new MerkleTree(niceList);

async function main() {
  //input name in string when running the command, can also replace
  const name = process.argv[2] || "Norman Block";
  const index = niceList.indexOf(name);
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });
  console.log({ gift });
}
main();
