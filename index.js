const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./app/routes/api/posts");
const authRoutes = require("./app/routes/api/auth");
const { MONGO_URI } = require("./config");

const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

const port = 5005;

var corsOptions = {
  origin: "http://localhost:5005",
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Welcome to notes api" }));

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen(port);

console.log(`App running on port http://localhost:${port} 🚀`);
