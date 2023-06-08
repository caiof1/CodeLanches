// CSS
import './App.css';

// Router
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Components
import Header from './components/Header/Header';

// firebase 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useEffect } from 'react'

// Pages
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import MakeAWish from './Pages/MakeAWish/MakeAWish';


function App() {

  const [user, setUser] = useState('')

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth, user])

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, [pathname])

    return null
  }

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Header /> }
        <ScrollToTop />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/create_order" element={user ? <MakeAWish /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
