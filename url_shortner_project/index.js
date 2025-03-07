const express = require("express");
const { connectToDatabase } = require("./dbconnection");
const urlRoutes = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8005;

//db connection and schema
connectToDatabase();

app.use(express.json());
//api call
app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        vistHistory: {
            timestamp: Date.now()
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("CRUD Server is runnning on 8005"));
