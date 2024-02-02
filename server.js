const express = require("express");
const mongoose = require("mongoose");
const Book = require("./model/bookModel");
const app = express();
const uri =
  "mongodb+srv://waterhorse08:123@hackathon.i8cmqm5.mongodb.net/hackathon";
mongoose.connect(uri);
app.use(express.json());
app.listen(5000, console.log("Server is running on port 5000"));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/api/books", async (req, res) => {
  try {
    console.log(req.body);
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
