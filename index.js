const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const connectDB = require("./src/db");
const userRoutes = require('./src/user/user.routes')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "auth-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});


//api/user/ - this better as a route
app.use('/', userRoutes)

app.listen(PORT, () => {
    connectDB().then(() => {
        console.log(`Server listening on ${PORT}`);
    })
});
