"use client"

import { useState } from 'react';
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from 'next/link';

export default function LoginButton() {
    const {
        user,
        isLoading,
        handleLogout,
    } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (user) {
        return (
            <div className="flex gap-4 items-center">
                <button
                    onClick={handleLogout}
                    className="bg-black hover:bg-black text-white font-bold py-2 px-4 border border-black rounded"

                >
                    Logout
                </button>
                <Link href='/admin'>
                    <div className="flex gap-4 rounded-xl bg-blue-100 px-3 py-2">
                        {user.photoURL && (
                            <img className="object-cover h-12 w-12 rounded-full" src={user.photoURL} alt="User profile" />
                        )}
                        <div>
                            <h1 className="font-bold">{user.displayName || user.email}</h1>
                            <h1 className="text-sm text-gray-500">{user.email}</h1>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

    return (
<section className="flex gap-4">
    <Link href='/signup' className="flex-8">
        <button
            className="bg-black hover:bg-black text-white font-bold py-2 px-4 border border-black rounded"
        >
            Sign Up
        </button>
    </Link>
    <Link href='/login' className="flex-8">
        <button
            className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
        >
            Login
        </button>
    </Link>
</section>

    
    );
}
