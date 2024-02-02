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
app.put("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const existingBook = await Book.findOne({ id: bookId });
    console.log(existingBook);
    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    existingBook.title = req.body.title;
    existingBook.author = req.body.author;
    existingBook.genre = req.body.genre;
    existingBook.price = req.body.price;

    const updatedBook = await existingBook.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/books", async (req, res) => {
  const { title, author, genre, sort, order } = req.query;
  const sortOptions = {};
  if (sort) {
    sortOptions[sort] = order === "DESC" ? -1 : 1;
  } else {
    sortOptions.id = 1;
  }
  try {
    const query = {};
    if (title) query.title = title;
    if (author) query.author = author;
    if (genre) query.genre = genre;
    console.log(query);
    const foundBooks = await Book.find(query).sort(sortOptions);
    res.status(200).json({ books: foundBooks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.find({ id: bookId });
    console.log(book);

    if (book.length > 0) {
      res.status(200).json(book);
    } else {
      res
        .status(404)
        .json({ message: `Book with id: ${bookId} was not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/books", async (req, res) => {
  try {
    const allBooks = await Book.find().sort({ id: 1 });
    res.status(200).json({ books: allBooks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
