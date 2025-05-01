import jwt, { decode } from "jsonwebtoken"
import { User } from "../model/user.model.js"

const userAuth = async (req, res, next) => {
  try {
    let token;

    if(req.cookies.jwt) {
      token = req.cookies.jwt
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1]
    }

    if(!token) {
      return res.status(401).json({
        error: "Unauthorized: No token provided"
      })
    }
    // console.log("Received token: ", token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select("-password")
  
    if(!user){
      return res.status(404).json({
        error: "User not found"
      })
    }

    req.user = user

    next()
  } catch (error) {
    console.log("Error in Auth middleware: ", error)
    return res.status(403).json({
      error: "Forbidden: Invalid or expired token"
    })
  }
}

export default userAuth