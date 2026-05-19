const express = require("express");

const router = express.Router();

const {
    addComplaint,
    getComplaints,
    updateComplaintStatus,
    searchComplaintByLocation,
    aiAnalyzeComplaint
} = require("../controllers/complaintController");


// Add Complaint
router.post("/", addComplaint);


// Get All Complaints
router.get("/", getComplaints);


// Update Complaint Status
router.put("/:id", updateComplaintStatus);


// Search Complaint By Location
router.get("/search", searchComplaintByLocation);


// AI Complaint Analyzer
router.post("/ai/analyze", aiAnalyzeComplaint);


module.exports = router;