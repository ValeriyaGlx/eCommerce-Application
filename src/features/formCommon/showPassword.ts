import React from 'react';

export function showPassword(e: React.MouseEvent) {
  e.preventDefault();

  let passwordInput = (e.target as HTMLElement).parentElement?.parentElement?.firstElementChild;

  if (passwordInput?.tagName === 'IMG') {
    passwordInput = (e.target as HTMLElement).parentElement?.parentElement?.children[1] as Element;
  }

  const typeOfInput = passwordInput?.getAttribute('type');
  if (typeOfInput === 'password') {
    passwordInput?.setAttribute('type', 'text');
  } else {
    passwordInput?.setAttribute('type', 'password');
  }
}
