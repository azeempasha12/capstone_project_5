import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const BookMarkPage = () => {
  const [bookmarkedTVShows, setBookmarkedTVShows] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const fetchBookmarks = () => {
      try {
        const savedTVShows = JSON.parse(localStorage.getItem('bookmarkedTVShows')) || [];
        const savedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
        
        setBookmarkedTVShows(savedTVShows);
        setBookmarkedMovies(savedMovies);
      } catch (error) {
        console.error("Error fetching bookmarks from localStorage:", error);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = (id, type) => {
    if (type === 'tv') {
      const updatedTVBookmarks = bookmarkedTVShows.filter(show => show.id !== id);
      localStorage.setItem('bookmarkedTVShows', JSON.stringify(updatedTVBookmarks));
      setBookmarkedTVShows(updatedTVBookmarks);
    } else if (type === 'movie') {
      const updatedMovieBookmarks = bookmarkedMovies.filter(movie => movie.id !== id);
      localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedMovieBookmarks));
      setBookmarkedMovies(updatedMovieBookmarks);
    }
  };

  return (
    <div className="xl:ml-28 lg:mr-2 md:ml-28 md:mr-2 sm:mx-2 sm:mt-14 mt-16">
      
      {/* Movies Section */}
      
      <div>
        <h2 className="text-2xl md:text-4xl text-black-400 font-bold  mb-4">Movies</h2>
        {bookmarkedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bookmarkedMovies.map(movie => (
              <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative">
                {movie.poster_path && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="w-full h-auto object-cover"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <button 
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200" 
                    onClick={() => handleRemoveBookmark(movie.id, 'movie')}
                  >
                    <FaTrash className="h-4 w-4 text-red-600" />
                  </button>
                </div>
                <div className="p-2 flex-grow">
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-xl font-bold">No bookmarked movies found</p>
        )}
      </div>

      {/* TV Shows Section */}
      <div className="mt-12">
        <h2 className="text-2xl md:text-4xl text-black-400 font-bold  mb-4">TV Series</h2>
        {bookmarkedTVShows.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bookmarkedTVShows.map(show => (
              <div key={show.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative">
                {show.poster_path && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                    alt={show.name || show.original_name} 
                    className="w-full h-auto object-cover"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <button 
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200" 
                    onClick={() => handleRemoveBookmark(show.id, 'tv')}
                  >
                    <FaTrash className="h-4 w-4 text-red-600" />
                  </button>
                </div>
                <div className="p-2 flex-grow">
                  <h2 className="text-lg font-semibold">{show.name || show.original_name}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-xl font-bold">No bookmarked TV series found</p>
        )}
      </div>
    </div>
  );
};

export default BookMarkPage;
