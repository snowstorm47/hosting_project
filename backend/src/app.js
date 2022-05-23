const express = require("express");
require("dotenv").config();

const history = require("connect-history-api-fallback");

const coachRoutes = require("./routes/coach");
const instructorRoutes = require("./routes/instructor");
const authRoutes = require("./routes/auth");
const { connect } = require("./db/db");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
var root = "public";
app.use(history({ index: "index.html" }));
app.use("/frontend", express.static(root));
app.use(express.json());
app.use("/api/v1/images", express.static(path.join(process.cwd(), "uploads")));
// app.use('/zoo',express.static("public"));
app.use("/api/v1", authRoutes);
app.use("/api/v1", coachRoutes);
app.use("/api/v1", instructorRoutes);
const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await connect();
  console.log("app started");
});
