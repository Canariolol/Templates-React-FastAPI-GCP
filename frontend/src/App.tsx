import { useState, useEffect } from 'react';
import { auth } from './firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

// TODO: Replace with your backend URL from an environment variable
const BACKEND_URL = 'http://localhost:8000';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) { 
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleApiCall = async () => {
    setApiResponse('Loading...');
    try {
      const response = await fetch(BACKEND_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Starter Kit Test UI</h1>

        {/* Auth Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Firebase Auth</h2>
          {user ? (
            <div className="text-center">
              <p className="mb-4">Welcome, <span className="font-semibold">{user.email}</span></p>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Login
              </button>
              {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            </form>
          )}
        </div>

        {/* API Test Section */}
        <div>
          <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">Backend API Test</h2>
          <button 
            onClick={handleApiCall}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors mb-4"
          >
            Call / endpoint
          </button>
          {apiResponse && (
            <pre className="bg-gray-800 p-4 rounded-md text-sm whitespace-pre-wrap">{
              apiResponse
            }</pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
