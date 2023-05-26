import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  console.log()
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
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
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

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// And now we can use these
export default function SignupForm () {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))
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
      <h1 className='text-5xl text-center my-8' >Create account!</h1>
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

          <button type="submit" onSubmit={handleSubmit} className='bg-green-300 rounded-md'>Submit</button>
        </Form>
      </Formik>
    </>
  );
};
