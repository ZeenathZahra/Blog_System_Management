import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const LoginModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isOpen || !isMounted) return null;

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    username: username,
                    email: email
                });
                onClose(); // Close modal after registration
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                onClose(); // Close modal after login
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email
                });
            }
            onClose(); // Close modal after Google sign-in
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{isRegistering ? 'Register' : 'Login'}</h2>
                    <button onClick={onClose} className="text-black">&times;</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    {isRegistering && (
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
                    )}
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
                    <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full w-full justify-center"
                    >
                        <img className='h-7' src="/google.png" alt="Google logo" />
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="mt-2 text-blue-500"
                    >
                        {isRegistering ? 'Already have an account? Login' : 'Create an account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
