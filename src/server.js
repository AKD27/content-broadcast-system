require("dotenv").config();

const express      = require("express");
const cors         = require("cors");
const morgan       = require("morgan");
const path         = require("path");
const connectDB    = require('./config/db');
const authRoutes   = require("./routes/auth.routes");
const contentRoutes= require("./routes/content.routes");
const errorHandler = require("./middleware/error.middleware");

const app  = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors({
  origin:      process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use("/api/auth",    authRoutes);
app.use("/api/content", contentRoutes);


app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
});
