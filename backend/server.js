const express = require("express");
const app = express();
const cors = require("cors");
// const mongoSanitize = require("express-mongo-sanitize"); // Removed - causes issues with Bun
const { apiLimiter } = require("./middleware/rateLimiter");
const port = 3000;
app.use(express.json());
app.use(cors());
// app.use(mongoSanitize({ replaceWith: "_" })); // Removed - your validation middleware handles this

// Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

require("./connect/connect");

const userRoute = require("./routes/user.route");
const contactRoute = require("./routes/contact.routes");

app.use("/user", userRoute);
app.use("/contact", apiLimiter, contactRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
