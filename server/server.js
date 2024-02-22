const express = require("express");
const mongoose = require('mongoose');

const app = express();
const port = 8000;

mongoose.connect('mongodb+srv://farhanazamdev:farhan123myshowz@myshowz.xpxe3zb.mongodb.net/myshowz', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ user, token });
  }
  res.json({ error: "Invalid email or password" });
});


