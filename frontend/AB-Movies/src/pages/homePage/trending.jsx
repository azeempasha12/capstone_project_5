import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

const  Trending = () => {
  const [data, setData] = useState(null);

  const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWIwMmQxZTY1ODI3NDg1Y2U3YzI0YjVhZjJjZDgwYyIsIm5iZiI6MTcyMjY4NDgwOS42OTY3MTgsInN1YiI6IjY2YWUxMjMzMzIzOTViOWM3OGEzNDExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdZWO9JafogqoUcwx_wGD3YyW1CDN6-S4NrXTioafP8'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setData(data.results.slice(0, 5));
        console.log("Trending", data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-black font-bold">Trending</h1>
      <div className="flex flex-nowrap gap-4 p-4 animate-slider">
        {data ? (
          <>
            {data.map((movie) => (
              <div key={movie.id} className="relative flex-shrink-0 h-60 w-96 bg-red-500 animate-move group overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-black bg-opacity-75 text-white py-2 px-4 rounded-full">
                    <FaPlay className='h-6 w-6 md:h-7 md:w-7 inline'/>    <span className="ml-2 font-bold">Play</span>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 text-white p-2 text-left">
                  <p className="font-bold text-lg">{movie.title || movie.name}</p>
                  <p className="inline">{(movie.release_date || movie.first_air_date).slice(0, 4)}</p>
                  <p className="inline pl-3">{movie.media_type === 'movie' ? 'Movie' : 'Series'}</p>
                </div>
              </div>
            ))}
            {data.map((movie) => (
              <div key={movie.id + '-duplicate'} className="relative flex-shrink-0 h-60 w-96 bg-red-500 animate-move group overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-black bg-opacity-75 text-white py-2 px-4 rounded-full">
                    <FaPlay className='h-6 w-6 md:h-7 md:w-7 inline'/>    <span className="ml-2 font-bold">Play</span>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 text-white p-2 text-left">
                  <p className="font-bold text-lg">{movie.title || movie.name}</p>
                  <p className="inline">{(movie.release_date || movie.first_air_date).slice(0, 4)}</p>
                  <p className="inline pl-3">{movie.media_type === 'movie' ? 'Movie' : 'Series'}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    
    </div>
    
  );
};

export default Trending
