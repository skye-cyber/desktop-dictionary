import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';

export const PrivacySettings: React.FC = () => (
    <div className="space-y-6">
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20">
            <div className="flex items-start gap-3">
                <Shield size={18} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">Privacy Mode Active</h4>
                    <p className="text-xs text-amber-600/80 dark:text-amber-200/60 mt-1 leading-relaxed">
                        Your data is encrypted and stored locally. No information is shared with third parties.
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Security</label>
            <div className="space-y-2">
                {[
                    { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', active: true },
                    { label: 'Session Management', desc: 'Manage active sessions', active: false },
                    { label: 'API Keys', desc: 'Manage access tokens', active: false },
                ].map((item) => (
                    <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-all cursor-pointer"
                    >
                        <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200">{item.label}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-500">{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 dark:text-gray-600" />
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);
