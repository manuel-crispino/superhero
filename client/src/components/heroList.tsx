import { useState, useEffect } from "react";

interface Hero {
  id: number;
  name: string;
  superpower: string;
  humilityScore: number;
}

interface Props{
  count:number;
}

export default function HeroList(props:Props) {
  const [heroesList, setHeroesList] = useState<Hero[]>([]); // Heroes Array
  const [error, setError] = useState<string>(""); // Error state 
  const [isLoading, setIsLoading] = useState<boolean>(true); // loading state


  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        // call server
        const response = await fetch("http://localhost:3000/superheroes");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched heroes:", data);

        setHeroesList(data); // set heroes list
        setIsLoading(false); // if data are ready stop loading
      } catch (error: unknown) {
        setError("Error fetching data");
        setIsLoading(false); // if errors stop loading
        console.error("Error fetching data:", error);
      }
    };

    fetchHeroes(); // call fetch 
  }, [props.count]); // update each count = new hero 

  if (isLoading) {
    return <p>Loading heroes...</p>; //
  }

  // Sort the list of heroes in descending order based on humilityScore
  const sortedList = heroesList.sort((a, b) => b.humilityScore - a.humilityScore);

  return (
    <div>
      <h1>Superheroes List</h1>
      {error && <p>{error}</p>} {/* show error message if there is  */}
      <ol className="hero-list">
        {heroesList.length > 0 ? (
          sortedList.map((hero) => (
            <li key={hero.id}>
             <p className="hero-list-text"> {hero.name} - {hero.superpower} (Humility: {hero.humilityScore})</p>
            </li>
          ))
        ) : (
          <li><p>No heroes available.</p></li>
        )}
      </ol>
    </div>
  );
}
