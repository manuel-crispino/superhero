import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Initialize the express application
const app = express();

// Define the port number the server will listen on
const PORT = 3000;

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON body
app.use(express.json());

// Serve static files from the "dist" folder
app.use(express.static(path.join(__dirname, "../client/dist")));

let idGenerator = 0;
// Predefined heroes list
let heroesList = [
  { id: idGenerator++, name: "Superman", superpower: "Flight, Super strength", humilityScore: 8 },
  { id: idGenerator++, name: "Batman", superpower: "Martial Arts, Gadgets", humilityScore: 7 },
  { id: idGenerator++, name: "Wonder Woman", superpower: "Super strength", humilityScore: 9 },
  { id: idGenerator++, name: "Flash", superpower: "Super speed", humilityScore: 6 },
  { id: idGenerator++, name: "Manuel", superpower: "Problem Solving", humilityScore: 10 }
];

// Serve the static index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Handle POST request to add a new superhero
app.post("/superheroes", async (req, res) => {
  const hero = await req.body;
  try {
    // Verify that the hero data is complete
    if (!hero || !hero.name || !hero.superpower || !hero.humilityScore) {
      console.log("Hero data is missing or incomplete");

      // Send a 400 status code (Bad Request) if required fields are missing
      return res.status(400).json({
        message: "Hero data is missing or incomplete. Please provide name, superpower, and humilityScore.",
      });
    }
    console.log(hero);
    hero.id = idGenerator++; // Assign an incremental id to the new hero
    heroesList.push(hero); // Add the hero to the heroes list
    console.log(heroesList);
    res.status(201).json(hero); // Respond with the created hero and a 201 status code
  } catch (err) {
    // Handle any errors that occur during processing
    res.status(500).json({
      message: "An error occurred while processing the hero. Please try again later.",
      error: err.message,  // Include error message for debugging
    });
  }
});

// Handle GET request to fetch all superheroes
app.get("/superheroes", (req, res) => {
  res.json(heroesList); // Respond with the list of superheroes
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});