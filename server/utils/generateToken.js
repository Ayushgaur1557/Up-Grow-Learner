import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  const isProduction = process.env.NODE_ENV === "production";

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: isProduction,                  // required on Vercel (HTTPS)
      sameSite: isProduction ? "none" : "lax", // allow cross-site in prod
      maxAge: 24 * 60 * 60 * 1000,           // 1 day
    })
    .json({
      success: true,
      message,
      user,
    });
};

// import jwt from "jsonwebtoken";

// export const generateToken = (res, user, message) => {

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    
//     return res
//     .status(200)
//     .cookie("token", token, { 
//        httpOnly: true, 
//        sameSite: 'strict', 
//        maxAge: 24 * 60 * 60 * 1000,
//      }).json({
//          success:true,
//          message,
//          user
//     });
// }