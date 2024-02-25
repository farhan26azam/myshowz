import create from 'zustand';

// Define the initial state of the store
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Create the store
export const store = create((set) => ({
  ...initialState,
  user: JSON.parse(localStorage.getItem('user')) || null,
  setUser: (userData) => {
    set({ user: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  },
}));
