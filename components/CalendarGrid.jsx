import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 40 : -40, opacity: 0 }),
};

const CalendarGrid = ({ 
  daysOfWeek, currentMonth, currentYear, direction, firstDayOfMonth, 
  daysInMonth, isSelected, currentTheme, onDateClick, allNotes 
}) => {
  
 
  const getAllNotesForDay = (day) => {
    const currentDayTime = new Date(currentYear, currentMonth, day).getTime();
    
    return allNotes.filter(note => {
      const noteStart = new Date(note.start).getTime();
      const noteEnd = note.end ? new Date(note.end).getTime() : noteStart;
      return currentDayTime >= noteStart && currentDayTime <= noteEnd;
    });
  };

  return (
   
    <div className="mb-8 relative overflow-x-hidden overflow-y-visible">
      <div className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
      
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div 
          key={currentMonth} custom={direction} variants={slideVariants}
          initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: "circOut" }}
          className="grid grid-cols-7 gap-y-3 gap-x-1"
        >
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const { isStart, isEnd, isBetween } = isSelected(day);
            
          
            const dayNotes = getAllNotesForDay(day);
            const primaryNote = dayNotes[0]; 
      
            let dynamicStyle = {};
            
         
            if (isStart || isEnd) {
              dynamicStyle = { backgroundColor: currentTheme.color, color: '#fff', boxShadow: `0 4px 14px 0 ${currentTheme.color}60` };
            } else if (isBetween) {
              dynamicStyle = { backgroundColor: `${currentTheme.color}20`, color: currentTheme.color };
            } 
           
            else if (primaryNote) {
              const isNoteStart = new Date(primaryNote.start).getTime() === new Date(currentYear, currentMonth, day).getTime();
              const isNoteEnd = primaryNote.end && new Date(primaryNote.end).getTime() === new Date(currentYear, currentMonth, day).getTime();
              
              if (isNoteStart || isNoteEnd || !primaryNote.end) {
                dynamicStyle = { backgroundColor: primaryNote.color, color: '#fff', boxShadow: `0 2px 8px 0 ${primaryNote.color}40` };
              } else {
                dynamicStyle = { backgroundColor: `${primaryNote.color}20`, color: primaryNote.color };
              }
            }

            return (
             
              <button
                key={day}
                onClick={() => onDateClick(day)}
                style={dynamicStyle}
                className={`
                  group relative w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 z-10
                  ${(isStart || isEnd || (primaryNote && (!primaryNote.end || new Date(primaryNote.start).getTime() === new Date(currentYear, currentMonth, day).getTime() || new Date(primaryNote.end).getTime() === new Date(currentYear, currentMonth, day).getTime()))) ? 'scale-110' : ''}
                  ${(isBetween || (primaryNote && primaryNote.end && new Date(primaryNote.start).getTime() !== new Date(currentYear, currentMonth, day).getTime() && new Date(primaryNote.end).getTime() !== new Date(currentYear, currentMonth, day).getTime())) ? 'rounded-none w-full scale-100' : ''}
                  ${!isStart && !isEnd && !isBetween && !primaryNote ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-110' : ''}
                `}
              >
                {isBetween && <div style={{ backgroundColor: `${currentTheme.color}20` }} className="absolute inset-0 -z-10 scale-x-125" />}
                
             
                {!isBetween && primaryNote && primaryNote.end && new Date(primaryNote.start).getTime() !== new Date(currentYear, currentMonth, day).getTime() && new Date(primaryNote.end).getTime() !== new Date(currentYear, currentMonth, day).getTime() && (
                   <div style={{ backgroundColor: `${primaryNote.color}20` }} className="absolute inset-0 -z-10 scale-x-125" />
                )}
                
                {day}

                {dayNotes.length > 0 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700 text-white text-xs rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[100] shadow-2xl scale-95 group-hover:scale-100 origin-bottom">
                    
                    <div className="font-semibold mb-2 border-b border-gray-700/50 pb-1.5 flex justify-between items-center">
                      <span>{new Date(currentYear, currentMonth, day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      <span className="bg-gray-800 text-[10px] px-1.5 py-0.5 rounded-full">{dayNotes.length}</span>
                    </div>
                    
                    <ul className="space-y-2 text-left">
                      {dayNotes.map(n => (
                        <li key={n.id} className="flex items-start space-x-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: n.color }} />
                          <span className="truncate w-full leading-tight text-gray-200">{n.text}</span>
                        </li>
                      ))}
                    </ul>

                 
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-[5px] border-transparent border-t-gray-900/95" />
                  </div>
                )}

              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CalendarGrid;