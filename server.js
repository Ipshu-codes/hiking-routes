const trailInfo = require("./data/trails");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    console.log("➡️", req.method, req.url);
    next();
});


app.get("/api/trails", (req, res) => {
    console.log("✅ /api/trails route reached");
    res.json([
        "Sundarijal",
        "Mulkharka",
        "Manichud",
        "Chisapani"
    ]);
});


app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});