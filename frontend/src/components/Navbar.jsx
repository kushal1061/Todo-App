import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="border-b border-ink/20 py-4 px-6 md:px-12 flex justify-between items-center bg-paper/80 backdrop-blur-sm sticky top-0 z-10 font-syne relative">
      <div className="absolute top-1 left-0 w-full border-t border-ink/10 pointer-events-none"></div>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center font-bold text-xl rounded-sm transform -rotate-2">
          T
        </div>
        <span className="font-bold text-xl tracking-tight uppercase">Todo</span>
      </div>
      
      {user && (
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-right">
            <span className="font-bold text-sm leading-tight text-ink">{user.username}</span>
            <span className="font-dm text-xs text-ink-light leading-tight">{user.email}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-ink hover:text-accent-terracotta transition-colors uppercase font-bold text-sm tracking-wider underline decoration-ink/20 underline-offset-4 hover:decoration-accent-terracotta"
            title="Sign out"
          >
            <span className="hidden sm:inline">Logout</span>
            <LogOut size={16} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
