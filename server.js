const express = require("express");
const path = require("path");
const trailInfo = require("./data/trails.json");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// API route
app.get("/api/trails", (req, res) => {
    res.json(trailInfo);
});

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});