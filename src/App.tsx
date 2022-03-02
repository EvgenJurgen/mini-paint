import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';
import { getUser } from './core/actions/userActions';
import { AppRoutes } from './pages/AppRoutes';
import { GlobalStyles } from './pages/themeStyles/global';
import { lightTheme, darkTheme } from './pages/themeStyles/theme';

function App(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
