import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaSearch } from "react-icons/fa";
import 'tailwindcss/tailwind.css';
import { useAuth } from "../component/authContext";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchString, setSearchString] = useState("");
  const { isLoggedIn } = useAuth()

  const navigate = useNavigate();

  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWIwMmQxZTY1ODI3NDg1Y2U3YzI0YjVhZjJjZDgwYyIsIm5iZiI6MTcyMjY4NDgwOS42OTY3MTgsInN1YiI6IjY2YWUxMjMzMzIzOTViOWM3OGEzNDExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdZWO9JafogqoUcwx_wGD3YyW1CDN6-S4NrXTioafP8'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    if (searchString) {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchString.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchString, movies]);

  const handleBookmarkClick = (movie) => {
    if (isLoggedIn) {
      const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
      
     
      const isAlreadyBookmarked = existingBookmarks.some(bookmarkedMovie => bookmarkedMovie.id === movie.id);
      
      if (isAlreadyBookmarked) {
        alert("This movie is already bookmarked.");
      } else {
        const updatedBookmarks = [...existingBookmarks, movie];
        localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
        navigate('/BookMarkPage');
      }
    } else {
      alert("Login to your account first");
    }
  };

  return (
    <div className="lg:ml-28 lg:mr-2 md:ml-28 md:mr-2 sm:mx-2 sm:mt-12 mt-16">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>
      <div className="mb-4 mt-6 sm:mt-6 relative">  

        <input
          type="text"
          placeholder="Search for movies and TV Shows..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="w-full px-10 py-2 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-red-200 "
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative group"
            >
              {movie.poster_path && (
                <div className="relative overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 z-10"
                    onClick={() => handleBookmarkClick(movie)}
                  >
                    <FaBookmark className="h-4 w-4 text-gray-700" />
                  </button>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="text-white text-lg font-semibold z-20"
                      onClick={() => navigate(`/detailsPage/movie/${movie.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              )}
              <div className="p-2">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-xl font-bold">No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
