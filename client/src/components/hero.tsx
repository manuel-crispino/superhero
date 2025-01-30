import React from "react";
import HeroList from "./heroList";

// Define the Hero interface
interface Hero {
  name: string;
  superpower: string;
  humilityScore: number | "";  // Allow the humility score to be empty initially
}

export default function HeroForm() {
  // Initialize the state with an object for Hero
  const [hero, setHero] = React.useState<Hero>({
    name: "",
    superpower: "",
    humilityScore: "",  // Start with an empty string for humility score
  });

  // State for handling error messages
  const [error, setError] = React.useState<string>("");

  // State for handling error messages
  const [heroesListReady, setHeroesListReady] = React.useState<boolean>(false);

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate inputs
    if (!hero.name || !hero.superpower || hero.humilityScore === "" ) {
        if(  hero.humilityScore === "" || hero.humilityScore < 1 || hero.humilityScore > 10){
      setError("Please fill in all fields correctly. Humility score must be between 1 and 10.");
      return; // Prevent form submission if validation fails
        }
        setError("Please fill in all fields correctly.");
        return; // Prevent form submission if validation fails
    }

    setError(""); // Clear error if validation is successful
    console.log("Form submitted:", hero); // Log the hero object when the form is submitted
    fetchData(hero);
    setHero({ name: "", superpower: "", humilityScore: "" }); // Reset form
  };

    // Function to fetch data (you can implement this based on your needs)
    function fetchData(data: Hero) {
        // Example: Sending the data to an API endpoint
        fetch("http://localhost:3000/superheroes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Hero submitted:", data); // Log the response data
            setHeroesListReady(true);
          })
          .catch((error) => {
            console.error("Error submitting hero:", error); // Handle error if any
          });
      };
    

  // Function to handle input changes dynamically
  const handleInputChange = (field: keyof Hero) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Update the corresponding field in the hero object
    setHero((prevHero) => ({
      ...prevHero,
      [field]: field === "humilityScore" ? (value === "" ? "" : Number(value)) : value, // Handle humilityScore conversion to number
    }));
  };

  return (
    <div className="hero-div">
      <h1>Super Hero Generator!</h1>
      <form onSubmit={handleSubmit}>
        <ul className="hero-ul">
          <li>
            <input
              placeholder="Hero Name"
              type="text"
              value={hero.name}
              onChange={handleInputChange("name")} // Update hero name on change
            />
          </li>
          <li>
            <input
              placeholder="Superpower"
              type="text"
              value={hero.superpower}
              onChange={handleInputChange("superpower")} // Update hero superpower on change
            />
          </li>
          <li>
            <input
              placeholder="Humility Score 1-10"
              type="number"
              min={1}
              max={10}
              value={hero.humilityScore === "" ? "" : hero.humilityScore} // Only show number if it's not empty
              onChange={handleInputChange("humilityScore")} // Update hero humilityScore on change
            />
          </li>
          <li>
            <button type="submit" className="hero-btn">
              <p>Submit</p>
            </button>
          </li>
          {/* Show error message if any */}
          {error && (
            <li>
              <div className="error">
                <p>{error}</p>
              </div>
            </li>
          )}
        </ul>
      </form>

      {heroesListReady?<HeroList/>:("")}
    </div>
  );
}
