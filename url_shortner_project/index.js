const express = require("express");
const { connectToDatabase } = require("./dbconnection");
const urlRoutes = require("./routes/url");
const URL = require("./models/url");
const path = require('path');
const staticRoute = require("./routes/staticRouter")


const app = express();
const PORT = 8005;

//db connection and schema
connectToDatabase();

//set engine
app.set("view engine", "ejs");
app.set('views', path.resolve("./views") )

app.use(express.json());
//middleware for form data
app.use(express.urlencoded({extended: false}))


app.get("/test", async(req, res)=>{
  const allUrls = await URL.find({});
  return res.render('home', {
    urls: allUrls,
  });
});


//api call
app.use("/url", urlRoutes);
app.use("/", staticRoute)

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
    },
    {
      new: true, // This will return the updated document
    }
  );
  if (!entry) {
    return res.status(404).send("URL not found");
  }
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("CRUD Server is runnning on 8005"));
