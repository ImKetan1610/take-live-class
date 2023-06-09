const express = require("express");
const dbConnect = require("./config/db");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoutes");
const eventRouter = require("./routes/eventRoutes");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 1234;

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);
app.use("/api/event", eventRouter);

app.use(notFound);
app.use(errorHandler);

app.use("/", (req, res) => {
  res.send(`server is started at ${PORT} port`);
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
