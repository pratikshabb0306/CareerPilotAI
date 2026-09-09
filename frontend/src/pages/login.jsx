import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
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

            const response = await api.post(
                "/auth/login",
                form
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* LEFT SIDE */}

            <div className="auth-brand-section">

                <div className="auth-brand">

                    <div className="auth-logo">
                        C
                    </div>

                    <span>
                        CareerPilot<span>AI</span>
                    </span>

                </div>

                <div className="brand-content">

                    <div className="brand-label">
                        AI CAREER COMPANION
                    </div>

                    <h1>
                        Navigate your career
                        <br />
                        with confidence.
                    </h1>

                    <p>
                        Build your profile, discover your skill gaps,
                        and get a personalized roadmap powered by AI.
                    </p>

                    <div className="brand-features">

                        <div>
                            <span>✦</span>
                            AI-powered career analysis
                        </div>

                        <div>
                            <span>✓</span>
                            Personalized learning roadmap
                        </div>

                        <div>
                            <span>↗</span>
                            Clear path toward your goal
                        </div>

                    </div>

                </div>

                <div className="brand-footer">
                    CareerPilotAI • Your career, intelligently planned.
                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="auth-form-section">

                <div className="auth-form-card">

                    <div className="mobile-logo">
                        CareerPilot<span>AI</span>
                    </div>

                    <div className="form-heading">

                        <h2>
                            Welcome back
                        </h2>

                        <p>
                            Sign in to continue your career journey.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="auth-input-group">

                            <label>
                                Email address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="auth-input-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                    </form>


                    {message && (
                        <div className="auth-error">
                            {message}
                        </div>
                    )}


                    <div className="auth-switch">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            onClick={() => navigate("/register")}
                        >
                            Create account
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;