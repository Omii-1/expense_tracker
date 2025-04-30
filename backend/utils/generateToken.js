import jwt from "jsonwebtoken"

const generateTokenSetCookies = (userId, res) => {

  const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })

  const isProduction = process.env.NODE_ENV === "PROD";
  const samesite =isProduction ? "none" : "lax"

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    samesite: samesite,
    secure: isProduction
  })

  res.cookie("id", userId, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: samesite,
    secure: isProduction
  })

}

export default generateTokenSetCookies;