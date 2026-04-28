/// <reference path="../types/global.d.ts">
import React from 'react';
import HomePage from './pages/HomePage';
import "./styles/global.css"


const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-vimdark-100">
            <HomePage />
        </div>
    );
};

export default App;
