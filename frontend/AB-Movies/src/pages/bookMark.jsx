import { useEffect, useState } from "react";
import { FaBookmark, FaTrash } from "react-icons/fa";

const BookMarkPage = () => {
  const [bookmarkedTVShows, setBookmarkedTVShows] = useState([]);

  useEffect(() => {
    const fetchBookmarks = () => {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedTVShows')) || [];
      setBookmarkedTVShows(savedBookmarks);
    };
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = (id) => {
    const updatedBookmarks = bookmarkedTVShows.filter(show => show.id !== id);
    localStorage.setItem('bookmarkedTVShows', JSON.stringify(updatedBookmarks));
    setBookmarkedTVShows(updatedBookmarks);
  };

  return (
    <div className="xl:ml-28 lg:mr-2 md:ml-28 md:mr-2 sm:mx-2 sm:mt-14 mt-16">
      <h1 className="text-2xl md:text-4xl text-red-600 font-bold text-center mb-10 underline underline-offset-4 decoration-blue-500">
        Bookmarked
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bookmarkedTVShows.map(show => (
          <div 
            key={show.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative"
          >
            {show.poster_path && (
              <img 
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                alt={show.name || show.original_name} 
                className="w-full h-auto object-cover"
              />
            )}
            <div className="absolute top-2 left-2">
              <button 
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200" 
                onClick={() => handleRemoveBookmark(show.id)}
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
    </div>
  );
};

export default BookMarkPage;
