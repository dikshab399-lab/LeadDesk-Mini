const express = require("express");

const router = express.Router();
const {
  createLead,
  getAllLeads,
  updateLeadStatus,
      searchLeads
} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");

router.post("/", createLead);
router.get("/", protect, getAllLeads);
router.get("/search", protect, searchLeads);
router.put("/:id", protect, updateLeadStatus);


module.exports = router;