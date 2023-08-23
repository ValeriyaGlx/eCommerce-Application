export function closeMenu() {
  const menuIcon = document.querySelector('.menu_icon') as HTMLElement;
  const menu = document.querySelector('.menu') as HTMLElement;
  if (menu) {
    menu.classList.remove('active');
    menuIcon.classList.remove('active');
    document.body.classList.remove('lock');
  }
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

export function openMenu() {
  const menuIcon = document.querySelector('.menu_icon') as HTMLElement;
  const menu = document.querySelector('.menu') as HTMLElement;
  const items = document.querySelectorAll('.menu_list > a');
  if (window.screen.width < 630) {
    menu.classList.toggle('active');
    menuIcon.classList.toggle('active');
    document.body.classList.toggle('lock');

    items.forEach((el) => {
      el.addEventListener('click', closeMenu);
    });
    window.addEventListener('click', closeSetWindow);
  }
}
