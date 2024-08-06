import { useEffect, useState } from "react";
import Card from "./Card";
import { fetchData } from "../assets/getMovies";

function Show() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const edges = await fetchData();
        console.log(edges);
        const moviesData = edges.map((edge) => {
          const entity = edge.node.entity;
          return {
            title: entity.titleText.text,
            imageUrl: entity.primaryImage?.url,
            year: entity.releaseDate?.year,
            imdbLink: `https://www.imdb.com/title/${entity.id}`,
          };
        });
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <Card
            key={index}
            title={movie.title}
            imageUrl={movie.imageUrl}
            year={movie.year}
            imdbLink={movie.imdbLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Show;
