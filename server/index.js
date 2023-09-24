const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "004fb05211154bc3995167fd25a550d60167acff6934b5ef8c9792c219551686003b7f2869e1f88ad9037cf595a285ccd3a4fa0029a4270eb8d04c876c77d95731fx1": 100,
  "043c0a33462b8aab3ca57877a9784f24e9120db4facc04dfa3b7913557d055d8a18de29438110716bb7b2f8f3f74b8a5224d5fe84b5b0c6d357c546334123616c6": 50,
  "0482289d3b1786becb5f280468157e9d1a81ab2677b3b42e4fd4b40de4ea7e7fb77b23cba35b10de7cd09b321ae3aa2f6a5981b6e1314fbe73c8c759755c4334d5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
