import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [showPopup, setShowPopup] = useState(null); 
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true); 
    try {
      const response = await fetch('https://capstone-project-5-3.onrender.com/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setShowPopup({ type: 'success', message: 'Account created successfully' });
      } else if (response.status === 409) {
        setShowPopup({ type: 'error', message: 'User already exists' });
      } else {
        setShowPopup({ type: 'error', message: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setShowPopup({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src="public/assets/film_icon.jpg"
            alt="logo"
            className="h-16 w-16 object-contain mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
          <p className="text-gray-600">Please fill in the details to sign up</p>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="spinner-border animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-700 text-lg">Creating account...</p>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className='space-y-4'>
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
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Repeat Password:</label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                className="border rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              Create Account
            </button>
          </form>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className={`bg-white p-8 rounded-lg shadow-lg text-center ${showPopup.type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
            <p className={`text-lg mb-4 ${showPopup.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{showPopup.message}</p>
            <button 
              className="bg-blue-500 text-white p-2 rounded-lg"
              onClick={handleLoginRedirect}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
