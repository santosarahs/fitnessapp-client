import './App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Workouts from './pages/Workouts'
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';


function App({ apiUrl }) {

  const [user, setUser] = useState({
    id: null
  })


  function unsetUser(){
    localStorage.clear();
  }

      // Fetch user details on app load
      useEffect(() => {
        fetch(`${apiUrl}/users/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then((res) => res.json())
          .then((data) => {      
            if (data && data.user) {
              setUser({
                id: data.user._id || null // Safely access _id or set to null
              });
            } else {
              setUser({
                id: null
              });
            }
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
            setUser({ id: null }); // Handle fetch errors gracefully
          });
      }, [apiUrl]);

    useEffect(() => {
    }, [user]);


  return (
    <>
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/workouts" element={<Workouts apiUrl={apiUrl} user={user}/>} /> 
            <Route path="/login" element={<Login apiUrl={apiUrl}/>} />
            <Route path="/logout" element={<Logout apiUrl={apiUrl}/>} /> 
            <Route path="/register" element={<Register apiUrl={apiUrl}/>} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
