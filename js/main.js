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


// 年末年始：スクロールモーダル
document.addEventListener('DOMContentLoaded', () => {
  const scrollModal = document.getElementById('scroll-modal');
  const modalBg = document.querySelector('.modal-bg');

  let isShown = false;
  let isClosed = false;
  let hasScrolled = false;

  // スクロール停止用
  // const preventScroll = (e) => {
  //   e.preventDefault();
  // };



  // 追加（GWの営業案内）
  const preventScroll = (e) => {
  // モーダル内ならスクロール許可
    if (e.target.closest('.modal-scroll')) return;

    e.preventDefault();
  };



  function disableScroll() {
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
  }

  function enableScroll() {
    document.removeEventListener('wheel', preventScroll);
    document.removeEventListener('touchmove', preventScroll);
  }

  function getScrollTrigger() {
    const width = window.innerWidth;

    if (width <= 767) {
      return 100;
    } else if (width <= 1024) {
      return 100;
    } else {
      return 140;
    }
  }

  window.addEventListener('scroll', () => {
    if (!hasScrolled && window.scrollY > 0) {
      hasScrolled = true;
    }

    if (!hasScrolled || isShown || isClosed) return;

    if (window.scrollY > getScrollTrigger()) {
      scrollModal.classList.add('active');
      modalBg.classList.add('active');
      disableScroll(); // ← ここが重要

      isShown = true;
    }
  });

  scrollModal.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });



  // 追加
  scrollModal.addEventListener('click', (e) => {
    // innerの中じゃなければ閉じる
    if (!e.target.closest('.modal-scroll__inner')) {
      closeModal();
    }
  });



  modalBg.addEventListener('click', closeModal);

  function closeModal() {
    scrollModal.classList.remove('active');
    modalBg.classList.remove('active');
    enableScroll(); // ← 元に戻す

    isClosed = true;
  }
});




// モーダル
// document.addEventListener('DOMContentLoaded', () => {
//   const modalBg = document.querySelector('.modal-bg');
//   const modals = document.querySelectorAll('.modal-container');

//   // 開く処理
//   document.querySelectorAll('.modal-open').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const targetId = btn.dataset.target;
//       const targetModal = document.getElementById(targetId);
//       if (targetModal) {
//         targetModal.classList.add('active');
//         modalBg.classList.add('active');
//         document.body.style.overflow = 'hidden'; // ← スクロール禁止
//       }
//     });
//   });

//   // 閉じる処理（背景クリック）
//   modalBg.addEventListener('click', () => {
//     closeModal();
//   });

//   // 閉じる処理（ボタン）
//   document.querySelectorAll('.modal-close').forEach(btn => {
//     btn.addEventListener('click', () => {
//       closeModal();
//     });
//   });

//   // モーダル外クリックで閉じる
//   modals.forEach(modal => {
//     modal.addEventListener('click', (e) => {
//       // modal-scroll の中身をクリックしたときは閉じない
//       if (e.target === modal) {
//         closeModal();
//       }
//     });
//   });

//   // 共通の閉じる関数
//   function closeModal() {
//     modals.forEach(m => m.classList.remove('active'));
//     modalBg.classList.remove('active');
//     document.body.style.overflow = ''; // ← スクロール再開
//   }
// });