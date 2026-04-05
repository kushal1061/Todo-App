import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const TaskForm = ({ onSubmit, initialData, onClose, title }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work',
    dueDate: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'work',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-paper border-2 border-ink shadow-analog-lg my-8 transform transition-all animate-fade-in"
        style={{ animationName: 'fade-in', animationDuration: '0.2s' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-8 border-b-2 border-ink/20 opacity-50 pointer-events-none"></div>
        <div className="absolute top-0 left-8 w-px h-full border-l-2 border-accent-terracotta/30 pointer-events-none z-0"></div>

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex justify-between items-center mb-8 border-b-2 border-ink pb-4">
            <h2 className="font-syne font-bold text-2xl uppercase tracking-tighter text-ink">{title || 'Entry'}</h2>
            <button 
              onClick={onClose} 
              className="text-ink hover:bg-ink hover:text-paper p-1 transition-colors rounded-sm"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="font-dm font-bold text-xs uppercase tracking-wider text-ink-light mb-1" htmlFor="title">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="paper-input text-lg font-bold"
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            
            <div className="flex flex-col">
              <label className="font-dm font-bold text-xs uppercase tracking-wider text-ink-light mb-1" htmlFor="description">Details</label>
              <textarea
                id="description"
                name="description"
                className="paper-input min-h-[100px] resize-y italic"
                placeholder="Add some notes..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-dm font-bold text-xs uppercase tracking-wider text-ink-light mb-1" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="paper-input appearance-none bg-paper-light cursor-pointer"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="font-dm font-bold text-xs uppercase tracking-wider text-ink-light mb-1" htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="paper-input font-dm"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-ink border-dashed">
              <button 
                type="button" 
                onClick={onClose} 
                className="paper-btn paper-btn-outline"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="paper-btn bg-ink text-paper hover:bg-ink-light flex items-center gap-2"
              >
                <Check size={16} strokeWidth={3} />
                <span>Save Entry</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
