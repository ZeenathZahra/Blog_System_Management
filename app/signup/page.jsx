// pages/signup.js

"use client"
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username: username,
                email: email
            });
            setIsRegistered(true);
        } catch (error) {
            console.error("Error during registration:", error);
            setError('Registration failed. Please try again.');
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username: user.displayName,
                email: user.email
            });
            setIsRegistered(true);
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            setError('Google sign-in failed. Please try again.');
        }
    };

    useEffect(() => {
        if (isRegistered) {
            window.location.href = '/login'; // Redirect to login page after signup
        }
    }, [isRegistered]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="w-full px-3 py-2 border rounded-lg" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
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
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">
                        Sign Up
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link href='/admin'>
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full w-full justify-center"
                    >
                        <img className='h-7' src="/google.png" alt="Google logo" />
                        Sign in with Google
                    </button>
                    </Link>
                </div>
                <div className="text-center mt-4">
                        <a  href="/login" className="text-blue-500">Already have an account? Login</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
