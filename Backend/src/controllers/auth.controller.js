import { User } from "../model/user.model.js";

export const registerUser = async (req, res) => {
  const { username, email, password, role, fullname } = req.body;

  if (!username || !email || !password || !fullname) {
    return res.status(404).json({
      message: "All fields are required",
    });
  }
  console.log(email);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      fullname,
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "User Not Registered",
      });
    }

    res.status(201).json({
      message: "User registered sucessfully",
      success: true,
      userId: user._id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(400).json({
      message: "User not registered",
      error: error.message,
      success: false,
    });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    throw new ApiError(400, "Email and Password is required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "User not found!"
      })
    }
    
    console.log("Login Sucessful");
    res.status(200).json({
      success: true,
      message: "User Loged in successful"
    })
  } catch (error) {
    console.log('Error in login is : ' , error)
    res.status(500).json({
      success: false,
      message: "User login failed"
    })
  }
};