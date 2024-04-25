const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
