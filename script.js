let currentIndex = 0;
const images = [
  "images/album1.jpg", "images/album2.jpg", "images/album3.jpg", "images/album4.jpg",
  "images/album5.jpg", "images/album6.JPG", "images/album7.JPG", "images/album8.JPG"
];

document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('img');  // Lấy tất cả các ảnh

  function checkVisibility() {
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        img.classList.add('visible');  // Thêm lớp visible khi ảnh vào vùng nhìn thấy
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();  // Kiểm tra ngay khi trang được tải
});

function changeImageWithEffect(src) {
  const img = document.getElementById('mainDisplay');
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = src;
    img.onload = () => img.style.opacity = 1;
  }, 300);
}

function openLightbox(src) {
  const lightbox = document.getElementById('main-photo');
  currentIndex = images.indexOf(src);
  changeImageWithEffect(src);
  lightbox.classList.add('show');
}

function closeLightbox() {
  document.getElementById('main-photo').classList.remove('show');
}

document.addEventListener("DOMContentLoaded", () => {
  const lightboxImg = document.getElementById('mainDisplay');
  const mainPhoto = document.getElementById('main-photo');
  const row = document.querySelector('.thumbnail-row');
  const thumbnails = document.querySelectorAll('.thumbnail-row img');
  const music = document.getElementById("weddingMusic");
  const musicBtn = document.getElementById("musicToggle");

  // ✅ Preload ảnh lightbox
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  // ✅ Thumbnail click + kéo chuột/thanh cuộn ngang
  let isDown = false, startX, scrollLeft;

  row.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
    row.style.cursor = 'grabbing';
  });

  row.addEventListener('mouseleave', () => isDown = false);
  row.addEventListener('mouseup', () => isDown = false);

  row.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - row.offsetLeft;
    row.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  row.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
  });

  row.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - row.offsetLeft;
    row.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
      e.preventDefault();
      const rowRect = row.getBoundingClientRect();
      const thumbRect = thumbnail.getBoundingClientRect();
      const offset = thumbnail.offsetLeft + thumbRect.width / 2 - rowRect.width / 2;
      row.scrollTo({ left: offset, behavior: 'smooth' });
      openLightbox(thumbnail.src);
    });
  });

  row.scrollLeft = 0;

  // ✅ Nhạc đám cưới
  if (music && musicBtn) {
    const updateBtn = () => musicBtn.textContent = music.paused ? "🎵" : "🔇";

    music.play().then(updateBtn).catch(() => {
      musicBtn.style.display = "block";
      updateBtn();
    });

    musicBtn.addEventListener("click", (e) => {
      e.preventDefault();
      music.paused
        ? music.play().then(updateBtn).catch(console.warn)
        : (music.pause(), updateBtn());
    });

    updateBtn();
  }

  // ✅ Đếm ngược ngày cưới
  const weddingDate = new Date("2025-05-16T10:00:00").getTime();
  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      clearInterval(countdown);
      document.getElementById("countdown").innerHTML = "<p>Đã đến ngày cưới!</p>";
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = m;
    document.getElementById("seconds").innerText = s;
  }, 1000);
});

// ✅ Hoa rơi
let petalCount = 0;
const maxPetals = 30;

function createPetal() {
  if (petalCount >= maxPetals) return;

  const petal = document.createElement('div');
  petal.classList.add('falling-petal');
  petal.textContent = '🌸';

  petal.style.left = Math.random() * 100 + 'vw';
  const duration = Math.random() * 3 + 5;
  petal.style.animationDuration = duration + 's';
  petal.style.fontSize = (Math.random() * 10 + 20) + 'px';

  document.body.appendChild(petal);
  petalCount++;

  setTimeout(() => {
    petal.remove();
    petalCount--;
  }, duration * 1000);
}

// ✅ Gán closeLightbox toàn cục
window.closeLightbox = closeLightbox;

//Tự động chuyển ảnh
let autoSlideIndex = 0;

setInterval(() => {
  const row = document.querySelector('.thumbnail-row');
  const thumbnails = document.querySelectorAll('.thumbnail-row img');

  // Chuyển ảnh lớn
  changeImageWithEffect(images[autoSlideIndex]);

  // Cuộn thumbnail tương ứng
  const thumb = thumbnails[autoSlideIndex];
  const rowRect = row.getBoundingClientRect();
  const thumbRect = thumb.getBoundingClientRect();
  const offset = thumb.offsetLeft + thumbRect.width / 2 - rowRect.width / 2;
  row.scrollTo({ left: offset, behavior: 'smooth' });

  // Cập nhật chỉ số ảnh
  autoSlideIndex = (autoSlideIndex + 1) % images.length;
}, 10000); // 10 giây chuyển ảnh 1 lần