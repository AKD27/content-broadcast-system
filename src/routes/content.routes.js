const express  = require("express");
const router   = express.Router();
const upload   = require("../middleware/upload.middleware");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const {
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
} = require("../controllers/content.controller");


router.get("/live/:teacherId", getLiveContent);


router.post(
  "/upload",
  protect,
  restrictTo("teacher"),
  upload.single("file"),
  uploadContent
);
router.get("/my",       protect, restrictTo("teacher"), getMyContent);
router.get("/my/stats", protect, restrictTo("teacher"), getMyStats);
router.delete("/:id",   protect, restrictTo("teacher"), deleteContent);


router.get("/all",         protect, restrictTo("principal"), getAllContent);
router.get("/stats",       protect, restrictTo("principal"), getPrincipalStats);
router.get("/pending",     protect, restrictTo("principal"), getPendingContent);
router.patch("/:id/approve", protect, restrictTo("principal"), approveContent);
router.patch("/:id/reject",  protect, restrictTo("principal"), rejectContent);

module.exports = router;
