const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { generateKeyPair } = require("crypto");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

//Routes
app.get("/users", (req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/user", (req, res) => {
  res.json(users);
});

app.get(`/api/user/:id`, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({err:"user not found"});
  }
});

app.post("/api/user", (req, res) => {
  //TODO eg. :- Create a new user
  const body = req.body;
  //   console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.patch("/api/user/:id", (req, res) => {
  //edit the current user with id
  const id = Number(req.params.id);
  const body = req.body;
  const user = users.find((user) => user.id === id);
  Object.assign(user, body);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.status(500).json({ status: "error" });
    }
    console.log(user);
    return res.json({ status: "updated", id });
  });
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
