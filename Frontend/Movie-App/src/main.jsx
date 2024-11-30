import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './Redux/store.js';
import { Provider, useSelector } from 'react-redux';

// Theme Wrapper Component
const ThemeWrapper = ({ children }) => {
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeWrapper>
          
            <App />
          
        </ThemeWrapper>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
