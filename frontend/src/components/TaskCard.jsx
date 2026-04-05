import React from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'work': return 'text-accent-terracotta border-accent-terracotta';
      case 'personal': return 'text-accent-green border-accent-green';
      case 'shopping': return 'text-accent-orange border-accent-orange';
      default: return 'text-ink-light border-ink-light';
    }
  };

  return (
    <div className={`group relative py-4 px-2 ruled-line transition-all ${task.completed ? 'opacity-50' : ''}`}>
      
      <div className="flex items-start gap-4">
        {/* Checkbox (Paper style) */}
        <button 
          onClick={() => onComplete(task._id)}
          disabled={task.completed}
          className={`flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center mt-1 transition-all
            ${task.completed ? 'border-ink bg-ink text-paper' : 'border-ink bg-transparent hover:bg-ink hover:text-paper'}
          `}
          aria-label={task.completed ? "Completed" : "Mark as complete"}
        >
          {task.completed && <Check size={16} strokeWidth={3} />}
        </button>
        
        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-baseline gap-3 mb-1">
            <h3 className={`font-syne font-bold text-lg text-ink truncate 
              ${task.completed ? 'line-through decoration-ink-light decoration-2' : ''}
              ${isOverdue ? 'text-accent-terracotta' : ''}
            `}>
              {task.title}
            </h3>
            
            {task.category && (
              <span className={`font-dm text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded-sm ${getCategoryColor(task.category)} transform -rotate-1`}>
                {task.category}
              </span>
            )}
            
            {task.dueDate && (
              <span className={`font-dm text-xs ml-auto ${isOverdue ? 'text-accent-terracotta font-bold' : 'text-ink-light'}`}>
                {isOverdue && '! '} Due {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          
          {task.description && (
            <p className="font-dm text-sm text-ink-light line-clamp-2 mt-1 italic">
              {task.description}
            </p>
          )}
        </div>
        
        {/* Actions - show on hover/focus */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex-shrink-0">
          <button 
            onClick={() => onEdit(task)} 
            className="p-2 text-ink-light hover:text-ink hover:bg-paper-dark rounded-sm transition-colors"
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(task._id)} 
            className="p-2 text-ink-light hover:text-accent-terracotta hover:bg-accent-terracotta/10 rounded-sm transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default TaskCard;
