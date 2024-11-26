import { LocalStorageService } from '@/services';
import { createSlice } from '@reduxjs/toolkit';

interface PayloadType {
  theme: 'dark' | 'light' | string | null;
}
const localStorageService = LocalStorageService;

let dataFromLocalStorage = '';
if (typeof window != undefined)
  dataFromLocalStorage = JSON.parse(String(localStorage.getItem('theme')));

const initialState: PayloadType = {
  theme: dataFromLocalStorage || 'light',
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state: PayloadType) => {
      if (state.theme == 'light') {
        state.theme = 'dark';

        if (typeof window != undefined)
          localStorageService.change('theme', 'dark');
      } else {
        state.theme = 'light';

        if (typeof window != undefined)
          localStorageService.change('theme', 'light');
      }
    },
    changeThemeInAttr: (state: PayloadType) => {
      if (state.theme == 'dark') {
        document.querySelector('html')?.setAttribute('theme', 'dark');
      } else {
        document.querySelector('html')?.setAttribute('theme', 'light');
      }
    },
  },
});

export default ThemeSlice.reducer;

export const { toggleTheme, changeThemeInAttr } = ThemeSlice.actions;
