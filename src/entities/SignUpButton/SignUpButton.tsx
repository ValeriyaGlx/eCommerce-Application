import React from 'react';
import { Link } from 'react-router-dom';
import './_SignUpButton.scss';

export function SignUpButton() {
  return (
    <div className='button-signUp'>
      <Link to='/singUp'>Sign up</Link>
    </div>
  );
}
