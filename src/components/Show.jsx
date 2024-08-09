import { useState } from "react";
import Card from "./Card";
import { useEffect } from "react";
import { fetchData } from "../assets/getMovies";
import { Puff, RotatingLines, Vortex } from "react-loader-spinner";

function Show() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const edges = await fetchData();
        console.log(edges);
        const moviesData = edges.map((edge) => {
          const entity = edge.node.entity;
          return {
            title: entity.titleText?.text || "Untitled",
            imageUrl: entity.primaryImage?.url,
            year: entity.releaseDate?.year,
            imdbLink: `https://www.imdb.com/title/${entity.id}`,
          };
        });
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  const handleSearchChange = (event) => {
    //console.log(event.target.value);
    setSearch(event.target.value);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      (movie.year && movie.year.toString().includes(search))
  );

  return (
    <div>
      <h1>Movies</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movies..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="movie-list">
        {loading ? (
          <Vortex 
            height={120}
            width={120}
            color="#12c2e9"
            ariaLabel="puff-loading"
          />
        ) : filteredMovies.length > 0 ? (
          filteredMovies.map((movie, i) => (
            <Card
              key={i}
              title={movie.title}
              imageUrl={movie.imageUrl}
              year={movie.year}
              imdbLink={movie.imdbLink}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default Show;
