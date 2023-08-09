import React from 'react';
import { Link } from 'react-router-dom';
import './SignInButton.css';

export function SignInButton() {
  return (
    <div className='button-signIn'>
      <Link to='/signIn'>Sign in</Link>
    </div>
  );
}
