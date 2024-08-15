import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaSearch } from "react-icons/fa";
import { useAuth } from "../component/authContext"; 

const TvSeriesPage = () => {
  const [tvshows, setTvShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Accessing isLoggedIn state

  const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWIwMmQxZTY1ODI3NDg1Y2U3YzI0YjVhZjJjZDgwYyIsIm5iZiI6MTcyMjY4NDgwOS42OTY3MTgsInN1YiI6IjY2YWUxMjMzMzIzOTViOWM3OGEzNDExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdZWO9JafogqoUcwx_wGD3YyW1CDN6-S4NrXTioafP8'
    }
  };

  useEffect(() => {
    const DataFetch = async () => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setTvShows(data.results || []);
      } catch (err) {
        console.error("error", err);
      }
    };
    DataFetch();
  }, [url]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTvShows = tvshows.filter(show =>
    show.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.original_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookmarkClick = (show) => {
    if (isLoggedIn) {
      const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedTVShows')) || [];

      // Check if the TV show is already bookmarked
      const isAlreadyBookmarked = existingBookmarks.some(bookmarkedShow => bookmarkedShow.id === show.id);

      if (isAlreadyBookmarked) {
        alert("This TV show is already bookmarked.");
      } else {
        const updatedBookmarks = [...existingBookmarks, show];
        localStorage.setItem('bookmarkedTVShows', JSON.stringify(updatedBookmarks));
        navigate('/BookMarkPage');
      }
    } else {
      alert("Please log in to bookmark this TV show.");
    }
  };

  // Function to fetch trailer key
  const fetchTrailer = async (id) => {
    const videoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=eb02d1e65827485ce7c24b5af2cd80c`;
    try {
      const videoRes = await fetch(videoUrl, options);
      const videoData = await videoRes.json();
      const trailer = videoData.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (err) {
      console.error('Error fetching trailer:', err);
    }
  };

  return (
    <div className="xl:ml-28 lg:mr-2 md:ml-28 md:mr-2 sm:mx-2 sm:mt-14 mt-16">
      <h1 className="text-3xl text-black font-bold mb-4">TvSeries Page</h1>
      <div className="mb-4 mt-6 relative">
        <input
          type="text"
          placeholder="Search TV Series..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-red-200"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredTvShows.map(show => (
          <div
            key={show.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative group"
            onClick={() => fetchTrailer(show.id)}
          >
            {show.poster_path && (
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name || show.original_name}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(show);
                  }}
                >
                  <FaBookmark className="h-4 w-4 text-gray-700" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="text-white text-lg font-semibold z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/detailsPage/tv/${show.id}`);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            )}
            <div className="p-2">
              <h2 className="text-lg font-semibold">{show.name || show.original_name}</h2>
            </div>
          </div>
        ))}
      </div>
      {trailerKey && (
        <div className="mt-4 mx-4 sm:mx-8">
          <h2 className="text-xl font-bold mb-2">Watch Trailer</h2>
          <iframe
            className="w-full max-w-md h-60 mb-2"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default TvSeriesPage;
