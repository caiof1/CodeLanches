// CSS
import './App.css';

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Components
import Header from './components/Header/Header';

// firebase 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useEffect } from 'react'

// Pages
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';


function App() {

  const [user, setUser] = useState('')

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth, user])

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Header /> }
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
