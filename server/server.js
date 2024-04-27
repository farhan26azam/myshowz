const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
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
const Feedback = require("./models/FeedbackSchema");
const Rank = require("./models/RankSchema");

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routes for signup and login
app.post("/signup", async (req, res) => {
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
    // return novels with active true
    const novels = await Novel.find({ active: true });
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
    const novel = await Novel.findById(id);

    res.status(200).json(novel);
  } catch (error) {
    console.error("Error fetching novel:", error);
    res.status(500).json({ error: "An error occurred fetching novel" });
  }
});

app.get("/novel/name/:name", async (req, res) => {
    const { name } = req.params;
    console.log("NAME: ", req.params || "NO NAME");
    try {
        const novel = await Novel.find({ title: name });
        res.status(200).json(novel);
    } catch (error) {
        console.error("Error fetching novel:", error);
        res.status(500).json({ error: "An error occurred fetching novel" });
    }
});

app.get("/writer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const writer = await Writer.findById(id).populate("rank");

    res.status(200).json(writer);
  } catch (error) {
    console.error("Error fetching writer:", error);
    res.status(500).json({ error: "An error occurred fetching writer" });
  }
});

app.post("/novel/feedback", async (req, res) => {
  const { feedback, readerid, novelid, writerid } = req.body;
  const existingFeedback = await Feedback.findOne({
    readerid,
    novelid,
    writerid,
  });


  Writer.findOne({ _id: writerid }).then(async (writer) => {
    // update writers score to the average of previous score and current feedback
    let newScore = 5;
    if (writer.score === 0 || writer.score === null) {
      newScore = parseInt(feedback);
    } else {
      newScore = (parseInt(feedback) + writer.score) / 2;
    }

    console.log(newScore);

    let newRank = "";
    if (newScore <= 4) {
      if (newScore > 3) {
        newRank = await Rank.findOne({rank: "expert"});
        console.log("expert");
      } else if (newScore > 2) {
        newRank = await Rank.findOne({rank: "intermediate"});
        console.log("intermediate")
      } else if (newScore > 1) {
        newRank = await Rank.findOne({rank: "beginner"});
        console.log("beginner")
      } else {
        newRank = await Rank.findOne({rank: "novice"});
        console.log("novice")
      }
    } else {
      newRank = await Rank.findOne({rank: "master"});
      console.log("master")
    }


    Writer.updateOne({_id: writerid}, {score: newScore, rank: newRank._id}).then(() =>
        console.log("Writer score updated successfully")
    );
  });

  if (existingFeedback) {
    // update feedback
    existingFeedback.feedback = feedback;
    return res.status(200).json({ message: "Feedback updated" });
  }
  const newFeedback = new Feedback({ feedback, readerid, novelid, writerid });


  newFeedback
    .save()
    .then(() =>
      res.status(201).json({ message: "Feedback added successfully" })
    )
    .catch((error) => res.status(500).json({ error: error.message }));
});

// get novels by name
app.get("/novels/search/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const novels = await Novel.find({
      title: { $regex: new RegExp(name, "i") },
    });
    res.status(200).json(novels);
  } catch (error) {
    console.error("Error fetching novels:", error);
    res.status(500).json({ error: "An error occurred fetching novels" });
  }
});

// Writer APIs
app.get("/novels/:writerid", async (req, res) => {
  const { writerid } = req.params;
  try {
    const novels = await Novel.find({ writerid });
    res.status(200).json(novels);
  } catch (error) {
    console.error("Error fetching novels:", error);
    res.status(500).json({ error: "An error occurred fetching novels" });
  }
});

app.post("/novel", async (req, res) => {
  const novelData = req.body;
  const { title, versionno, genres } = novelData;

  const existingNovel = await Novel.findOne({ title, versionno });
  if (existingNovel) {
    return res.status(202).json({ error: `This novel with ${versionno} already exists.` });
  }

  const newNovel = new Novel(novelData);

  try {
    await newNovel.save();

    // Iterate over each genre
    for (let genreObj of genres) {
      const genre = genreObj.genre;

      // Find readers subscribed to the current genre
      const readers = await Reader.find({ favoriteGenera: genre }, 'email');

      // Extract emails from readers
      const readerEmails = readers.map(reader => reader.email);

      // Send email to readers
      await sendEmailToReaders(readerEmails);
    }

    res.status(201).json({ message: "Novel created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/novel/:id", async (req, res) => {
      const {id} = req.params;
      try {
        await Novel.findByIdAndDelete(id);
        res.status(200).json({message: "Novel deleted successfully"});
      } catch (error) {
        console.error("Error deleting novel:", error);
        res.status(500).json({error: "An error occurred deleting novel"});
      }
    }
);

app.put("/novel/:id", async (req, res) => {
const { id } = req.params;
  const novelData = req.body;
  try {
    await Novel.findOneAndUpdate({ _id: id }, novelData);
    res.status(200).json({ message: "Novel updated successfully" });
    } catch (error) {
    console.error("Error updating novel:", error);
  }
});

app.post("/like", async (req, res) => {
    const { readerid, novelid } = req.body;
    try {
        const novel = await Novel.findById(novelid);
        if (!novel.likes.includes(readerid)) {
        novel.likes.push(readerid);
        await novel.save();
        res.status(200).json({ message: "Liked successfully" });
        } else {
        res.status(202).json({ error: "Already liked" });
        }
    } catch (error) {
        console.error("Error liking novel:", error);
        res.status(500).json({ error: "An error occurred liking novel" });
    }

});

// get all ranks
app.get("/ranks", async (req, res) => {
  try {
    const ranks = await Rank.find();
    res.status(200).json(ranks);
  } catch (error) {
    console.error("Error fetching ranks:", error);
    res.status(500).json({ error: "An error occurred fetching ranks" });
  }
});

//get rank by id
app.get("/rank/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("ID: ", id);
    const rank = await Rank.findById(id);
    console.log("Rank: ", rank)
    res.status(200).json(rank);
  } catch (error) {
    console.error("Error fetching rank:", error);
    res.status(500).json({ error: "An error occurred fetching rank" });
  }
});

async function sendEmailToReaders(emails) {
  try {
    // Assuming you have already defined the transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'zohaibrana969@gmail.com',
        pass: 'bwvh xvhq afis ehel',
      },
    });

    let mail = await transporter.sendMail({
      from: '"TaleCrafters" <zohaibrana969@gmail.com>',
      to: emails.join(','), // Corrected syntax with template literal
      subject: 'New Novel Uploaded of your interest!',
      text: 'Dear,\n\nYou have been notified that new novel upload on TaleCrafters that matches your favorite Genera.\n\nThank you for your commitment.\n\nSincerely,\nThe TaleCrafter Team',
    });

    console.log('Mail sent successfully:', mail);
  } catch (error) {
    console.error('Error sending mail:', error);
  }
}



app.put("/user", async (req, res) => {
  console.log("request body: " , req?.body);
  const { role, ...userData } = req.body;
  if (role === "reader") {
    try {
      await Reader.findOneAndUpdate({ _id: userData._id },
        { name: userData.name, email: userData.email, phone: userData.phone, age: userData.age, bio:userData.bio, gender: userData.gender });
      res.status(200).json({ message: "Reader email updated successfully" });
    } catch (error) {
      console.error("Error updating reader email:", error);
      res.status(500).json({ error: "An error occurred while updating reader email" });
    }
  } else if (role === "writer") {
    try {
      await Writer.findOneAndUpdate({ _id: userData._id }, { name: userData.name, email: userData.email, phone: userData.phone, age: userData.age, bio:userData.bio, gender: userData.gender });

      res.status(200).json({ message: "Writer email updated successfully" });
    } catch (error) {
      console.error("Error updating writer email:", error);
      res.status(500).json({ error: "An error occurred while updating writer email" });
    }
  } else {
    res.status(400).json({ error:`${role} is invalid` });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


