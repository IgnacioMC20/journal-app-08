import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
  
  const dispatch = useDispatch();
  const { loading } = useSelector( state => state.ui);
  // const { msgError } = useSelector( state => state.ui );

// console.log(loading);
  const [ formValues, handleInputChange] = useForm({
    email: 'ign@ign.com',
    password: '123456'
  })

  const { email, password } = formValues;

  const handleLogin = (event) => {
    event.preventDefault();
    // console.log({email, password});

    dispatch( startLoginEmailPassword(email, password) );
  };

  const handleGoogleLogin = () => {
    console.log('google login');
    dispatch(startGoogleLogin());
  };



  return (
    <div>
       {/* {
        msgError && 
        (<div className="auth__alert-errors">
          { msgError }
        </div>)
        } */}
      <h1 className='auth__title'>Login</h1>
      <form onSubmit={ handleLogin }>
        <input className='auth__input' value={ email } onChange={handleInputChange} autoComplete='off' type="text" placeholder='Email' name='email' />
        <input className='auth__input' value={ password } onChange={handleInputChange} type="password" placeholder='Password' name='password' />
        <button className='btn btn-primary btn-block' type='submit' disabled={ loading } >Login</button>
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={ handleGoogleLogin }>
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign In with Google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className='link'>Create New Account</Link>
      </form>
    </div>
  )
}
