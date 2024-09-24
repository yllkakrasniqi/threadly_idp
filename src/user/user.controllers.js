const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require('../config');
const User = require("../models/User");

const jwt_secret_key = config.jwt.secret_key

const getProfile = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }

  jwt.verify(token, jwt_secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Unauthorized!" });
    }
    req.id = decoded.id;
  });

  if(!req.id){
    return
  }

  const authToken = jwt.sign(
    { id: req.id.valueOf() },
    jwt_secret_key,
    {
      expiresIn: "30m",
    }
  );
  const refreshToken = jwt.sign(
    { id: req.id.valueOf() },
    jwt_secret_key,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).send({ authToken, refreshToken, message: "Success" });
}

const   signup = async (req, res) => {
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
  const hashPassword = bcrypt.hashSync(req.body.password, 8);

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
    country
  });
  await newUser.save();

  /**
   * Create two tokens for the user, token for authentication
   * and one for refresh token
   */
  const authToken = jwt.sign({ id: newUser._id.valueOf() }, jwt_secret_key, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(
    { id: newUser._id.valueOf() },
    jwt_secret_key,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).send({
    authToken,
    refreshToken,
  });
};

const login = async (req, res) => {
  // Get email and password from body
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || email?.trim() === "" || !password || password?.trim() === "") {
    return res.status(400).send({ message: "Email or passwrod is missing" });
  }

  // Check if user does not exist
  const account = await User.findOne({email: email})
  if(!account){
    return res.status(404).send({ message: "User not found" });
    // return res.status(401).send({ message: "Invalid username or password" });
  }

  // Check if password is valid
  var passwordIsValid = bcrypt.compareSync(
    password,
    account.password
  )   
  if( !passwordIsValid ){
    return res.status(401).send({message:"Invalid Password!"})
  }

  /**
   * Create two tokens for the user, token for authentication
   * and one for refresh token
   */
  const authToken = jwt.sign({ id: account._id.valueOf() }, jwt_secret_key, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(
    { id: account._id.valueOf() },
    jwt_secret_key,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).send({ 
    authToken, 
    refreshToken
  });
};


const logout = async (req, res) => {
    // req.session = null
    return res.status(200).send({message:"You've been signed out!"})
}

module.exports = {
    getProfile,
    signup,
    login,
    logout
}