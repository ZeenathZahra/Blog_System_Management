// pages/signup.js

"use client"
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            // Redirect to home or dashboard after signup
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

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
                    <Link href="/login">
                    <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">
                        Sign Up
                    </button>
                    </Link>
                </form>
                <div className="text-center mt-4">
?                        <a href = "/login" className="text-blue-500"> Already have an account? Login </a>
\                </div>
            </div>
        </div>
    );
};

export default Signup;
