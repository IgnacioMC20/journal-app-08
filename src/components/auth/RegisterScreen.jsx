import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';


export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui );

  // console.log(msgError);

  const initialForm = {
    name: 'Ignacio',
    email: 'ign@ign.com',
    password: '123456',
    password2: '123456',
  }
  const [ formValues, handleInputChange, reset ] = useForm( initialForm );

  const { name, password, password2, email } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if(isFormValid()){
      // console.log({ name, email, password, password2 });
      dispatch( startRegisterWithEmailPassword(email, password, name) );
    }
  }

  const isFormValid = () => {

    if(name.trim().length === 0){
      dispatch( setError('Name is required') );
      // console.log('Name is required');
      return false;
    }else if(!validator.isEmail(email)){
      dispatch( setError('Email is not valid') );
      // console.log('Emial is not valid');
      return false;
    }else if(password !== password2 || password.length < 6){
      dispatch( setError('Passwords do not match and must be at least 6 characters') );
      // console.log('Passwords do not match and must be at least 6 characters');
      return false;
    };

    // console.log('isFormValid')
    dispatch( removeError());
    return true;
  }

  return (
    <div>
      <h1 className='auth__title'>Register</h1>
      <form onSubmit={ handleRegister }>

        {
        msgError && 
        (<div className="auth__alert-errors">
          { msgError }
        </div>)
        }

        <input className='auth__input'onChange={ handleInputChange } value={ name } autoComplete='off' type="text" placeholder='Name' name='name' />
        <input className='auth__input'onChange={ handleInputChange } value={ email } autoComplete='off' type="text" placeholder='Email' name='email' />
        <input className='auth__input'onChange={ handleInputChange } value={ password } type="password" placeholder='Password' name='password' />
        <input className='auth__input'onChange={ handleInputChange } value={ password2 } type="password" placeholder='Confirm Password' name='password2' />
        <button className='btn btn-primary btn-block' type='submit'>Login</button>
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign In with Google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/login" className='link'>Already Registered?</Link>
      </form>
    </div>
  )
}
