const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postRoutes");
const catRoutes = require("./routes/catRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const { notFound, errorResponseHandler } = require("./middleware/errorHandler");
const commentRoute = require("./routes/commentRoute");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/messages", (req, res) => {
  res.send("Hello");
});
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(fileUpload({}));
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", postsRoutes);
app.use("/api/v1/", catRoutes);
app.use("/api/v1", commentRoute);

app.use(notFound);
app.use(errorResponseHandler);

const connectBackend = async () => {
  try {
    connectDB(process.env.MONGO_URL);

    app.listen(process.env.PORT, () =>
      console.log(`Sever connected on ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
connectBackend();
