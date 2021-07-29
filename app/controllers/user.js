const {
  hashPassword,
  isValidEmail,
  generateToken,
  validatePassword,
  comparePassword,
} = require("../helpers/validation");
const User = require("../models/user");

/**
 * @param {object} req
 * @returns {object} res
 */
const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, image } = req.body;

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .send({ error: { message: "Enter a valid email address" } });
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .send({ error: { message: "Password must be 8 characters or more" } });
  }
  const hashedPassword = hashPassword(password);
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    phoneNumber: phoneNumber,
    image: image,
  });
  try {
    const data = await user.save();
    const token = generateToken(data._id);
    console.log({ token: token, data: data });
    res.status(200).send({ data: data, token: token });
  } catch (error) {
    res.status(500).send({ error: { message: "An error occured" } });
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = {};
    const data = await User.findOne({ email });

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;

    if (!comparePassword(data.password, password)) {
      return res.status(400).send({ error: { message: "Incorrect password" } });
    }
    const token = generateToken(data._id);
    return res.status(200).send({ userInfo: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: { message: error } });
  }
};

const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const data = await User.findOne({ email });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, login };
