require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const { loginController } = require("./controllers/auth-controller");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();

app.use(cors());
//middleware -> express.json()
app.use(express.json());

//all routes here
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the LMS API",
  });
});

app.use("/api/auth", authRoutes);
app.use("api/auth", loginController);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
