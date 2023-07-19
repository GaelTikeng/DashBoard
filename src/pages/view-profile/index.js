import React from 'react';
import { Link } from 'react-router-dom';
import './viewProfile.css';

// import { SignupForm } from './login';

export default function ViewProfile () {
  const currentUser = JSON.parse(localStorage.getItem("userData"));

  // const editProfile = () => {
    
  // }

  return (
    <div className='mx-auto w-2/4 bg-gray-200 h-80 rounded-md shadow-2xl'>
      <h2 className='text-4xl my-3 text-center py-4'>User's profile</h2>
      <div className='flex justify-between'>
        <div className='leading-10 p-3'>
          <p>FirstName: <b>{currentUser.firstName}</b> </p>
          <p>LastName: <b>{currentUser.lastName}</b> </p>
          <p>Email Address: <b>{currentUser.email}</b> </p>
        </div>
        <img style={{borderRaduis:'50%'}} clasName='w-32' src={currentUser.avatar} />
      </div>
      <div className='flex gap-10 w-32 mx-auto'>
        <button type="submit" className='bg-gray-300 px-4 py-2 rounded-md cursor-pointer'><Link to="/edit-profile">Edit</Link></button>
        
        <form
          method="post"
          action="destroy"
        >
          <button className='bg-gray-300 px-4 py-2 rounded-md cursor-pointer' type="submit" style={{color: "red"}}>delete</button>
        </form>
      </div>
      

    </div>
  )
}