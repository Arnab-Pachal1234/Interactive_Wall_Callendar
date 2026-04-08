import { motion, AnimatePresence } from 'framer-motion';

const fadeVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const CalendarHero = ({ currentTheme, currentMonth }) => {
  return (
    <div className="md:w-1/2 relative h-72 md:h-auto overflow-hidden group bg-black">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img 
          key={currentMonth}
          src={currentTheme.img} 
          alt={`${currentTheme.name} theme`} 
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
        <AnimatePresence mode="popLayout">
          <motion.h1 
            key={currentMonth}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-white text-5xl font-light tracking-widest drop-shadow-lg"
          >
            {currentTheme.name}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CalendarHero;