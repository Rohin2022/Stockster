import './App.css';
import LandingPage from './LandingPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import CreateAccount from './CreateAccount';
import { auth } from './firebaseConfig.js'

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(137,52,255)"
    },
    secondary: {
      main: "rgb(212,76,160)"
    }
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

function App() {
  const [user, loading, error] = useAuthState(auth);
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={user==null ? <LandingPage />: <Navigate to="/dashboard" />} />
            <Route path="/newUser" element={user==null ? <CreateAccount />: <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user != null ? <Dashboard user={user}/> : <Navigate to="/login" />} />
            <Route path="*" element={user==null ? <Navigate to="/login" />: <Navigate to="/dashboard" />} />

          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
