import { useState } from "react";
import axios from "axios";

function ComplaintForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        location: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/complaints",
                formData
            );

            alert(response.data.message);

            setFormData({
                name: "",
                email: "",
                title: "",
                description: "",
                category: "",
                location: ""
            });

        } catch (error) {

            console.log(error);

            alert("Error submitting complaint");

        }

    };


    return (

        <div>

            <h2>Register Complaint</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="title"
                    placeholder="Complaint Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Complaint Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Submit Complaint
                </button>

            </form>

        </div>

    );

}

export default ComplaintForm;