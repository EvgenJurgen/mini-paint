import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { useAppDispatch } from './core/hooks/redux';
import { getUser } from './core/reducers/userReducer';
import { AppRoutes } from './pages/AppRoutes';
import { GlobalStyles } from './pages/styles/global';
import { lightTheme, darkTheme } from './pages/styles/theme';

function App() {
	const dispatch = useAppDispatch();

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
