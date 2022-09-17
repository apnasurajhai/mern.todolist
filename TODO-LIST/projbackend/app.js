require("dotenv").config();
const { mongoose } = require("mongoose");
const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const user = require("./models/user");
const Task = require("./models/task");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });
app.use(cors());
const port = 8000;
app.use(express.json());
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ userName: username }).exec();
  if (exists) {
    res.status(500);
    res.json({
      message: "User Already exists",
    });
    return;
  }

  const user = new User({ userName: username, password: password });

  user.save();

  res.json({ message: "Sucess" });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ userName: username }).exec();
  if (!exists || exists.password !== password) {
    res.status(403);
    res.json({
      message: "User not exists",
    });
    return;
  }

  res.json({ message: "Sucess" });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosList = req.body;
  const exists = await User.findOne({ userName: username }).exec();
  if (!exists || exists.password !== password) {
    res.status(403);
    res.json({
      message: "User not exists",
    });
    return;
  }
  // console.log(exists);

  const todosExist = await Task.findOne({ userId: exists._id }).exec();
  // console.log(todosExist);
  if (!todosExist) {
    const todo = new Task({ userId: exists._id, tasks: todosList });
    // console.log(todosExist);
    todo.save();
  } else {
    todosExist.tasks = todosList;
    await todosExist.save();
  }
});
app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosList = req.body;
  const exists = await User.findOne({ userName: username }).exec();
  if (!exists || exists.password !== password) {
    res.status(403);
    res.json({
      message: "User not exists",
    });
    return;
  }
  // console.log(exists);

  await Task.findOne({ userId: exists._id }).then((t) => {
    res.json(t.tasks);
  });

  // console.log(todosExist);
});

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
