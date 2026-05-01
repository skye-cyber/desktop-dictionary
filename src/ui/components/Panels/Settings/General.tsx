import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const GeneralSettings: React.FC = () => {
    const [language, setLanguage] = useState('en');

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Language</label>
                <div className="relative">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:border-primary-400/50 transition-colors appearance-none cursor-pointer"
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data Management</label>
                <div className="space-y-2">
                    {[
                        { label: 'Export Data', desc: 'Download your settings and bookmarks', action: 'Export' },
                        { label: 'Clear Cache', desc: 'Remove temporary files', action: 'Clear' },
                        { label: 'Reset Settings', desc: 'Restore default configuration', action: 'Reset', danger: true },
                    ].map((item) => (
                        <motion.div
                            key={item.label}
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-all cursor-pointer group"
                        >
                            <div>
                                <p className={`text-sm ${item.danger ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>{item.label}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-500">{item.desc}</p>
                            </div>
                            <span className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${item.danger
                                ? 'border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 group-hover:bg-red-50 dark:group-hover:bg-red-500/10'
                                : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/5'
                                }`}>
                                {item.action}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
