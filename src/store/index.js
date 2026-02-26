import { configureStore, createSlice } from '@reduxjs/toolkit';

const THEME_STORAGE_KEY = 'theme';
const PROFILE_STORAGE_KEY = 'cmda_profile';

const initialTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
let initialProfile = { name: 'Guest User', email: '' };

const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
if (storedProfile) {
  try {
    initialProfile = JSON.parse(storedProfile);
  } catch {
    initialProfile = { name: 'Guest User', email: '' };
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: initialTheme,
    profile: initialProfile
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload || { name: 'Guest User', email: '' };
    }
  }
});

export const { toggleTheme, setTheme, setProfile } = uiSlice.actions;

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer
  }
});

export default store;
