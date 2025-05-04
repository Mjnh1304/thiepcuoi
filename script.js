let currentIndex = 0;
const images = [
  "images/album1.jpg",
  "images/album2.jpg",
  "images/album3.jpg",
  "images/album4.jpg",
  "images/album5.jpg"
];

function openLightbox(img) {
  const lightbox = document.getElementById('main-photo');
  const lightboxImg = document.getElementById('mainDisplay');
  currentIndex = images.indexOf(img.src);  // Lấy chỉ số ảnh khi mở

  changeImageWithEffect(img.src);
  lightbox.classList.add('show');
}

// Đóng lightbox
function closeLightbox() {
  document.getElementById('main-photo').classList.remove('show');
}

// Chuyển ảnh có hiệu ứng
function changeImageWithEffect(src) {
  const lightboxImg = document.getElementById('mainDisplay');
  lightboxImg.classList.add('fade-out');
  setTimeout(() => {
    lightboxImg.src = src;
    lightboxImg.classList.remove('fade-out');
    lightboxImg.classList.add('fade-in');
    setTimeout(() => {
      lightboxImg.classList.remove('fade-in');
    }, 300);
  }, 300);
}

// Nhấn vào ảnh chính để chuyển ảnh
document.addEventListener("DOMContentLoaded", () => {
  const lightboxImg = document.getElementById('mainDisplay');

  lightboxImg.addEventListener('click', (event) => {
    const imgWidth = lightboxImg.clientWidth;
    const clickX = event.offsetX;

    if (clickX < imgWidth / 2) {
      // Nhấn bên trái → ảnh trước
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      // Nhấn bên phải → ảnh sau
      currentIndex = (currentIndex + 1) % images.length;
    }

    changeImageWithEffect(images[currentIndex]);
  });
});

// Đếm ngược ngày cưới
const weddingDate = new Date("2025-05-16T10:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "<p>Đã đến ngày cưới!</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("weddingMusic");
  const musicBtn = document.getElementById("musicToggle");

  // Tự động phát nhạc nếu được phép
  if (music) {
    music.play().then(() => {
      // ✅ Sau khi play thành công, cập nhật nút
      if (musicBtn) musicBtn.textContent = "🔇";
    }).catch((err) => {
      console.warn("Không thể tự phát nhạc:", err);
      if (musicBtn) musicBtn.style.display = 'block'; // Cho phép người dùng tự bật
    });
  }

  // Fallback khi click lần đầu
  window.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().then(() => {
        if (musicBtn) musicBtn.textContent = "🔇";
      }).catch(() => {});
    }
  }, { once: true });

  // Nút bật/tắt nhạc
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        musicBtn.textContent = "🔇";
      } else {
        music.pause();
        musicBtn.textContent = "🎵";
      }
    });
  }
});

// Hiệu ứng hoa rơi
function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('falling-petal');
  petal.textContent = '🌸';

  petal.style.left = Math.random() * 100 + 'vw';
  const duration = Math.random() * 3 + 5;
  petal.style.animationDuration = duration + 's';
  petal.style.fontSize = (Math.random() * 10 + 20) + 'px';

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, duration * 1000);
}

setInterval(createPetal, 500);
