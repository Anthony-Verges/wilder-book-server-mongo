//server.js

const express = require("express");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const WilderModel = require("./models/Wilder");
const WilderController = require("./controllers/wilders");

const app = express();
//database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

//Middeware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//CE MIDDLEWARE N'EST PLUS UTILE ( remplacé par asyncHandler() )
// function runAsyncWrapper(callback) {
//   return function (req, res, next) {
//     callback(req, res, next).catch(next);
//   };
// }

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
  //test a wilder creation
  WilderModel.init().then(() => {
    const firstWilder = new WilderModel({
      name: "Wilder Anthony",
      city: "San Francisco",
      skills: [
        { title: "HTML", votes: 10 },
        { title: "React", votes: 5 },
      ],
    });
    firstWilder
      .save()
      .then((result) => {
        console.log("success:", result);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });
});

//CREATE
app.post("/api/wilders", asyncHandler(WilderController.create));
//GET Wilders
app.get("/api/wilders", asyncHandler(WilderController.retrieve));
//DELETE
app.delete("/api/wilders", asyncHandler(WilderController.delete));
//Update
app.put("/api/wilders", asyncHandler(WilderController.update));
//Mauvaise adresse
app.get("*", (req, res) => {
  res.status(404);
  res.send({ success: false, message: "Wrong adress" });
});

app.use((error, req, res, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    res.status(400);
    res.json({ success: false, message: "The name is already used" });
  }
});

//Start Server
app.listen(5000, () => console.log("Server started on 5000"));
