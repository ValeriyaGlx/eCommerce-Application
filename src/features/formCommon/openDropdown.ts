import React from 'react';

export function openDropdown(e: React.MouseEvent) {
  let dropDown = (e.target as HTMLElement).parentElement as HTMLElement;

  if (dropDown.classList.contains('select')) {
    dropDown = (e.target as HTMLElement).parentElement?.parentElement as HTMLElement;
  }

  if (dropDown.classList.contains('dropdown-menu')) {
    dropDown = dropDown.parentElement as HTMLElement;
    dropDown.classList.remove('active');
  } else {
    dropDown.classList.toggle('active');
  }
}
