import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../../Themes/useThemeHeadless';
import {
    Moon,
    Sun,
    Monitor,
    Check
} from 'lucide-react';
import { globalEventBus } from '../../../../core/Globals/eventBus.ts';

export const AppearanceSettings: React.FC = () => {
    let { isDark, toggleTheme } = useTheme();
    const [fontSize, setFontSize] = useState(14);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | 'system'>('dark');

    const themes = [
        { id: 'light' as const, label: 'Light', icon: Sun, color: '#f59e0b' },
        { id: 'dark' as const, label: 'Dark', icon: Moon, color: '#5252ff' },
        { id: 'system' as const, label: 'System', icon: Monitor, color: '#6d98fd' },
    ];

    const handleThemeSelect = (themeId: 'light' | 'dark' | 'system') => {
        setActiveTheme(themeId);
        if (themeId === 'light' && isDark) {
            toggleTheme();
        } else if (themeId === 'dark' && !isDark) {
            toggleTheme();
        }
        //TODO: 'system' would need additional logic to detect OS preference
    };
    useEffect(() => {
        const themeListener = globalEventBus.on('theme:change', (isdark) => isDark = isdark)
        return () => themeListener.unsubscribe()
    }, [])

    return (
        <div className="space-y-6">
            {/* Theme Selector */}
            <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                    {themes.map((t) => {
                        const Icon = t.icon;
                        const isActive = activeTheme === t.id;
                        return (
                            <motion.button
                                key={t.id}
                                onClick={() => handleThemeSelect(t.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative p-4 rounded-xl border transition-all duration-300 ${isActive
                                    ? 'border-primary-400/30 bg-primary-400/5 dark:border-white/20 dark:bg-white/5'
                                    : 'border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/10'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className="p-2 rounded-lg"
                                        style={{ backgroundColor: `${t.color}15` }}
                                    >
                                        <Icon size={20} style={{ color: t.color }} />
                                    </div>
                                    <span className={`text-xs font-medium ${isActive ? 'text-gray-900 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {t.label}
                                    </span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="themeCheck"
                                        className="absolute top-2 right-2"
                                    >
                                        <Check size={14} className="text-primary-400" />
                                    </motion.div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Font Size Slider */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Font Size</label>
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">{fontSize}px</span>
                </div>
                <div className="relative h-10 flex items-center">
                    <input
                        type="range"
                        min={12}
                        max={20}
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none bg-gray-200 dark:bg-white/10 accent-primary-400 cursor-pointer"
                        style={{ accentColor: '#5252ff' }}
                    />
                </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Accessibility</label>
                <div className="space-y-2">
                    {[
                        { label: 'Reduced Motion', desc: 'Minimize animations', state: reducedMotion, setter: setReducedMotion },
                        { label: 'High Contrast', desc: 'Increase contrast ratio', state: false, setter: () => { } },
                    ].map((item) => (
                        <motion.div
                            key={item.label}
                            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors"
                        >
                            <div>
                                <p className="text-sm text-gray-800 dark:text-gray-200">{item.label}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-500">{item.desc}</p>
                            </div>
                            <button
                                onClick={() => item.setter(!item.state)}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${item.state ? 'bg-primary-400' : 'bg-gray-200 dark:bg-white/10'
                                    }`}
                            >
                                <motion.div
                                    animate={{ x: item.state ? 20 : 2 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                                />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
