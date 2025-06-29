const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/notes");
const connection = require("./database");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.status(200).send("test");
});

app.listen(PORT, () => {
  console.log("Server has started. Listening on port " + PORT);

  connection.connect(() => {
    console.log("Connected to the database");
  });
});
