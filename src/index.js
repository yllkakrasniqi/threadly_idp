const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const config = require('./config');
const connectDB = require("./db");
const userRoutes = require('./user/user.routes')

const PORT = config.app.port;

const app = express();

app.use(
  cors({
    origin: config.app.cors_origin, 
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
app.use('/user', userRoutes)

app.listen(PORT, () => {
    connectDB().then(() => {
        console.log(`Server listening on ${PORT}`);
    })
});
