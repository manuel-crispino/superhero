import { useState, useEffect } from "react";

interface Hero {
  id: number;
  name: string;
  superpower: string;
  humilityScore: number;
}

export default function HeroList() {
  const [heroesList, setHeroesList] = useState<Hero[]>([]); // Array di eroi
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Async function per recuperare i dati
    const fetchHeroes = async () => {
      try {
        const response = await fetch("http://localhost:3000/superheroes", {
          method: "GET",
        });

        // Verifica che la risposta sia corretta
        if (!response.ok) {
          throw new Error("Failed to fetch heroes.");
        }

        const data = await response.json(); // Parse della risposta JSON
        console.log(data); // Log dei dati ricevuti

        setHeroesList(data); // Salva i dati nello stato
      } catch (error) {
        setError("Failed to fetch heroes.");
        console.error("Error fetching data:", error); // Gestione degli errori
      }
    };

    // Chiamata alla funzione async
    fetchHeroes();
  }, []); // Dipendenza vuota, esegue solo una volta al montaggio del componente

  return (
    <div>
      <h1>Superheroes List</h1>
      {error && <p>{error}</p>} {/* Mostra un messaggio di errore se presente */}
      <ul>
        {heroesList.length > 0 ? (
          heroesList.map((hero) => (
            <li key={hero.id}>
              {hero.name} - {hero.superpower} (Humility: {hero.humilityScore})
            </li>
          ))
        ) : (
          <p>No heroes available.</p>
        )}
      </ul>
    </div>
  );
}
