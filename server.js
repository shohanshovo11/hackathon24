const express = require("express");
const mongoose = require("mongoose");
const app = express();
const uri =
  "mongodb+srv://waterhorse08:123@hackathon.i8cmqm5.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

app.listen(5000, console.log("Server is running on port 5000"));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/api/books", (req, res) => {});
