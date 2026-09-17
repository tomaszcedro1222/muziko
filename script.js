const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLabel = menuButton?.querySelector('.sr-only');

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;

  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);

  if (menuLabel) {
    menuLabel.textContent = open ? 'Zamknij menu' : 'Otwórz menu';
  }
}

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

mobileMenu?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement || event.target.closest('a')) {
    setMenu(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 800) setMenu(false);
});

document.querySelectorAll('.filter-tabs').forEach((tabs) => {
  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    tabs.querySelectorAll('button').forEach((item) => item.classList.remove('is-selected'));
    button.classList.add('is-selected');

    if (!tabs.classList.contains('gallery-tabs')) return;
    const filter = button.dataset.filter;
    document.querySelectorAll('.gallery-card').forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.kind !== filter);
    });
  });
});

document.querySelectorAll('.artist-card__visual').forEach((button) => {
  button.addEventListener('click', () => {
    if (!window.matchMedia('(max-width: 800px)').matches) return;

    const card = button.closest('.artist-card');
    const willExpand = !card.classList.contains('is-expanded');

    document.querySelectorAll('.artist-card.is-expanded').forEach((item) => {
      item.classList.remove('is-expanded');
      item.querySelector('.artist-card__visual')?.setAttribute('aria-expanded', 'false');
    });

    card.classList.toggle('is-expanded', willExpand);
    button.setAttribute('aria-expanded', String(willExpand));
  });
});
