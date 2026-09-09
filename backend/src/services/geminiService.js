const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const analyzeCareerProfile = async ({
    education,
    skills,
    experience,
    targetRole
}) => {

    const prompt = `
You are an expert career advisor for a software career platform called CareerPilotAI.

Analyze the candidate below.

Education:
${education || "Not provided"}

Current Skills:
${skills && skills.length > 0
        ? skills.join(", ")
        : "Not provided"}

Experience:
${experience || "Not provided"}

Target Job Role:
${targetRole || "Not provided"}

Provide the following:

1. Candidate Summary
2. Current Skill Assessment
3. Missing Skills
4. Recommended Technologies
5. Areas for Improvement
6. A practical 3-month learning roadmap

For the roadmap, divide it into:

Month 1
Month 2
Month 3

Keep the recommendations practical and suitable for someone trying to enter or grow in software development.

Do not invent qualifications that are not provided.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
    });

    return response.text;
};


const generateCareerRoadmap = async ({
    education,
    skills,
    experience,
    targetRole
}) => {

    const prompt = `
Create a practical 3-month career roadmap for this candidate.

Education:
${education || "Not provided"}

Skills:
${skills && skills.length > 0
        ? skills.join(", ")
        : "Not provided"}

Experience:
${experience || "Not provided"}

Target Role:
${targetRole || "Not provided"}

Return ONLY valid JSON.

Use exactly this structure:

{
    "title": "string",
    "targetRole": "string",
    "duration": "3 Months",
    "steps": [
        {
            "month": 1,
            "title": "string",
            "topics": ["string", "string", "string"]
        },
        {
            "month": 2,
            "title": "string",
            "topics": ["string", "string", "string"]
        },
        {
            "month": 3,
            "title": "string",
            "topics": ["string", "string", "string"]
        }
    ]
}

Make the roadmap realistic and focused on the target role.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
    });

    let text = response.text.trim();

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    return JSON.parse(text);
};


module.exports = {
    analyzeCareerProfile,
    generateCareerRoadmap
};