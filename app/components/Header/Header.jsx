import { Home, List, MessageCircle } from 'lucide-react';
import LoginButton from './LoginButton';
import AuthContextProvider from '@/lib/contexts/AuthContext';
import Link from 'next/link';

export default function Header() {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-7 py-2 border-b bg-gray-700"> {/* Changed py-3 to py-2 */}
                <Link href="/">
                    <div className="flex items-center space-x-1">
                        <img className="h-8" src="/logo1.png" alt="Logo" /> {/* Adjusted logo height to fit better */}
                        <span className="self-center text-3xl font-serif whitespace-nowrap dark:text-black">Feather</span> {/* Adjusted font size */}
                    </div>
                </Link>
                <ul className="flex gap-6 items-center">
                    <Link href={'/'}>
                        <li className="flex items-center gap-2">
                            <Home />
                            Home
                        </li>
                    </Link>
                    <Link href={'/categories'}>
                        <li className="flex items-center gap-2">
                            <List />
                            Categories
                        </li>
                    </Link>
                    <Link href={'/contactus'}>
                        <li className="flex items-center gap-2">
                            <MessageCircle />
                            Contact Us
                        </li>
                    </Link>
                </ul>
                <AuthContextProvider>
                    <LoginButton />
                </AuthContextProvider>
            </nav>
            <div className="mt-16">
                <hr className="border-white" />
            </div>
        </>
    );
}
