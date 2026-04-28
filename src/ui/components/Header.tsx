import React from 'react';
import { FiBookOpen, FiSun, FiMoon, FiSettings } from 'react-icons/fi';

interface HeaderProps {
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-vimdark-500">
            <div className="flex items-center space-x-2">
                <FiBookOpen className="text-2xl text-blue-500" />
                <h1 className="text-xl font-bold">Desktop Dictionary</h1>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={onToggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-vimdark-400"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {darkMode ? <FiSun /> : <FiMoon />}
                </button>
                <button
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-vimdark-400"
                    title="Settings"
                >
                    <FiSettings />
                </button>
            </div>
        </header>
    );
};

export default Header;