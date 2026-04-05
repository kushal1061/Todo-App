import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import taskService from '../services/task.service';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, CheckSquare, Loader2 } from 'lucide-react';

const TaskManager = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error creating task:', err);
      alert(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.updateTask(editingTask._id, taskData);
      setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
      alert(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const updatedTask = await taskService.completeTask(taskId);
      setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));
    } catch (err) {
      console.error('Error completing task:', err);
      alert('Failed to complete task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Erase this entry permanently?')) return;
    
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  if (authLoading) return (
    <div className="min-h-screen flex justify-center items-center bg-paper">
      <Loader2 className="animate-spin text-ink" size={48} />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;

  // Sort tasks: pending first, then completed. Then by due date.
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.dueDate || '2099-01-01') - new Date(b.dueDate || '2099-01-01');
    }
    return a.completed ? 1 : -1;
  });

  const pendingCount = tasks.filter(t => !t.completed).length;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-paper flex flex-col font-dm relative">
      <Navbar />
      
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-8 md:p-12 animate-fade-in pb-24">
        
        {/* Header Section (Notepad top) */}
        <div className="mb-12 border-b-4 border-ink pb-8 relative">
          <div className="absolute -top-4 right-0 font-syne text-6xl text-ink/5 select-none pointer-events-none">
            {new Date().getDate().toString().padStart(2, '0')}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
            <div>
              <p className="text-ink-light font-bold text-sm tracking-widest uppercase mb-2 ml-1">{today}</p>
              <h1 className="font-syne text-5xl sm:text-6xl uppercase tracking-tighter leading-none mb-4">
                Manifest
              </h1>
              <div className="inline-flex items-center gap-2 bg-ink text-paper px-3 py-1 rounded-sm text-sm font-bold animate-pulse-slow">
                <span className="w-2 h-2 rounded-full bg-accent-terracotta animate-ping"></span>
                {pendingCount} item{pendingCount !== 1 ? 's' : ''} lingering
              </div>
            </div>
            
            <button 
              onClick={openCreateForm} 
              className="paper-btn bg-accent-orange text-paper hover:bg-opacity-90 flex items-center gap-2 group shadow-analog-lg border-2 border-ink"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>New Entry</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-accent-terracotta/10 border-l-4 border-accent-terracotta text-accent-terracotta font-bold text-sm">
            {error}
          </div>
        )}

        {/* Task List (Ruled paper effect) */}
        <div className="relative paper-panel bg-paper flex-grow min-h-[50vh] p-2 sm:p-4">
          {/* Vertical margin line */}
          <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-px border-l-2 border-accent-terracotta/30 z-0 hidden sm:block pointer-events-none"></div>

          {loading ? (
            <div className="flex justify-center items-center h-48 relative z-10">
              <Loader2 className="animate-spin text-ink/40" size={40} />
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center relative z-10">
              <div className="w-24 h-24 mb-6 rounded-full border-2 border-ink border-dashed flex items-center justify-center text-ink/20 transform -rotate-12">
                <CheckSquare size={48} strokeWidth={1} />
              </div>
              <h2 className="font-syne text-2xl font-bold mb-2">Blank Slate</h2>
              <p className="text-ink-light mb-8 max-w-sm italic">Nothing on the agenda. Start drafting your manifest.</p>
              <button 
                onClick={openCreateForm} 
                className="font-syne font-bold uppercase tracking-widest text-sm border-b-2 border-ink hover:text-accent-orange hover:border-accent-orange transition-colors pb-1"
              >
                + Draft an entry
              </button>
            </div>
          ) : (
            <div className="flex flex-col relative z-10 pl-0 sm:pl-10">
              {sortedTasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onEdit={openEditForm}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {isFormOpen && (
        <TaskForm 
          initialData={editingTask} 
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask} 
          onClose={closeForm}
          title={editingTask ? 'Revise Entry' : 'New Entry'}
        />
      )}
    </div>
  );
};

export default TaskManager;
