const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/User')
const authConfig = require("../config/auth");

exports.signup = async (req, res) => {
  // Get data from body of request
  const { firstname, lastname, email, password, country } = req.body;

  // Check if any data is missing
  if (
    !firstname ||
    firstname.trim() === "" ||
    !lastname ||
    lastname.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    !country ||
    country.trim() === ""
  ) {
    return res.status(400).send({ message: "Missing required parameters" });
  }

  // Encript password
  const hashPassword = bcrypt.hashSync(req.body.password, 8)

  // Check if a user already exist with the same E-mail
  const records = await User.find({ email: email });
  if (records.length > 0) {
    return res
      .status(400)
      .send({ message: "A user with this email already exist" });
  } 

  // Create the new user
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });
  await newUser.save();

  /**
   * Create two tokens for the user, token for authentication
   * and one for refresh token
   */
  const authToken = jwt.sign(
    { id: newUser._id.valueOf() },
    authConfig.secret,
    {
      expiresIn: "30m",
    }
  );
  const refreshToken = jwt.sign(
    { id: newUser._id.valueOf() },
    authConfig.secret,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).send({ 
    authToken, 
    refreshToken
  });

};
