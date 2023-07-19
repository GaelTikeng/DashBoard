import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header';
import ViewProfile from './pages/view-profile';
import SignupForm from './pages/create-profile';
import EditAccount from './pages/edit-profile';
import { ProfileProvider, useLocalStorage } from './utils/useLocalStorage';


function App () {
  const { value, setValue } = useLocalStorage("profile");
  const auth = <Route element={<SignupForm/>} index path="/" />;

  const dashboard = (
    <>
      <Route element={<ViewProfile/>} path= "/" index />
      <Route element={<EditAccount/>} path = "/edit-profile" />
    </>
  )
  
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route exact path='/create-profile' element={<SignupForm />}></Route>
          <Route exact path='/view-profile' element={<ViewProfile />}></Route>
          <Route exact path='/edit-profile' element={<EditAccount />}></Route>
        </Routes>

        <ProfileProvider value = {{value, setValue}}>
          <Routes>{value ? dashboard : auth}</Routes>
        </ProfileProvider>

      </div>
    </Router>
  );
  
}

export default App;
