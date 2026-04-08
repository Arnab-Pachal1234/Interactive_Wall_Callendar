import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarHeader = ({ currentTheme, currentMonth, currentYear, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.h2 
            key={currentMonth}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-800 tracking-wide"
          >
            {currentTheme.name} <span style={{ color: currentTheme.color }} className="font-light transition-colors duration-500">{currentYear}</span>
          </motion.h2>
        </AnimatePresence>
      </div>
      <div className="flex space-x-3">
        <button onClick={onPrev} className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all shadow-sm active:scale-95 text-gray-500">
          <ChevronLeft size={20} />
        </button>
        <button onClick={onNext} className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all shadow-sm active:scale-95 text-gray-500">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;