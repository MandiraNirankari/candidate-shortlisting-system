import { useEffect, useState } from "react";
import axios from "axios";

function ComplaintList() {

    const [complaints, setComplaints] = useState([]);

    const [location, setLocation] = useState("");


    useEffect(() => {

        fetchComplaints();

    }, []);


    const fetchComplaints = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/complaints"
            );

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    const updateStatus = async (id) => {

        try {

            await axios.put(
                `http://localhost:5000/api/complaints/${id}`,
                {
                    status: "Resolved"
                }
            );

            fetchComplaints();

        } catch (error) {

            console.log(error);

            alert("Error updating status");

        }

    };


    const searchByLocation = async () => {

        try {

            const response = await axios.get(
                `http://localhost:5000/api/complaints/search?location=${location}`
            );

            setComplaints(response.data);

        } catch (error) {

            console.log(error);

            alert("Error searching complaints");

        }

    };


    return (

        <div>

            <h2>Complaint List</h2>

            <input
                type="text"
                placeholder="Search by Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <button onClick={searchByLocation}>
                Search
            </button>

            <br /><br />

            {
                complaints.map((complaint) => (

                    <div
                        key={complaint._id}
                        className="complaint-card"
                    >

                        <h3>{complaint.title}</h3>

                        <p>Name: {complaint.name}</p>

                        <p>Email: {complaint.email}</p>

                        <p>Description: {complaint.description}</p>

                        <p>Category: {complaint.category}</p>

                        <p>Location: {complaint.location}</p>

                        <p>Status: {complaint.status}</p>

                        <button
                            onClick={() => updateStatus(complaint._id)}
                        >
                            Mark as Resolved
                        </button>

                    </div>

                ))
            }

        </div>

    );

}

export default ComplaintList;