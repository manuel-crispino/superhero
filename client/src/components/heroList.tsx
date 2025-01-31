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
  const [heroesList, setHeroesList] = useState<Hero[]>([]); // Array di eroi
  const [error, setError] = useState<string>(""); // Stato per gli errori
  const [isLoading, setIsLoading] = useState<boolean>(true); // Stato per il caricamento


  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        // Chiamata al server
        const response = await fetch("http://localhost:3000/superheroes");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched heroes:", data);

        setHeroesList(data); // Imposta la lista degli eroi
        setIsLoading(false); // Dati caricati, termina il caricamento
      } catch (error: unknown) {
        setError("Error fetching data");
        setIsLoading(false); // Se c'è un errore, termina comunque il caricamento
        console.error("Error fetching data:", error);
      }
    };

    fetchHeroes(); // Chiamata alla funzione di fetch
  }, [props.count]); // Esegui una sola volta al montaggio del componente

  if (isLoading) {
    return <p>Loading heroes...</p>; // Mostra il messaggio di caricamento
  }

  return (
    <div>
      <h1>Superheroes List</h1>
      {error && <p>{error}</p>} {/* Mostra un messaggio di errore se presente */}
      <ol className="hero-list">
        {heroesList.length > 0 ? (
          heroesList.map((hero) => (
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
