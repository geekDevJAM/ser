const { Users } = require("../models/users");
const { validateUser, validateLogin } = require("../validation/vld_users");
const bcrypt = require("bcrypt");

// Login
const userLogin = async (req, res) => {
  const data = req.body;
  const { error } = validateLogin(data);
  if (error) return res.status(400).json({ message: `${error.message}` });

  try {
    // 1. Find the user in the database by username
    const checkUser = await Users.findOne({ username: data.username });
    // 2. If user does not exist, return error
    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }
    // 3. Compare the candidate password with the stored hash
    const isMatch = await bcrypt.compare(data.password, checkUser.password);
    // 4. If passwords match, return success response
    if (isMatch) {
      return res.status(200).json({ message: "Account found" });
    } else {
      // If password does not match, return error
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    // If there was an error with the database or other processing
    return res
      .status(500)
      .json({ message: "Error signing in", error: error.message });
  }
};

const registerUser = async (req, res) => {
  const data = req.body;
  const { error } = validateUser(data);
  if (error) return res.status(400).json({ message: `${error.message}` });

  try {
    //check if email exist
    const checkEmail = await Users.findOne({ email: data.email });
    if (checkEmail)
      return res.status(400).json({ message: "Email already exist" });

    //check if user exist
    const checkUser = await Users.findOne({ username: data.username });
    if (checkUser)
      return res.status(400).json({ message: "Username already exist" });

    //transform password
    //generate salt
    /**const salt = await bcrypt.genSalt(10);
     * data.password = await bcrypt.hash(data.password, salt)
     *
     */

    const newUser = new Users({
      email: data.email,
      username: data.username,
      password: (data.password = await bcrypt.hash(
        data.password,
        await bcrypt.genSalt(10)
      )),
      name: data.name,
      role: data.role,
    });
    await newUser.save();
    res.status(200).json({ message: "Account has been created" });
  } catch (er) {
    res.status(400).json({ message: `${er.message}` });
  }
};

const deleteUser = async (req, res) => {
  const data = req.body;
  // console.log(data);
  // check if user exist
  const checkUser = await Users.findOne({ username: data.username });
  if (!checkUser) return res.status(404).send("User not found");
  let user = await Users.deleteOne({ username: data.username });
  res.status(200).send("User Deleted");
};

const updateUser = async (req, res) => {
  const data = req.body;
  // console.log(data);
  // check if user exist
  const checkUser = await Users.findOne({ username: data.username });
  if (!checkUser) return res.status(404).send("User not found");

  let user = await Users.updateOne(
    { username: data.username }, // filter
    {
      $set: {
        username: data.username,
        // Hash the password using bcrypt
        password: (data.password = await bcrypt.hash(
          data.password,
          await bcrypt.genSalt(10)
        )),
      },
    }
  ); //update data
  res.status(200).json({ message: "Account has been updated" });
};
module.exports = { registerUser, deleteUser, updateUser, userLogin };
