const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { generateKeyPair } = require("crypto");
const { connectToDatabase } = require("./dbconnection");


// Routes import here
const userRouter = require("./routes/user");
const {logResponce}= require("./middleware");

const app = express();
const PORT = 8000; 

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logResponce("log.txt"));

//db connection and schema
connectToDatabase();

//Routes
app.use("/api/user", userRouter);


app.get("/users", async (req, res) => {
  const alldbusers = await User.find({});
  const html = `<ul>
    ${alldbusers
      .map((user) => `<li>${user.first_name} - </li> <li>${user.email}</li>`)
      .join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/user", async (req, res) => {
  const alldbusers = await User.find({});
  res.json(alldbusers);
});

app.get(`/api/user/:id`, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ err: "user not found" });
  }
});

app.post("/api/user", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  } else {
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });
    console.log(result);
    return res.status(200).json({ msg: "Success" });
  }
  //   users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
});

app.patch("/api/user/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });

  return res.json({ status: "updated"});
});

app.delete("/api/user/:id", (req, res) => {
  //delete the user with id
  const id = Number(req.params.id);
  generateKeyPair;
  const user = users.findIndex((user) => user.id === id);
  if (user === -1) {
    return res.json({ status: "user not found" });
  } else {
    users.splice(user, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        return res.status(500).json({ status: "error" });
      }
      return res.json({ status: "user deleted" });
    });
  }
});

app.listen(PORT, () => console.log("CRUD Server is runnning on 8000"));
