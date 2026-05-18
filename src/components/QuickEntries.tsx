import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Lightbulb, Compass, Calendar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { getActiveQuickEntries } from '../utils/quickEntriesData';
import { QuickEntry as AdminQuickEntry } from '../types/admin';

const iconMap: Record<string, LucideIcon> = {
  'book': BookOpen,
  'graduation': GraduationCap,
  'lightbulb': Lightbulb,
  'compass': Compass,
  'calendar': Calendar,
};

export default function QuickEntries() {
  const [entries, setEntries] = useState<AdminQuickEntry[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const activeEntries = getActiveQuickEntries();
    setEntries(activeEntries);
  };

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden" aria-labelledby="quick-entries-heading">
      <div className="container-custom relative">
        <div className="text-center mb-12">
          <SectionTitle id="quick-entries-heading">
            快速导航
          </SectionTitle>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            一键访问常用功能，开启学习之旅
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {entries.map((entry, index) => {
            const IconComponent = iconMap[entry.icon] || BookOpen;
            return (
              <motion.a
                key={`quick-entry-${entry.id}`}
                href={entry.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100 
                           hover:border-blue-200 hover:shadow-xl transition-all duration-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">
                    {entry.title}
                  </h3>
                  {entry.description && (
                    <p className="text-sm text-slate-500 text-center">
                      {entry.description}
                    </p>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
