const Complaint = require("../models/Complaint");
const axios = require("axios");


// ======================
// Add Complaint
// ======================
const addComplaint = async (req, res) => {

    try {

        const complaint = new Complaint(req.body);

        await complaint.save();

        res.status(201).json({
            message: "Complaint registered successfully",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// Get All Complaints
// ======================
const getComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find();

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// Update Complaint Status
// ======================
const updateComplaintStatus = async (req, res) => {

    try {

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );

        res.status(200).json(complaint);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// Search Complaint By Location
// ======================
const searchComplaintByLocation = async (req, res) => {

    try {

        const complaints = await Complaint.find({
            location: {
                $regex: req.query.location,
                $options: "i"
            }
        });

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// AI Analyze Complaint
// ======================
const aiAnalyzeComplaint = async (req, res) => {

    try {

        const { title, description, category } = req.body;

        const prompt = `
Analyze this complaint:

Title: ${title}

Description: ${description}

Category: ${category}

Tasks:
1. Detect complaint urgency
2. Suggest responsible department
3. Generate short summary
4. Generate automatic response message
        `;


        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );


        res.status(200).json({
            aiResponse: response.data.choices[0].message.content
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            error: error.response?.data || error.message
        });

    }

};


module.exports = {
    addComplaint,
    getComplaints,
    updateComplaintStatus,
    searchComplaintByLocation,
    aiAnalyzeComplaint
};