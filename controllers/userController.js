import bcrypt from "bcrypt";
import User from "../models/userModels.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    console.log(email);

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.send("User is already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);

    res.cookie("token", token);
    res.send("Signed successfully!");
    console.log("token : ", token);
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

// signin

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    console.log(matchPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send({
      message: "Logged in!",
      success: true,
      token: token,
    });
    console.log("token : ", token);
  } catch (error) {
    console.log(error, "Something wrong");
    res
      .status(500)
      .send({
        err: "Internal Server Error",
        success: false,
        token: token,
      });
  }
};
