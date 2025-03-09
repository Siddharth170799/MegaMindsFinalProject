import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {     //// middleware which cjecks whether the token is there in the req body
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "my_secret_key");    /// here we are decoding the token using jwt.verify function
    req.user = decoded;                                      /// where we compare the token with the secret key
    next();// if token exists then the next function is being called which calls the route handler function
  } catch (error) {
    res.status(403).json({ message: "Forbidden - Invalid Token" });
  }
};

export default authMiddleware;
