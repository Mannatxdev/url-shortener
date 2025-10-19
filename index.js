const express = require("express");
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./ROUTES/url');
const URL = require('./MODELS/url');
const app = express();

const PORT = 3000;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MONGODB CONNECTED"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { viewHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) return res.status(404).json({ error: "Short URL not found" });

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`SERVER STARTED AT PORT: ${PORT}`));
