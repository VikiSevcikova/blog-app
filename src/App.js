import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Container, Row } from 'react-bootstrap';
import Login from './components/login/Login';
import NotFound from "./components/notFound/NotFound";
import PublicRoute from "./routes/PublicRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/signup/Signup";
import { MessageAlert } from "./components/messageAlert.js/MessageAlert";
import PrivateRoute from "./routes/PrivateRoute";
import { useDispatch } from "react-redux";
import { getUser } from "./store/actions/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(async()=>{
    if(localStorage.getItem("blog-token")){
      await dispatch(getUser())
    }
  },[]);

  return (
    <Container fluid className="position-relative px-0" style={{minHeight:"100vh"}}>
      <MessageAlert/>
      <Router>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path='*' element={<NotFound/>} />
          </Routes>
      </Router>
    </Container>
  );
}

export default App;
