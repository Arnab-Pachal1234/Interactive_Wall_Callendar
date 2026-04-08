import React, { useState } from 'react';
import { X, Trash2, Plus } from 'lucide-react';

const PRESET_COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const CalendarNotes = ({ selection, currentTheme, allNotes, currentMonth, currentYear, onAddNote, onDeleteNote, onClearSelection }) => {
  const [newNoteText, setNewNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);


  const monthNotes = allNotes.filter(note => {
    const noteStartMonth = new Date(note.start).getMonth();
    const noteStartYear = new Date(note.start).getFullYear();
    const noteEndMonth = note.end ? new Date(note.end).getMonth() : noteStartMonth;
    const noteEndYear = note.end ? new Date(note.end).getFullYear() : noteStartYear;
    
    return (currentYear >= noteStartYear && currentYear <= noteEndYear) && 
           (currentMonth >= noteStartMonth && currentMonth <= noteEndMonth);
  });

  const handleSave = () => {
    onAddNote(newNoteText, selectedColor);
    setNewNoteText("");
  };

  const isCreating = selection.start !== null;

  return (
    <div className="mt-auto flex flex-col flex-grow h-[180px]">
      
      {/* Header Area */}
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {isCreating ? "New Event Range" : "Saved Events"}
        </h3>
        
        {isCreating && (
          <div className="flex items-center space-x-2">
            <span style={{ backgroundColor: `${currentTheme.color}1A`, color: currentTheme.color }} className="text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              {selection.start.toLocaleDateString()} {selection.end && ` → ${selection.end.toLocaleDateString()}`}
            </span>
            <button onClick={onClearSelection} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      
      <div className="w-full flex-grow bg-gray-50/50 border border-gray-100 rounded-2xl overflow-hidden shadow-inner flex flex-col">
        
        {isCreating ? (
          
          <div className="p-4 flex flex-col h-full animate-in fade-in zoom-in duration-300">
            <input
              type="text"
              autoFocus
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="What's happening on these dates?"
              className="w-full bg-transparent text-gray-800 font-medium focus:outline-none mb-3"
            />
            
            <div className="flex justify-between items-center mt-auto">
              <div className="flex space-x-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full transition-transform ${selectedColor === color ? 'scale-125 ring-2 ring-offset-1' : 'hover:scale-110'}`}
                    style={{ backgroundColor: color, ringColor: color }}
                  />
                ))}
              </div>
              
              <button 
                onClick={handleSave}
                disabled={!newNoteText.trim()}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={16} />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
         
          <div className="p-2 overflow-y-auto h-full space-y-2">
            {monthNotes.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                <p>No events saved for {currentTheme.name}.</p>
                <p className="text-xs mt-1">Select dates on the calendar to add one.</p>
              </div>
            ) : (
              monthNotes.map(note => (
                <div key={note.id} className="group flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 truncate pr-4">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: note.color }} />
                    <div className="flex flex-col truncate">
                      <span className="text-sm font-semibold text-gray-800 truncate">{note.text}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(note.start).getDate()} {new Date(note.start).toLocaleString('default', { month: 'short' })}
                        {note.end && ` - ${new Date(note.end).getDate()} ${new Date(note.end).toLocaleString('default', { month: 'short' })}`}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteNote(note.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default CalendarNotes;