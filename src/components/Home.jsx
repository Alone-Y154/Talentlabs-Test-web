// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import apple from '../assets/apple.svg';
import google from '../assets/google.svg';
import microsoft from '../assets/microsoft.svg';
import spotify from '../assets/spotify.svg';
import amazon from '../assets/amazon.svg';

const HomePage = () => {
    return (
        <div className="container mx-auto py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Learn to code - for free.</h1>
            <h2 className="text-2xl font-semibold mb-4">Build projects.</h2>
            <h2 className="text-2xl font-semibold mb-8">Earn certifications.</h2>
            <p className="text-gray-600 mb-8">Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten jobs at tech companies including:</p>
            <div className="flex justify-center gap-8 mb-8 flex-col md:flex-row">
                <img src={apple} alt="Apple" className="h-10" />
                <img src={google} alt="Google" className="h-10" />
                <img src={microsoft} alt="Microsoft" className="h-10" />
                <img src={spotify} alt="Spotify" className="h-10" />
                <img src={amazon} alt="Amazon" className="h-10" />
            </div>
             {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Link to="/login" className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mt-8">Get started (it's free)</Link>
        </div>
    );
};

export default HomePage;
