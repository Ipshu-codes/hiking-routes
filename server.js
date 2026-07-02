const express = require("express");
const path = require("path");

const app = express();

// Serve all static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});