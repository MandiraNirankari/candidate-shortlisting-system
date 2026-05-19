import { useState } from "react";
import axios from "axios";

function ComplaintAnalysis() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [aiResponse, setAiResponse] = useState("");


    const handleAnalyze = async () => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/complaints/ai/analyze",
                {
                    title,
                    description,
                    category
                }
            );

            setAiResponse(response.data.aiResponse);

        } catch (error) {

            console.log(error);

            alert("Error analyzing complaint");

        }

    };


    return (

        <div>

            <h2>AI Complaint Analysis</h2>

            <input
                type="text"
                placeholder="Complaint Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Complaint Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <br /><br />

            <button onClick={handleAnalyze}>
                Analyze Complaint
            </button>

            <hr />

            <h2>AI Response</h2>

            <p>{aiResponse}</p>

        </div>

    );

}

export default ComplaintAnalysis;