export function openMenu() {
  const menuIcon = document.querySelector('.menu_icon') as HTMLElement;
  const menu = document.querySelector('.menu') as HTMLElement;
  const items = document.querySelectorAll('.menu_list a');
  if (window.screen.width < 630) {
    if (document.body.classList.contains('lock')) {
      closeMenu();
    } else {
      document.body.classList.add('lock');
      menu.style.transform = 'translate(0%, 0px)';
      menuIcon.style.transform = 'rotate(90deg)';
      (document.querySelector('.background-menu') as HTMLElement).style.visibility = 'visible';

      items.forEach((el) => el.addEventListener('click', closeMenu));
      window.addEventListener('click', closeSetWindow);
    }
  }
}

export function closeMenu() {
  const menuIcon = document.querySelector('.menu_icon') as HTMLElement;
  const menu = document.querySelector('.menu') as HTMLElement;
  if (menu) {
    menu.style.transform = 'translate(100%, 0px)';
    menuIcon.style.transform = 'rotate(0deg)';
  }

  document.body.classList.remove('lock');
}

function closeSetWindow(e: Event) {
  const menuIcon = document.querySelector('.menu_icon') as HTMLElement;
  const menu = document.querySelector('.menu') as HTMLElement;
  const modal1 = e.composedPath().includes(menu);
  const modal2 = e.composedPath().includes(menuIcon);

  if (!modal1 && !modal2) {
    closeMenu();
  }
}
