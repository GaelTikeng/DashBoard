import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './createProfile.css';



const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};


export default function SignupForm () {
  const { register, handleSubmit } = useForm();
  const mystyle = {
    border: "1px solid #000",
    padding: "10px",
    border: "none",
    borderRadius: "10px"
  }

  // const onSubmit = (data) => {
  //   console.log(data)
  // }

  return (
    <>
      <h1 className='text-5xl text-center mt-8' >Create account!</h1>
      <p className='text-center italic m-2'>Enter your personal informations</p>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          // jobType: '', // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be at most 20 characters ')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.')
          // jobType: Yup.string()
          //   .oneOf(
          //     ['designer', 'development', 'product', 'other'],
          //     'Invalid Job Type'
          //   )
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values.avatar)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            localStorage.setItem('userData', JSON.stringify(values));
            
          }, 400);
        }}
      >
        <Form style={mystyle} className='flex flex-col w-1/3 mx-auto shadow-xl leading-9 h-3/6 bg-blue-200'>
          <MyTextInput
            className="p-1"
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            className="p-1"
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            className="p-1"
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MyTextInput
            className="p-1"
            label="Picture"
            name="avatar"
            type="file"
            ref={register}
          />

          {/* <MySelect label="Job Type" name="jobType">
            <option disabled selected>Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect> */}

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit" onSubmit={handleSubmit} className='bg-green-300 rounded-md'><Link to="/view-profile">Submit</Link></button>
        </Form>
      </Formik>
    </>
  );
};
