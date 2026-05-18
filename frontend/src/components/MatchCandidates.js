import { useState } from "react";
import axios from "axios";

function MatchCandidates() {

    const [requiredSkills, setRequiredSkills] = useState("");
    const [minExperience, setMinExperience] = useState("");

    const [matchedCandidates, setMatchedCandidates] = useState([]);

    const [aiResponse, setAiResponse] = useState("");


    const handleMatch = async () => {

        try {

            const requestData = {
                requiredSkills: requiredSkills.split(","),
                minExperience: Number(minExperience)
            };


            // Basic Matching
            const matchResponse = await axios.post(
                "https://candidate-backend-4qvl.onrender.com/api/candidates/match",
                requestData
            );

            setMatchedCandidates(matchResponse.data);


            // AI Matching
            const aiResponseData = await axios.post(
                "https://candidate-backend-4qvl.onrender.com/api/candidates/ai/shortlist",
                requestData
            );

            setAiResponse(aiResponseData.data.aiResponse);

        } catch (error) {

            console.log(error);

            alert("Error matching candidates");

        }

    };


    return (

        <div>

            <h2>Match Candidates</h2>

            <input
                type="text"
                placeholder="Required Skills"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Minimum Experience"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
            />

            <br /><br />

            <button onClick={handleMatch}>
                Match Candidates
            </button>

            <hr />

            <h2>Matched Candidates</h2>

            {
                matchedCandidates.map((candidate, index) => (

                    <div
                        key={index}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >

                        <h3>{candidate.name}</h3>

                        <p>Email: {candidate.email}</p>

                        <p>
                            Skills:
                            {" "}
                            {candidate.skills.join(", ")}
                        </p>

                        <p>
                            Match Score:
                            {" "}
                            {candidate.matchScore}%
                        </p>

                    </div>

                ))
            }

            <hr />

            <h2>AI Recommendation</h2>

            <p>{aiResponse}</p>

        </div>

    );

}

export default MatchCandidates;