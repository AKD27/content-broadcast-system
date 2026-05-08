const User            = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { sendSuccess, sendError } = require("../utils/response");

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return sendError(res, "An account with this email already exists.", 409);
    }

    const user = await User.create({ name, email, password, role: role || "teacher" });
    const token = generateToken(user._id);

    return sendSuccess(
      res,
      { token, user },
      "Account created successfully.",
      201
    );
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required.", 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, "Invalid email or password. Please try again.", 401);
    }

    if (!user.isActive) {
      return sendError(res, "Your account has been deactivated. Contact admin.", 403);
    }

    const token = generateToken(user._id);

    user.password = undefined;

    return sendSuccess(res, { token, user }, "Login successful.");
  } catch (err) {
    next(err);
  }
};


const getMe = async (req, res) => {
  return sendSuccess(res, { user: req.user }, "User fetched successfully.");
};


const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.comparePassword(currentPassword))) {
      return sendError(res, "Current password is incorrect.", 401);
    }

    user.password = newPassword;
    await user.save();

    return sendSuccess(res, {}, "Password changed successfully.");
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, changePassword };
