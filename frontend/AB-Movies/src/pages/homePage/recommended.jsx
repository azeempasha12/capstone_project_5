import { useEffect, useState } from "react";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Recommended = () => {
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate()

    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWIwMmQxZTY1ODI3NDg1Y2U3YzI0YjVhZjJjZDgwYyIsIm5iZiI6MTcyMzExNDYxMy4xMjE3NzksInN1YiI6IjY2YWUxMjMzMzIzOTViOWM3OGEzNDExYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8_Ng5B0RSZ2FmWHAafgUv-TjUZYn0xQSDgM9cG3Tk4'
        }
    };

useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch(url, options);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            console.log("data", data);
            setRecommendations(data.results); 
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    fetchData();
}, [url]);



    return (
        <div>
            <h1 className="text-3xl text-black font-bold mb-4">Recommended for you</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {recommendations.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
                    >
                        <div className="relative w-full h-72 overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title}
                                className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                            />
                            <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 z-10" onClick={()=>navigate('/')}>
                                <FaBookmark className="h-4 w-4 text-gray-700"/>
                            </button>
                            <button className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <FaPlay className='h-6 w-6 md:h-7 md:w-7 inline'/>
                                <span className="ml-2 font-bold">Play</span>
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommended;
