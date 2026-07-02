const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// First API endpoint
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from Express!",
        project: "Kathmandu Hiking Route Finder"
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});