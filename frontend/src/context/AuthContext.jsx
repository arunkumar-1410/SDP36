import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, _password) => {
    // Simulated login - in production, this would call your backend
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'student',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}`,
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const signup = async (name, email, _password) => {
    // Simulated registration - in production, this would call your backend
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: 'student',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
