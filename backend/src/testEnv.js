require("dotenv").config();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

console.log(
    "MONGO_URI:",
    process.env.MONGO_URI
        ? process.env.MONGO_URI.replace(
            /:\/\/([^:]+):([^@]+)@/,
            "://$1:****@"
        )
        : "NOT FOUND"
);