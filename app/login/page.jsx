// pages/login.js


"use client"
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to home or dashboard after login
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Redirect to home or dashboard after Google sign-in
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-3 py-2 border rounded-lg" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full px-3 py-2 border rounded-lg" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                  <Link href="/">
                    <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">
                        Login
                    </button>
                    </Link>
                   
                </form>
                <div className="text-center mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full w-full justify-center"
                    >
                        <img className='h-7' src="/google.png" alt="Google logo" />
                        Sign in with Google
                    </button>
                </div>
                <div className="text-center mt-4">
                   
                </div>
            </div>
        </div>
    );
};

export default Login;
