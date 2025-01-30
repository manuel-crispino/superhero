import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// 🔹 Configura il percorso della cartella corrente (ESM non ha __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middleware to parse JSON body
app.use(express.json());

// 🔹 Serve file statici dalla cartella "dist"
app.use(express.static(path.join(__dirname, "../client/dist")));

let idGenerator = 0;
let heroesList = [];

// Serve the static index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Handle POST request to add a new superhero
app.post("/superheroes", async(req, res) => {
  const hero =  await req.body;
   // Verify hero
   if (!hero || !hero.name || !hero.superpower || !hero.humilityScore) {
    console.log("Hero not arrived or missing required fields");

    // send status 400 (Bad Request)
    return res.status(400).json({
      message: "Hero data is missing or incomplete. Please provide name, superpower, and humilityScore.",
    });}
  console.log(hero);
  hero.id = idGenerator++; // Assign an incremental id
  heroesList.push(hero);
  console.log(heroesList);
  res.status(201).json(hero); // Respond with the created hero and a 201 status
});

// Handle GET request to fetch all superheroes
app.get("/superheroes",(req, res) => {
  res.json(heroesList); // Respond with the list of superheroes
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});