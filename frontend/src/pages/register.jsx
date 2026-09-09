import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

            await api.post("/auth/register", form);

            setMessage("Registration successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.error("REGISTER ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

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
                        Build your career
                        <br />
                        with a clear direction.
                    </h1>

                    <p>
                        Create your profile, understand your skill gaps,
                        and get a personalized career roadmap powered by AI.
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
                            Practical career guidance
                        </div>

                    </div>

                </div>


                <div className="brand-footer">
                    CareerPilotAI • Your career, intelligently planned.
                </div>

            </div>


            <div className="auth-form-section">

                <div className="auth-form-card">

                    <div className="mobile-logo">
                        CareerPilot<span>AI</span>
                    </div>

                    <div className="form-heading">

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Start planning your career with AI.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="auth-input-group">

                            <label>
                                Full name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


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
                                placeholder="Create a password"
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
                            {loading
                                ? "Creating account..."
                                : "Create account"}
                        </button>

                    </form>


                    {message && (
                        <div className="auth-error">
                            {message}
                        </div>
                    )}


                    <div className="auth-switch">

                        <span>
                            Already have an account?
                        </span>

                        <button
                            onClick={() => navigate("/login")}
                        >
                            Sign in
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;