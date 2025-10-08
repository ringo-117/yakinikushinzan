// JavaScript Document
// =============================
// ハンバーガーメニューとスクロール制御
// =============================
{
  const btn = document.querySelector('.btn');
  if (btn) {
    const container = document.querySelector('.container');
    const header   = document.querySelector('.header');
    // const logo     = document.querySelector('.logo-box');

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      container?.classList.toggle('active');
      header?.classList.toggle('active');
      // logo?.classList.toggle('active');

      // ボディのスクロール制御
      const bodyStyle = document.body.style;
      if (bodyStyle.overflow === 'hidden') {
        bodyStyle.overflow = '';
        bodyStyle.height   = '';
      } else {
        bodyStyle.overflow = 'hidden';
        bodyStyle.height   = '100%';
      }
    });

    // メニューリンクをクリックしたらメニューを閉じる（jQuery）
    $('#nav-list a[href]').on('click', () => {
      $('.btn').trigger('click');
    });
  }
}

document.querySelectorAll('a[href="#about"]').forEach(link => {
  link.addEventListener('click', () => {
    document.body.style.overflow = '';
    document.body.style.height = '';
  });
});



window.addEventListener('scroll', () => {
  const menu = document.querySelector('.menu-nav.pc-only');
  const content = document.querySelector('.content');

  // 要素が存在しなければ処理を中断
  if (!menu || !content) return;

  const contentRect = content.getBoundingClientRect();
  const menuHeight = menu.offsetHeight;

  // contentの開始位置と終了位置を取得
  const contentTop = contentRect.top + window.scrollY;
  const contentBottom = contentTop + content.offsetHeight;

  // 現在のスクロール位置
  const scrollY = window.scrollY;

  // stickyになる位置（top:120pxの時）
  const stickyStart = contentTop - 120;

  // stickyを解除する位置（contentの底）
  const stickyEnd = contentBottom - (menuHeight + 120);

  // クラス切り替え
  if (scrollY >= stickyStart && scrollY < stickyEnd) {
    menu.classList.add('sticky');
    menu.classList.remove('ended');
  } else if (scrollY >= stickyEnd) {
    menu.classList.remove('sticky');
    menu.classList.add('ended');
  } else {
    menu.classList.remove('sticky', 'ended');
  }
});


