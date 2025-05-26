const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use environment variables

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Extract token from "Bearer <token>"
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format. Use 'Bearer <token>'" });
    }

    const decoded = jwt.verify(tokenParts[1], JWT_SECRET);

    req.admin = decoded.userId; // Set userId from token
    req.role = decoded.role; // Set role (if applicable)

    next(); // Continue to the next middleware
  } catch (error) {
    console.error("❌ Authentication Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
