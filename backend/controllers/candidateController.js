const Candidate = require("../models/Candidate");
const axios = require("axios");


// ======================
// Add Candidate
// ======================
const addCandidate = async (req, res) => {

    try {

        const candidate = new Candidate(req.body);

        await candidate.save();

        res.status(201).json({
            message: "Candidate added successfully",
            candidate
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// Get All Candidates
// ======================
const getCandidates = async (req, res) => {

    try {

        const candidates = await Candidate.find();

        res.status(200).json(candidates);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// Match Candidates
// ======================
const matchCandidates = async (req, res) => {

    try {

        const { requiredSkills, minExperience } = req.body;

        const candidates = await Candidate.find();

        const matchedCandidates = candidates
            .map(candidate => {

                const matchedSkills = candidate.skills.filter(skill =>
                    requiredSkills.includes(skill)
                );

                const matchScore =
                    (matchedSkills.length / requiredSkills.length) * 100;

                return {
                    name: candidate.name,
                    email: candidate.email,
                    skills: candidate.skills,
                    experience: candidate.experience,
                    matchedSkills,
                    matchScore
                };

            })
            .filter(candidate =>
                candidate.experience >= minExperience
            )
            .sort((a, b) => b.matchScore - a.matchScore);

        res.status(200).json(matchedCandidates);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// AI Shortlisting
// ======================
const aiShortlistCandidates = async (req, res) => {

    try {

        const { requiredSkills, minExperience } = req.body;

        const candidates = await Candidate.find();

        const candidateData = candidates.map((candidate, index) => `
${index + 1}. ${candidate.name}
Skills: ${candidate.skills.join(", ")}
Experience: ${candidate.experience} years
Bio: ${candidate.bio || "No bio available"}
        `).join("\n");


        const prompt = `
Job Requirements:
Required Skills: ${requiredSkills.join(", ")}
Minimum Experience: ${minExperience} years

Candidates:
${candidateData}

Rank the best candidates and explain why they are suitable.
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


// ======================
// Exports
// ======================
module.exports = {
    addCandidate,
    getCandidates,
    matchCandidates,
    aiShortlistCandidates
};