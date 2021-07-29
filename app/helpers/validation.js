const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Check if email is a valid email helper method
 * @param {string} email
 * @returns {Boolean} true or false
 */

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
 * Check password is not less than 8 characters
 * @param {string} password
 * @returns {Boolean} True or False
 */

const validatePassword = (password) => {
  if (password.length < 8 || password === "") {
    return false;
  }
  return true;
};

/**
 * Hash password
 * @param {string} password
 * @returns {string} hashedpassword
 */
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

/**
 * Compare password
 * @param {string} password
 * @param {string} hashPassword
 * @returns {Boolean} True or false
 */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

/**
 * Generate token
 * @returns {string} token
 */
const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 600 * 60 });

module.exports = {
  isValidEmail,
  hashPassword,
  comparePassword,
  validatePassword,
  generateToken,
};
