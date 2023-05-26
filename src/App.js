import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ViewProfile from './pages/view-profile';
import SignupForm from './pages/create-profile';
import EditAccount from './pages/edit-profile';
import { ProfileProvider, useLocalStorage } from 'react';
// function App() {
//   // const router = createBrowserRouter([
//   //   {
//   //     path: "/",
//   //     element: <ViewProfile />,
//   //     // errorElement: <ErrorPage />,
//   //   },
//   // ]);
//   return (
//     <div className="">
//       <SignupForm />
//       <ViewProfile /> 
      

//       {/* <React.StrictMode>
//         <ReactProvider router={router}/>
//       </React.StrictMode> */}
//     </div>
//   );
// }
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className='h-16 bg-blue-200 z-10 flex items-baseline'>
            <p style={{padding: "10px", fontSize: "25px", flex: "1", fontStyle: "italic", fontFamily:"-moz-initial"}}>Rebase academy</p>
            <ul className='float-right underline' style={{display: 'flex', gap: "1.5rem", paddingTop:'10px'}}>
              <li>
                <Link to="/create-profile">Create account</Link>
              </li>
              <li style={{paddingRight:'10px'}}>
                <Link to="/view-profile">View account</Link>
              </li>
              <li style={{paddingRight:'10px'}}>
                <Link to="/edit-profile">Edit account</Link>
              </li>
            </ul>
          </nav>
          
          <Routes>
            <Route exact path='/create-profile' element={<SignupForm />}></Route>
            <Route exact path='/view-profile' element={<ViewProfile />}></Route>
            <Route exact path='/edit-profile' element={<EditAccount />}></Route>
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
