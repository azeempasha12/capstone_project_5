import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// StarRating component to display rating in stars
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating / 2); // Full stars for whole numbers
  const halfStar = rating % 2 >= 0.5; // Show half star for decimals >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex items-center">
      {Array(fullStars).fill(0).map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500 text-2xl" />
      ))}
      {halfStar && <FaStarHalfAlt className="text-yellow-500 text-2xl" />}
      {Array(emptyStars).fill(0).map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-500 text-2xl" />
      ))}
    </div>
  );
};


const DetailsPage = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = type === "movie"
        ? `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        : `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWIwMmQxZTY1ODI3NDg1Y2U3YzI0YjVhZjJjZDgwYyIsIm5iZiI6MTcyMjY4NDgwOS42OTY3MTgsInN1YiI6IjY2YWUxMjMzMzIzOTViOWM3OGEzNDExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdZWO9JafogqoUcwx_wGD3YyW1CDN6-S4NrXTioafP8'
          }
        });
        const data = await res.json();
        setDetails(data);

        const videoUrl = type === "movie"
          ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=aeb02d1e65827485ce7c24b5af2cd80c`
          : `https://api.themoviedb.org/3/tv/${id}/videos?api_key=aeb02d1e65827485ce7c24b5af2cd80c`;

        const videoRes = await fetch(videoUrl);
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!details) {
    return <div>Error loading details.</div>;
  }

  return (
    <div className="lg:ml-28 lg:mr-2 md:ml-28 md:mr-2 sm:mx-2 sm:mt-12 mt-16 m-2">
      <h1 className="text-3xl font-bold mb-4 ml-2 sm:ml-4">{type === "movie" ? details.title : details.name}</h1>

      <div className="flex flex-col sm:flex-row ">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={type === "movie" ? details.title : details.name}
          className="w-full sm:w-1/3 mx-auto sm:ml-4 sm:mx-0 mb-4 sm:mb-0"
        />

        {/* Movie/TV Show Details */}
        <div className="ml-0 sm:ml-0 lg:ml-10 sm:mx-auto">
  {/* Rating */}
  <div className="flex flex-col sm:flex-row items-start mb-6">
    <p className="text-5xl font-bold mb-2 sm:mb-0">
      {details.vote_average ? details.vote_average.toFixed(1) : 'N/A'}
    </p>
    <div className="flex items-center ml-2">
      <StarRating rating={details.vote_average} />
    </div>
  </div>

  {/* Language and First Air */}
  <div className="flex flex-col sm:flex-row mt-10">
    {/* Language */}
    <div className="flex flex-col sm:flex-row sm:items-start sm:mr-4 mb-6">
      <p className="font-normal">Language:</p>
      <p className="font-bold ml-4">
        {details.original_language ? details.original_language.toUpperCase() : "N/A"}
      </p>
    </div>

    {/* First Air */}
    <div className="flex flex-col sm:flex-row sm:items-start mb-6">
      <p className="font-normal">First Air:</p>
      <p className="font-bold ml-4">
        {type === "tv" && details.first_air_date
          ? new Date(details.first_air_date).getFullYear()
          : "N/A"}
      </p>
    </div>

    {/* Status */}
    <div className="flex flex-col sm:flex-row sm:items-start lg:pl-5">
      <p className="font-normal">Status:</p>
      <p className="font-bold lg:pl-4">
        {details.status || "N/A"}
      </p>
    </div>
  </div>

  {type === "tv" && details.last_air_date && (
    <p className="mb-6">
      <strong className="font-normal">Last Air:</strong> {new Date(details.last_air_date).getFullYear()}
    </p>
  )}

  {/* Genres */}
  <p className="flex flex-wrap gap-2 mb-6 mt-6">
    <strong className="font-normal">Genres:</strong>
    {details.genres && details.genres.length > 0 ? (
      details.genres.map((genre, index) => (
        <span
          key={index}
          className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-semibold"
        >
          {genre.name}
        </span>
      ))
    ) : (
      "N/A"
    )}
  </p>

  {/* Overview/Synopsis */}
  <p className="flex flex-col mt-5 mb-6">
    <span className="font-bold">Synopsis:</span>
    <span>{details.overview || "N/A"}</span>
  </p>

  {/* Cast */}
  <div>
    <strong className="font-normal">Cast:</strong>
    <div className="flex flex-wrap gap-2 mt-2">
      {details.cast && details.cast.length > 0 ? (
        details.cast.slice(0, 5).map((actor) => (
          <span
            key={actor.cast_id}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-full"
          >
            {actor.name} as {actor.character}
          </span>
        ))
      ) :
       (
        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-full">
          N/A
        </span>
      )
      }
    </div>
  </div>
</div>

      </div>

      {/* Trailer */}
      <div className="mt-4">
        {trailerKey ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Watch Trailer</h2>
            <div className="relative" style={{ paddingBottom: "56.25%", height: 0, margin: "0 8px" }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full lg:w-1/2 lg:h-1/2"
              ></iframe>
            </div>
          </div>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
