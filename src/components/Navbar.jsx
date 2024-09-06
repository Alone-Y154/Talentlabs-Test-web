// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Navbar = ({ isTokenValid, handleLogout }) => {

    const logout = () => {
        localStorage.removeItem('token');
        handleLogout(false)
    };
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1><Link to="/" className="text-xl font-bold">freeCodeCamp</Link></h1>
                {isTokenValid ? (<ul className="flex space-x-4">
                    <li><p onClick={logout} className="cursor-pointer hover:underline">Logout</p></li>
                </ul>)
                    :
                    (<ul className="flex space-x-4">
                        <li><Link to="/login" className="hover:underline">LogIn</Link></li>
                        <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
                    </ul>)}
            </div>
        </nav>
    );
};

export default Navbar;
