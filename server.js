require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("mongodb connected");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("app listening to port", port);
});
