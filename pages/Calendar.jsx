"use client";

import React, { useState, useEffect } from 'react';
import { MONTH_THEMES } from '../Utils/image';

import CalendarHero from '../components/CalendarHero';
import CalendarHeader from '../components/CalendarHeader';
import CalendarGrid from '../components/CalendarGrid';
import CalendarNotes from '../components/CalendarNotes';

const WallCalendar = () => {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selection, setSelection] = useState({ start: null, end: null });
  
  const [allNotes, setAllNotes] = useState([]);
  
  const [direction, setDirection] = useState(0); 

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentTheme = MONTH_THEMES[currentMonth];


  useEffect(() => {
    setMounted(true);
    const savedNotes = localStorage.getItem('lumical-all-notes');
    if (savedNotes) {
    
      const parsedNotes = JSON.parse(savedNotes).map(note => ({
        ...note,
        start: new Date(note.start),
        end: note.end ? new Date(note.end) : null
      }));
      setAllNotes(parsedNotes);
    }
  }, []);


  const handleAddNote = (text, color) => {
    if (!selection.start || !text.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      start: selection.start,
      end: selection.end,
      text: text,
      color: color
    };

    const updatedNotes = [...allNotes, newNote];
    setAllNotes(updatedNotes);
    
    localStorage.setItem('lumical-all-notes', JSON.stringify(updatedNotes));

    setSelection({ start: null, end: null });
  };


  const handleDeleteNote = (id) => {
    const updatedNotes = allNotes.filter(note => note.id !== id);
    setAllNotes(updatedNotes);
    localStorage.setItem('lumical-all-notes', JSON.stringify(updatedNotes));
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    if (!selection.start || (selection.start && selection.end)) {
      setSelection({ start: clickedDate, end: null });
    } else {
      if (clickedDate < selection.start) {
        setSelection({ start: clickedDate, end: selection.start });
      } else {
        setSelection({ ...selection, end: clickedDate });
      }
    }
  };

  const isSelected = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    if (!selection.start) return false;
    
    const isStart = date.getTime() === selection.start.getTime();
    const isEnd = selection.end && date.getTime() === selection.end.getTime();
    const isBetween = selection.end && date > selection.start && date < selection.end;

    return { isStart, isEnd, isBetween };
  };

  if (!mounted) return <div className="min-h-screen bg-[#f3f4f6] animate-pulse" />;

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 sm:p-8 overflow-hidden z-0">
      
      <div 
        className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 transition-colors duration-1000 -z-10"
        style={{ backgroundColor: currentTheme.color }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 transition-colors duration-1000 -z-10"
        style={{ backgroundColor: currentTheme.color }}
      />

      <div 
        className="relative max-w-5xl w-full bg-white/95 backdrop-blur-xl rounded-3xl flex flex-col md:flex-row overflow-hidden transition-all duration-700 transform hover:-translate-y-1"
        style={{
          boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 15px 25px -5px rgba(0, 0, 0, 0.05), 0 0px 40px 0px ${currentTheme.color}25`,
          borderTop: '2px solid rgba(255, 255, 255, 0.9)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.6)'
        }}
      >
        <CalendarHero currentTheme={currentTheme} currentMonth={currentMonth} />

        <div className="md:w-1/2 p-8 lg:p-10 flex flex-col bg-white">
          <CalendarHeader 
            currentTheme={currentTheme}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
          />
        
          <CalendarGrid 
            daysOfWeek={daysOfWeek}
            currentMonth={currentMonth}
            currentYear={currentYear}
            direction={direction}
            firstDayOfMonth={firstDayOfMonth}
            daysInMonth={daysInMonth}
            isSelected={isSelected}
            currentTheme={currentTheme}
            onDateClick={handleDateClick}
            allNotes={allNotes} 
          />

          <CalendarNotes 
            selection={selection}
            currentTheme={currentTheme}
            allNotes={allNotes}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onClearSelection={() => setSelection({start: null, end: null})}
          />
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;