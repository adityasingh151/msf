import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/authSlice';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  console.log("AdminLogin component rendered");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Attempting login with email:", email);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login successful, user:", user);
      dispatch(setUser({ uid: user.uid, email: user.email }));
      navigate('/admin/dashboard'); // Assuming there's a dashboard route for logged-in admins
    } catch (error) {
      console.error("Failed to login:", error);
      setError("Failed to login: " + error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset the password.");
      return;
    }
    console.log("Attempting to send password reset email to:", email);
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      console.error("Failed to send reset email:", error);
      setError("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Admin Login</h2>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out ${!email || !password ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!email || !password}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={handleResetPassword}
              className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
