const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package

const app = express();
const port = 8000;

const Novel = require("./models/NovelSchema");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://farhanazamdev:farhan123myshowz@myshowz.xpxe3zb.mongodb.net/myshowz",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import and use Reader and Writer models
const Reader = require("./models/ReaderSchema");
const Writer = require("./models/WriterSchema");
const Genre = require("./models/GenreSchema");

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routes for signup and login
app.post("/signup",async (req, res) => {
  const { role, ...userData } = req.body;
  console.log("role", role);
  if (role === "reader") {
    const newReader = new Reader(userData);
    newReader
      .save()
      .then(() =>
        res.status(201).json({ message: "Reader created successfully" })
      )
      .catch((error) => res.status(500).json({ error: error.message }));
  } else if (role === "writer") {
    const newWriter = new Writer(userData);

    const highestIdWriter = await Writer.findOne().sort({ id: -1 });
    
    const newId = highestIdWriter ? highestIdWriter.id + 1 : 1;

    newWriter.id = newId;
    
    newWriter
      .save()
      .then(() =>
        res.status(201).json({ message: "Writer created successfully" })
      )
      .catch((error) => res.status(500).json({ error: error.message }));
  } else {
    res.status(400).json({ error: "Invalid role" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  let userModel;

  // Determine which model to use based on role
  if (role === "reader") {
    userModel = Reader;
  } else if (role === "writer") {
    userModel = Writer;
  } else {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    // Find the user by email and password
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If user is found and credentials are correct, return success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

app.get("/novels", async (req, res) => {
  // return all novels
  try {
    const novels = await Novel.find();
    res.status(200).json(novels);
  } catch (error) {
    console.error("Error fetching novels:", error);
    res.status(500).json({ error: "An error occurred fetching novels" });
  }
});

app.get("/novels/featured", async (req, res) => {
  try {
    // fetch novels having isFeatured as true
    const novels = await Novel.find({ isFeatured: true });
    res.status(200).json(novels);
  } catch (error) {
    console.error("Error fetching novels:", error);
    res.status(500).json({ error: "An error occurred fetching novels" });
  }
});

app.get("/writers", async (req, res) => {
  // return all writers
  try {
    const writers = await Writer.find();
    res.status(200).json(writers);
  } catch (error) {
    console.error("Error fetching writers:", error);
    res.status(500).json({ error: "An error occurred fetching writers" });
  }
});

app.get("/genres", async (req, res) => {
  // return all genres
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "An error occurred fetching genres" });
  }
});

app.get("/novel/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const novel = await Novel.findById(id).populate('writerid');
    res.status(200).json(novel);
  } catch (error) {
    console.error("Error fetching novel:", error);
    res.status(500).json({ error: "An error occurred fetching novel" });
  }
});

app.get("/writer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const writer = await Writer.findById(id);
    res.status(200).json(writer);
  } catch (error) {
    console.error("Error fetching writer:", error);
    res.status(500).json({ error: "An error occurred fetching writer" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
