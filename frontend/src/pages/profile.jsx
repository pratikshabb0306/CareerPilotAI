import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        education: "",
        skills: "",
        experience: "",
        targetRole: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            await api.put("/profile", {
                education: form.education,
                skills: form.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
                experience: form.experience,
                targetRole: form.targetRole
            });

            setMessage("Profile saved successfully!");

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to save profile"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">

            <nav className="navbar">
                <h2>CareerPilotAI</h2>

                <button onClick={() => navigate("/dashboard")}>
                    Dashboard
                </button>
            </nav>

            <div className="feature-container">

                <h1>Career Profile</h1>

                <p>
                    Tell us about yourself so CareerPilotAI can
                    create personalized career recommendations.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Education</label>

                        <input
                            type="text"
                            name="education"
                            placeholder="B.E. Computer Engineering"
                            value={form.education}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Skills</label>

                        <input
                            type="text"
                            name="skills"
                            placeholder="JavaScript, React, Node.js, MongoDB"
                            value={form.skills}
                            onChange={handleChange}
                            required
                        />

                        <p>
                            Separate multiple skills using commas.
                        </p>
                    </div>

                    <div className="form-group">
                        <label>Experience</label>

                        <textarea
                            name="experience"
                            placeholder="Describe your projects or work experience"
                            value={form.experience}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Target Job Role</label>

                        <input
                            type="text"
                            name="targetRole"
                            placeholder="Full Stack Developer"
                            value={form.targetRole}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Career Profile"}
                    </button>

                </form>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default Profile;