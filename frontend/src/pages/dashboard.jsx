import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [resumeCount, setResumeCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/dashboard");

                setUser(response.data.user);
                setResumeCount(response.data.resumeCount);
            } catch (error) {
                console.error(error);

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            {/* TOP NAVIGATION */}

            <header className="top-nav">

                <div
                    className="logo"
                    onClick={() => navigate("/dashboard")}
                >
                    <div className="logo-mark">
                        C
                    </div>

                    <span>
                        CareerPilot<span className="logo-ai">AI</span>
                    </span>
                </div>

                <nav className="nav-links">

                    <button
                        className="nav-link active"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className="nav-link"
                        onClick={() => navigate("/profile")}
                    >
                        Career Profile
                    </button>

                    <button
                        className="nav-link"
                        onClick={() => navigate("/analysis")}
                    >
                        AI Analysis
                    </button>

                    <button
                        className="nav-link"
                        onClick={() => navigate("/roadmap")}
                    >
                        Roadmap
                    </button>

                </nav>

                <div className="nav-user">

                    <div className="nav-avatar">
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <button
                        className="logout-link"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* MAIN */}

            <main className="dashboard-content">

                {/* HERO */}

                <section className="welcome-section">

                    <div>

                        <div className="small-label">
                            AI CAREER COMPANION
                        </div>

                        <h1>
                            Welcome back,{" "}
                            {user?.name?.split(" ")[0]}.
                        </h1>

                        <p>
                            Your personalized career journey starts here.
                            Build your profile, discover your skill gaps,
                            and create a roadmap for your goals.
                        </p>

                    </div>

                    <div className="hero-decoration">

                        <div className="ai-orb">
                            ✦
                        </div>

                    </div>

                </section>


                {/* STATS */}

                <section className="stats-row">

                    <div className="stat-box">

                        <span className="stat-label">
                            PROFILE
                        </span>

                        <strong>
                            Career Profile
                        </strong>

                        <span className="stat-description">
                            Personalize your journey
                        </span>

                    </div>

                    <div className="stat-box">

                        <span className="stat-label">
                            AI
                        </span>

                        <strong>
                            Career Analysis
                        </strong>

                        <span className="stat-description">
                            Discover your skill gaps
                        </span>

                    </div>

                    <div className="stat-box">

                        <span className="stat-label">
                            ROADMAP
                        </span>

                        <strong>
                            3 Month Plan
                        </strong>

                        <span className="stat-description">
                            Learn with direction
                        </span>

                    </div>

                    <div className="stat-box">

                        <span className="stat-label">
                            RESUMES
                        </span>

                        <strong>
                            {resumeCount}
                        </strong>

                        <span className="stat-description">
                            Resumes uploaded
                        </span>

                    </div>

                </section>


                {/* SECTION TITLE */}

                <section className="journey-heading">

                    <div>

                        <h2>
                            Plan your next move
                        </h2>

                        <p>
                            Use AI to turn your career goals into actionable steps.
                        </p>

                    </div>

                </section>


                {/* MAIN FEATURE CARDS */}

                <section className="main-cards">

                    {/* PROFILE */}

                    <div className="main-card">

                        <div className="card-number">
                            01
                        </div>

                        <div className="card-icon purple">
                            ◇
                        </div>

                        <h3>
                            Build your career profile
                        </h3>

                        <p>
                            Tell CareerPilotAI about your education,
                            skills, experience and the role you want
                            to achieve.
                        </p>

                        <button
                            onClick={() => navigate("/profile")}
                        >
                            Build Profile
                            <span>→</span>
                        </button>

                    </div>


                    {/* ANALYSIS */}

                    <div className="main-card featured-card">

                        <div className="card-number">
                            02
                        </div>

                        <div className="card-icon blue">
                            ✦
                        </div>

                        <h3>
                            Discover your career potential
                        </h3>

                        <p>
                            Get an AI-powered assessment of your current
                            skills, missing skills and recommended technologies.
                        </p>

                        <button
                            onClick={() => navigate("/analysis")}
                        >
                            Analyze Career
                            <span>→</span>
                        </button>

                    </div>


                    {/* ROADMAP */}

                    <div className="main-card">

                        <div className="card-number">
                            03
                        </div>

                        <div className="card-icon green">
                            ↗
                        </div>

                        <h3>
                            Follow your learning roadmap
                        </h3>

                        <p>
                            Generate a practical 3-month learning plan
                            based on your target role and current abilities.
                        </p>

                        <button
                            onClick={() => navigate("/roadmap")}
                        >
                            View Roadmap
                            <span>→</span>
                        </button>

                    </div>

                </section>


                {/* BOTTOM INFORMATION */}

                <section className="bottom-panel">

                    <div className="bottom-icon">
                        ✦
                    </div>

                    <div>

                        <h3>
                            Make your next career move with confidence.
                        </h3>

                        <p>
                            Start by completing your career profile.
                            CareerPilotAI will take care of the rest.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/profile")}
                    >
                        Get Started →
                    </button>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;