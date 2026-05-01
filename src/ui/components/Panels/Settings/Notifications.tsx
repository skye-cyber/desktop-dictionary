import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bell } from 'lucide-react';


export const NotificationSettings: React.FC = () => {
    const [settings, setSettings] = useState({
        push: true,
        email: false,
        sounds: true,
        mentions: true,
        updates: false,
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
                <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${value ? 'bg-primary-400/10' : 'bg-gray-100 dark:bg-white/5'
                            }`}>
                            <Bell size={16} className={value ? 'text-primary-400' : 'text-gray-400 dark:text-gray-500'} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">{key} Notifications</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-500">
                                {key === 'push' && 'Receive push notifications in browser'}
                                {key === 'email' && 'Get updates via email'}
                                {key === 'sounds' && 'Play sound on new notifications'}
                                {key === 'mentions' && 'Notify when mentioned'}
                                {key === 'updates' && 'Product updates and news'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => toggle(key as keyof typeof settings)}
                        className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${value ? 'bg-primary-400' : 'bg-gray-200 dark:bg-white/10'
                            }`}
                    >
                        <motion.div
                            animate={{ x: value ? 22 : 3 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                            className="absolute top-1.5 w-4 h-4 rounded-full bg-white shadow-lg"
                        />
                    </button>
                </motion.div>
            ))}
        </div>
    );
};
