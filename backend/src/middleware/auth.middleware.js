const { verifyToken } = require("../utils/jwt");
const User            = require("../models/User");
const { sendError }   = require("../utils/response");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, "Not authorised. No token provided.", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return sendError(res, "User no longer exists.", 401);
    }
    if (!user.isActive) {
      return sendError(res, "Your account has been deactivated.", 403);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return sendError(res, "Session expired. Please log in again.", 401);
    }
    return sendError(res, "Invalid token. Please log in again.", 401);
  }
};


const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        `Access denied. This route is for ${roles.join(", ")} only.`,
        403
      );
    }
    next();
  };
};

module.exports = { protect, restrictTo };
