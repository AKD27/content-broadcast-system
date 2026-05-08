const Content         = require("../models/Content");
const path            = require("path");
const { sendSuccess, sendError } = require("../utils/response");

const fileUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

const uploadContent = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, "Please upload an image file.", 400);
    }

    const { title, subject, description, startTime, endTime, rotationDuration } = req.body;

    if (new Date(endTime) <= new Date(startTime)) {
      return sendError(res, "End time must be after start time.", 400);
    }

    const content = await Content.create({
      title,
      subject,
      description:      description || "",
      fileUrl:          fileUrl(req, req.file.filename),
      fileType:         req.file.mimetype,
      fileName:         req.file.filename,
      startTime:        new Date(startTime),
      endTime:          new Date(endTime),
      rotationDuration: rotationDuration ? Number(rotationDuration) : 30,
      teacher:          req.user._id,
      teacherName:      req.user.name,
      status:           "pending",
    });

    return sendSuccess(res, { content }, "Content uploaded successfully.", 201);
  } catch (err) {
    next(err);
  }
};


const getMyContent = async (req, res, next) => {
  try {
    const content = await Content.find({ teacher: req.user._id })
      .sort({ createdAt: -1 });
    return sendSuccess(res, { content });
  } catch (err) {
    next(err);
  }
};


const getMyStats = async (req, res, next) => {
  try {
    const [total, pending, approved, rejected] = await Promise.all([
      Content.countDocuments({ teacher: req.user._id }),
      Content.countDocuments({ teacher: req.user._id, status: "pending" }),
      Content.countDocuments({ teacher: req.user._id, status: "approved" }),
      Content.countDocuments({ teacher: req.user._id, status: "rejected" }),
    ]);
    return sendSuccess(res, { stats: { total, pending, approved, rejected } });
  } catch (err) {
    next(err);
  }
};


const getAllContent = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== "all") filter.status = status;

    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { title:       { $regex: q, $options: "i" } },
        { subject:     { $regex: q, $options: "i" } },
        { teacherName: { $regex: q, $options: "i" } },
      ];
    }

    const content = await Content.find(filter)
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    return sendSuccess(res, { content });
  } catch (err) {
    next(err);
  }
};


const getPrincipalStats = async (req, res, next) => {
  try {
    const [total, pending, approved, rejected] = await Promise.all([
      Content.countDocuments(),
      Content.countDocuments({ status: "pending" }),
      Content.countDocuments({ status: "approved" }),
      Content.countDocuments({ status: "rejected" }),
    ]);
    return sendSuccess(res, { stats: { total, pending, approved, rejected } });
  } catch (err) {
    next(err);
  }
};


const getPendingContent = async (req, res, next) => {
  try {
    const content = await Content.find({ status: "pending" })
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });
    return sendSuccess(res, { content });
  } catch (err) {
    next(err);
  }
};


const getLiveContent = async (req, res, next) => {
  try {
    const now = new Date();
    const content = await Content.find({
      teacher:   req.params.teacherId,
      status:    "approved",
      startTime: { $lte: now },
      endTime:   { $gte: now },
    }).sort({ startTime: 1 });

    return sendSuccess(res, { content });
  } catch (err) {
    next(err);
  }
};


const approveContent = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return sendError(res, "Content not found.", 404);
    if (content.status !== "pending") {
      return sendError(res, "Only pending content can be approved.", 400);
    }

    content.status     = "approved";
    content.rejectionReason = null;
    content.reviewedBy  = req.user._id;
    content.reviewedAt  = new Date();
    await content.save();

    return sendSuccess(res, { content }, "Content approved successfully.");
  } catch (err) {
    next(err);
  }
};


const rejectContent = async (req, res, next) => {
  try {
    const { reason } = req.body;
    if (!reason || reason.trim().length < 10) {
      return sendError(res, "A detailed rejection reason is required (min 10 characters).", 400);
    }

    const content = await Content.findById(req.params.id);
    if (!content) return sendError(res, "Content not found.", 404);
    if (content.status !== "pending") {
      return sendError(res, "Only pending content can be rejected.", 400);
    }

    content.status          = "rejected";
    content.rejectionReason = reason.trim();
    content.reviewedBy      = req.user._id;
    content.reviewedAt      = new Date();
    await content.save();

    return sendSuccess(res, { content }, "Content rejected.");
  } catch (err) {
    next(err);
  }
};


const deleteContent = async (req, res, next) => {
  try {
    const content = await Content.findOne({
      _id:     req.params.id,
      teacher: req.user._id,
    });

    if (!content) {
      return sendError(res, "Content not found or not yours.", 404);
    }
    if (content.status === "approved") {
      return sendError(res, "Approved content cannot be deleted.", 400);
    }

    await content.deleteOne();
    return sendSuccess(res, {}, "Content deleted.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadContent,
  getMyContent,
  getMyStats,
  getAllContent,
  getPrincipalStats,
  getPendingContent,
  getLiveContent,
  approveContent,
  rejectContent,
  deleteContent,
};
