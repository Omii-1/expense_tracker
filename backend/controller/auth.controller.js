import bcrypt from "bcryptjs"
import zod from "zod"

import { User } from "../model/user.model.js" 
import generateTokenSetCookies from "../utils/generateToken.js"

const signupBody = zod.object({
  fullname: zod.string().min(4),
  email: zod.string().email(),
  password: zod.string().min(6)
}).strict()

const loginBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6)
}).strict()

// signip
export const signupController = async (req, res) => {
  try {
    const validation = signupBody.safeParse(req.body)

    if(!validation.success){
      return res.status(400).json({
        error: validation.error.format()
      })
    }

    const {fullname, email, password} = req.body

    const user = await User.findOne({email})
    if(user){
      return res.status(400).json({
        error: "User already exist"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullname, email, password: hashPass
    })

    if(newUser){
      generateTokenSetCookies(newUser._id, res)

      await newUser.save()

      return res.status(201).json({
        message: "User created successfully",
        _id: newUser._id
      })
    } else {
      return res.status(400).json({
        error: "Invalid user data"
      })
    }

  } catch (error) {
    console.log("Error in signup controller", error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

// login
export const signinController = async (req, res) => {
  try {
    const {email, password} = req.body
    const validation = loginBody.safeParse({email, password})

    if(!validation.success){
      return res.status(400).json({
        error: validation.error.format()
      })
    }

    const user = await User.findOne({email})
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect){
      return res.status(400).json({
        error: "Invalid username and password"
      })
    }

    generateTokenSetCookies(user._id,  res)

    return res.status(201).json({
      message: "Login successfully",
      _id: user._id,
    })

  } catch (error) {
    console.log("Error in login controller: ", error);
    return res.status(500).json({
      error: "Internal server error"
    })
    
  }
}

// check
export const checkCookies = async(req, res) => {
  try {
    const {jwt, id} = req.cookies

    if(!jwt || !id){
      return res.status(401).json({
        isAuthenticated: false,
        error: "User is not authenticated"
      })
    }

    return res.status(201).json({
      message: "User is authenticated",
      isAuthenticated: true,
      id
    })
  } catch (error) {
    console.log("Error in checkCookies controller: ", error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}