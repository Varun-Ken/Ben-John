import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
export const registerController = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ userName: userName });
    if (userExists) {
      console.log(`User Name Already Exists`);
      return res.json({
        success: false,
        message: "User Name Already Exists",
        target: "userName",
      });
    }

    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!regex.test(email)) {
      return res.json({
        success: false,
        message: "Invalid Email ID",
        target: "email",
      });
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.json({
        success: false,
        message: "Email Already Exists",
        target: "email",
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password should be of atleast 6 characters",
        target: "password",
      });
    }
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    console.log(`User is Registered Successfully`);
    return res
      .status(201)
      .json({ success: true, message: "User Registered Successfully" });
  } catch (error) {
    console.log(`Error in the Register Controller`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//login
export const loginController = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userExists = await User.findOne({ userName: userName });

    if (!userExists) {
      console.log("User doesn't exist");
      return res.json({
        success: false,
        message: "User doesn't exist",
        target: "userName",
      });
    }

    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return res.json({
        success: false,
        message: "Invalid Password",
        target: "password",
      });
    }

    const token = jwt.sign(
      { id: userExists.id, role: userExists.role, email: userExists.email, userName:userExists.userName },
      "secretkey",
      { expiresIn: "1d" }
    );
    console.log(`User is Logged In Successfully`);
    userExists.password = null;
    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "User Logged In Successfully",
      user: userExists,
    });
  } catch (error) {
    console.log(`Error in the Login Controller`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//logout
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "User Logged Out Successfully" });
  } catch (error) {
    console.log(`Error in the Logout Controller`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Auth Middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log(`No Token, Authorization Denied`);
    return res
      .status(401)
      .json({ success: false, message: "No Token, Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next(); 
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User" });
  }
};
