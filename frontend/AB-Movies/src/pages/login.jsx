// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../component/authContext'; 

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false); 
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // Custom validation logic
//     if (!email.includes('@')) {
//       alert('Please enter a valid email address.');
//       return;
//     }
//     if (password.length < 6) {
//       alert('Password must be at least 6 characters long.');
//       return;
//     }
  
//     setLoading(true); 
//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false); 
//     }
//   };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src="public/assets/film_icon.jpg" 
//             alt="Logo"
//             className="h-16 w-16 object-contain mb-4"
//           />
//           <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
//           <p className="text-gray-600">Please log in to continue</p>
//         </div>
//         {loading ? (
//           <div className="flex flex-col items-center justify-center min-h-[200px]">
//             <div className="spinner-border animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//             <p className="mt-4 text-gray-700 text-lg">Loading...</p>
//           </div>
//         ) : (
//           <form onSubmit={handleLogin} className='space-y-4'>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 Login
//               </button>
//               <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => navigate('/signUp')}>
//                 SignUp
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../component/authContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false); 
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent form from refreshing the page
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch');
//       }
  
//       const data = await response.json();
//       if (data.message === 'login successfully') {
//         localStorage.setItem('authToken', data.token); // Save token to localStorage
//         setIsLoggedIn(true); // Set authentication state
//         navigate("/"); // Redirect to homepage after successful login
//       } else {
//         console.error('Login failed:', data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false); // Stop loading spinner
//     }
//   };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src="public/assets/film_icon.jpg" 
//             alt="Logo"
//             className="h-16 w-16 object-contain mb-4"
//           />
//           <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
//           <p className="text-gray-600">Please log in to continue</p>
//         </div>
//         {loading ? (
//           <div className="flex flex-col items-center justify-center min-h-[200px]">
//             <div className="spinner-border animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//             <p className="mt-4 text-gray-700 text-lg">Loading...</p>
//           </div>
//         ) : (
//           <form onSubmit={handleLogin} className='space-y-4'>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 Login
//               </button>
//               <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => navigate('/signUp')}>
//                 SignUp
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/authContext'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Custom validation logic
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
  
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src="public/assets/film_icon.jpg" 
            alt="Logo"
            className="h-16 w-16 object-contain mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600">Please log in to continue</p>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="spinner-border animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-700 text-lg">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                Login
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onClick={() => navigate('/signUp')}>
                SignUp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
