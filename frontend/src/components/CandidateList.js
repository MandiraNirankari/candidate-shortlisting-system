import { useEffect, useState } from "react";
import axios from "axios";

function CandidateList() {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {

        fetchCandidates();

    }, []);


    const fetchCandidates = async () => {

        try {

            const response = await axios.get(
                "https://candidate-backend-4qvl.onrender.com/api/candidates"
            );

            setCandidates(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div>

            <h2>Candidate List</h2>

            {
                candidates.map((candidate) => (

                    <div
                        key={candidate._id}
                        style={{
                            border: "1px solid gray",
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
                            Experience:
                            {" "}
                            {candidate.experience} years
                        </p>

                        <p>{candidate.bio}</p>

                    </div>

                ))
            }

        </div>

    );

}

export default CandidateList;