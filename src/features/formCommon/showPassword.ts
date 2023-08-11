import React from 'react';

export function showPassword(e: React.MouseEvent) {
  let passwordInput = (e.target as HTMLElement).parentElement?.parentElement?.firstElementChild;

  if (passwordInput?.tagName === 'IMG') {
    passwordInput = (e.target as HTMLElement).parentElement?.parentElement?.children[1] as Element;
  }

  (document.querySelector('.show-password') as HTMLElement).classList.toggle('hide-password');
  const typeOfInput = passwordInput?.getAttribute('type');
  if (typeOfInput === 'password') {
    passwordInput?.setAttribute('type', 'text');
  } else {
    passwordInput?.setAttribute('type', 'password');
  }
}
