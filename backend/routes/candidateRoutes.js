const express = require("express");

const router = express.Router();

const {
    addCandidate,
    getCandidates,
    matchCandidates,
    aiShortlistCandidates
} = require("../controllers/candidateController");


// Add Candidate
router.post("/", addCandidate);


// Get All Candidates
router.get("/", getCandidates);


// Basic Matching
router.post("/match", matchCandidates);


// AI Shortlisting
router.post("/ai/shortlist", aiShortlistCandidates);


module.exports = router;