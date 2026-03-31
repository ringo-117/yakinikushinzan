
// // ヒーロースライダー
const heroSwiper = new Swiper(".hero-swiper", {
  effect: "fade",       // フェード切り替え
  loop: true,           // ループ
  autoplay: {
    delay: 3400,        // 3秒ごとに切り替え
    disableOnInteraction: false,
  },
  // speed: 2500,          // フェードの速さ（1秒）
  speed: 2000,          // フェードの速さ（1秒）
});