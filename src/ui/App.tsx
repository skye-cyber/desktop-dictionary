import React from 'react';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-vimdark-50 dark:bg-vimdark-100">
            <HomePage />
        </div>
    );
};

export default App;