import { useEffect, useState } from "react";
import "./App.css";

type Starship = {
  id: number;
  name: string;
};

type Person = {
  id: number;
  name: string;
};

function App() {
  const [starshipdata, setStarshipdata] = useState<Starship[]>([]);
  const [persondata, setPersondata] = useState<Person[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/starships")
      .then((response) => response.json())
      .then((json) => setStarshipdata(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/people")
      .then((response) => response.json())
      .then((json) => setPersondata(json));
  }, []);
  return (
    <div>
      {starshipdata.map((starship) => (
        <h3 key={starship.id}>{starship.name}</h3>
      ))}
      {persondata.map((person) => (
        <h3 key={person.id}>{person.name}</h3>
      ))}
    </div>
  );
}

export default App;
