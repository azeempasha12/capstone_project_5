import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';

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

        // Fetch the trailer for the movie or TV show
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
    <div className="lg:ml-32">
      <h1 className="text-3xl font-bold mb-4 ml-2 sm:ml-4">{type === "movie" ? details.title : details.name}</h1>
      <div className="flex">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={type === "movie" ? details.title : details.name}
          className="w-1/3 ml-2 sm:ml-4"
        />
        <div className="ml-4">
          <p><strong className="p-1">Genre:</strong> {details.genres ? details.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
          <p><strong className="p-1">Release Date:</strong> {type === "movie" ? details.release_date : details.first_air_date}</p>
          <p><strong className="p-1">Overview:</strong> {details.overview || "N/A"}</p>
          <p><strong className="p-1">Origin country:</strong>{details.origin_country || "N/A"}</p>
          <p><strong className="p-1">Budget:</strong>{details.budget || "N/A"}</p>
          <p><strong className="p-1">Popularity:</strong>{details.popularity || "N/A"}</p>
          <p><strong className="p-1">Runtime:</strong>{details.runtime || "N/A"}</p>
          <p><strong className="p-1">Status:</strong>{details.status || "N/A"}</p>
          <p><strong className="p-1">Tagline:</strong>{details.tagline || "N/A"}</p>
          {/* Add more movie details as needed */}
        </div>
      </div>
      <div className="mt-4">
        {trailerKey ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Watch Trailer</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
