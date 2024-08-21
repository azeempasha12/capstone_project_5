import { useEffect, useState } from "react";
import { FaBookmark, FaTrash } from "react-icons/fa";

const BookMarkPage = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const fetchBookmarks = () => {
      try {
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
        console.log("Fetched bookmarks:", savedBookmarks); // Debug log
        setBookmarkedMovies(savedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks from localStorage:", error);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = (id) => {
    const updatedBookmarks = bookmarkedMovies.filter(movie => movie.id !== id);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
    console.log("Removed bookmark with id:", id); // Debug log
    setBookmarkedMovies(updatedBookmarks);
  };

  return (
    <div className="xl:ml-28 lg:mr-2 md:ml-28 md:mr-2 sm:mx-2 sm:mt-14 mt-16">
      <h1 className="text-2xl md:text-4xl text-red-600 font-bold text-center mb-10 underline underline-offset-4 decoration-blue-500">
        Bookmarked
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bookmarkedMovies.length > 0 ? (
          bookmarkedMovies.map(movie => (
            <div 
              key={movie.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative"
            >
              {movie.poster_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title || movie.original_name} 
                  className="w-full h-auto object-cover"
                />
              )}
              <div className="absolute top-2 right-2">
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200" 
                  onClick={() => handleRemoveBookmark(movie.id)}
                >
                  <FaTrash className="h-4 w-4 text-red-600" />
                </button>
              </div>
              <div className="p-2 flex-grow">
                <h2 className="text-lg font-semibold">{movie.title || movie.original_name}</h2>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-10">
            <h2 className="text-xl font-bold">No bookmarks found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookMarkPage;
