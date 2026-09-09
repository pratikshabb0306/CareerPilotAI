import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Roadmap() {
    const navigate = useNavigate();

    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const generateRoadmap = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/roadmap/generate");

            setRoadmap(response.data.roadmap);

        } catch (error) {
            console.error("ROADMAP ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to generate roadmap"
            );
        } finally {
            setLoading(false);
        }
    };

    const getExistingRoadmap = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await api.get("/roadmap");

            setRoadmap(response.data.roadmap);

        } catch (error) {
            console.error("GET ROADMAP ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "No roadmap found"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">

            <nav className="navbar">

                <h2>CareerPilotAI</h2>

                <button
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

            </nav>

            <div className="feature-container">

                <h1>🗺️ Career Roadmap</h1>

                <p>
                    Generate a personalized 3-month learning
                    roadmap using AI.
                </p>

                <button
                    onClick={generateRoadmap}
                    disabled={loading}
                >
                    {loading
                        ? "Generating..."
                        : "Generate AI Roadmap"}
                </button>

                <button
                    onClick={getExistingRoadmap}
                    disabled={loading}
                >
                    View Existing Roadmap
                </button>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {roadmap && (
                    <div>

                        <hr />

                        <h2>{roadmap.title}</h2>

                        <p>
                            <strong>Target Role:</strong>{" "}
                            {roadmap.targetRole}
                        </p>

                        <p>
                            <strong>Duration:</strong>{" "}
                            {roadmap.duration}
                        </p>

                        {roadmap.steps?.map((step) => (

                            <div
                                className="roadmap-step"
                                key={step.month}
                            >

                                <h3>
                                    Month {step.month}
                                </h3>

                                <h3>
                                    {step.title}
                                </h3>

                                <ul>
                                    {step.topics?.map(
                                        (topic, index) => (
                                            <li key={index}>
                                                {topic}
                                            </li>
                                        )
                                    )}
                                </ul>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Roadmap;