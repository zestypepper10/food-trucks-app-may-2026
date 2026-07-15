import { useEffect, useState } from "react";
import "../App.css";

function Home() {
  const [foodTrucks, setFoodTrucks] = useState([]);

  useEffect(() => {
    async function fetchFoodTrucks() {
      const response = await fetch("http://localhost:3000/get-all-food-trucks");
      const data = await response.json();
      setFoodTrucks(data);
    }

    fetchFoodTrucks();
  }, []);

  return (
    <>
      <h2>Total Food Trucks: {foodTrucks.length}</h2>

      <div className="grid">
        {foodTrucks.map((truck) => (
          <div className="card" key={truck.id}>
            <h3>{truck.name}</h3>

            <p>
              <strong>Location:</strong> {truck.current_location}
            </p>

            <p>
              <strong>Daily Special:</strong> {truck.daily_special}
            </p>

            <p>
              <strong>Slogan:</strong> {truck.slogan}
            </p>

            <p>
              <strong>Price:</strong> {truck.price_level}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {truck.rating}
            </p>

            <p>
              {truck.has_vegan_options ? "🌱 Vegan Options" : "No Vegan Options"}
            </p>

            {truck.rating >= 4.5 && (
              <p><strong>🏆 Top Rated</strong></p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;