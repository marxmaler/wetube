import express from "express";

const app = express();
const PORT = 4000;

app.get("/", () => console.log("Somebody is trying to go home."));

const handleListening = () => console.log(`Server listening on port http:localhost:${PORT}`);
app.listen(4000, handleListening);