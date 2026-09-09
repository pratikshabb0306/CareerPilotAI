import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Analysis() {

    const navigate = useNavigate();

    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const analyzeCareer = async () => {

        setLoading(true);
        setMessage("");

        try {

            const response = await api.get("/ai/analyze");

            setAnalysis(response.data.analysis.analysis);

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to generate career analysis"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <h1>AI Career Analysis</h1>

            <p>
                Get AI-powered insights about your career.
            </p>

            <button
                onClick={analyzeCareer}
                disabled={loading}
            >
                {loading
                    ? "Analyzing..."
                    : "Analyze My Career"}
            </button>

            <p>{message}</p>

            {analysis && (
                <div>

                    <h2>Career Analysis</h2>

                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            maxWidth: "800px"
                        }}
                    >
                        {analysis}
                    </pre>

                </div>
            )}

            <br />

            <button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </button>

        </div>
    );
}

export default Analysis;