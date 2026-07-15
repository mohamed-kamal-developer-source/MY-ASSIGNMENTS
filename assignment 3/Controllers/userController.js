const client = require("../pg");
const asyncErrorHandeler = require("../Utils/asyncErrorHandeler");
const customError = require("../Utils/customError");
const response = require("../Utils/response");
const validationData = require("../Utils/validation");

const jwt = require("jsonwebtoken");
const util = require("util");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const signToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
  return token;
};

exports.signUp = asyncErrorHandeler(async (req, res, next) => {
  const { name, email, confirmPassword } = req.body;
  let password = req.body.password;
  validationData(name, email, confirmPassword, password);

  if (password !== confirmPassword) {
    return next(
      new customError("password && confirm password is not match", 400),
    );
  }
  password = await bcrypt.hash(password, 12);

  const query = `
    INSERT INTO users (name, email, password_hash)
    VALUES($1,$2,$3)
    RETURNING id, name, email`;

  const values = [name, email, password];

  const user = await client.query(query, values);

  if (!user.rowCount) {
    return next(new customError("no user created", 404));
  }

  response(res, 201, {
    message: "User Created Successfully",
    user: user.rows[0],
  });
});

exports.signIn = asyncErrorHandeler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new customError("email && password is required", 401));
  }
  const query = "SELECT * FROM users WHERE email = $1 AND active = true";
  const values = [email];
  const user = await client.query(query, values);

  if (!user.rowCount) {
    return next(new customError("invalid email or password", 401));
  }

  const hashPassword = user.rows[0].password_hash;
  const isMatch = await bcrypt.compare(password, hashPassword);

  if (!isMatch) {
    return next(new customError("invalid password. please try again", 401));
  }

  delete user.rows[0].password_hash;

  const token = signToken(user.rows[0].id);

  response(res, 200, { token: token, user: user.rows[0] });
});

exports.protect = asyncErrorHandeler(async (req, res, next) => {
  const testToken = req.headers.authorization;
  let token;

  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    return next(new customError("there is no token. please try again", 401));
  }

  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY,
  );
  const id = decodedToken.id;

  const query =
    "SELECT id, name, email,role FROM users WHERE id = $1 AND active = true";
  const values = [id];
  const user = await client.query(query, values);

  if (!user.rowCount) {
    return next(new customError("no user found", 404));
  }

  req.user = user.rows[0];

  next();
});
