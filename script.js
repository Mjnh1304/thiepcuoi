let currentIndex = 0;
const images = [
  "images/album1.jpg",
  "images/album2.jpg",
  "images/album3.jpg",
  "images/album4.jpg",
  "images/album5.jpg",
  "images/album6.JPG",
  "images/album7.JPG",
  "images/album8.JPG"
];

function openLightbox(img) {
  const lightbox = document.getElementById('main-photo');
  const lightboxImg = document.getElementById('mainDisplay');
  currentIndex = images.indexOf(img.src);
  changeImageWithEffect(img.src);
  lightbox.classList.add('show');
}

function closeLightbox() {
  document.getElementById('main-photo').classList.remove('show');
}

// ✅ Hiệu ứng mờ dần rồi hiện lên (mượt)
function changeImageWithEffect(src) {
  const lightboxImg = document.getElementById('mainDisplay');
  lightboxImg.style.opacity = 0;
  setTimeout(() => {
    lightboxImg.src = src;
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = 1;
    };
  }, 300);
}

// Nhấn để chuyển ảnh trái/phải
document.addEventListener("DOMContentLoaded", () => {
  const lightboxImg = document.getElementById('mainDisplay');
  lightboxImg.addEventListener('click', (event) => {
    const imgWidth = lightboxImg.clientWidth;
    const clickX = event.offsetX;
    if (clickX < imgWidth / 2) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
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

  // Đảm bảo các phần tử tồn tại
  if (!music || !musicBtn) {
    console.warn("Không tìm thấy #weddingMusic hoặc #musicToggle");
    return;
  }

  // Hàm cập nhật trạng thái nút
  const updateButtonState = () => {
    musicBtn.textContent = music.paused ? "🎵" : "🔇";
  };

  // Tự động phát nhạc nếu được phép
  music.play().then(() => {
    // Phát thành công, cập nhật nút
    updateButtonState();
  }).catch((err) => {
    console.warn("Không thể tự phát nhạc:", err);
    // Hiển thị nút để người dùng tự bật
    musicBtn.style.display = "block";
    updateButtonState(); // Đảm bảo nút hiển thị đúng trạng thái
  });

  // Nút bật/tắt nhạc
  musicBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định
    if (music.paused) {
      music.play().then(() => {
        updateButtonState();
      }).catch((err) => {
        console.warn("Không thể phát nhạc:", err);
      });
    } else {
      music.pause();
      updateButtonState();
    }
  });

  // Cập nhật trạng thái ban đầu
  updateButtonState();
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

document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector('.thumbnail-row');
  const thumbnails = document.querySelectorAll('.thumbnail-row img');
  const mainDisplay = document.getElementById('mainDisplay');
  const mainPhoto = document.getElementById('main-photo');
  let isDown = false;
  let startX;
  let scrollLeft;

  // PC - Chuột
  row.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
    row.style.cursor = 'grabbing';
  });

  row.addEventListener('mouseleave', () => {
    isDown = false;
    row.style.cursor = 'grab';
  });

  row.addEventListener('mouseup', () => {
    isDown = false;
    row.style.cursor = 'grab';
  });

  row.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - row.offsetLeft;
    const walk = (x - startX) * 1.5;
    row.scrollLeft = scrollLeft - walk;
  });

  // Mobile - Cảm ứng
  row.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
  });

  row.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - row.offsetLeft;
    const walk = (x - startX) * 1.5;
    row.scrollLeft = scrollLeft - walk;
  });

  // Hàm openLightbox để hiển thị ảnh lớn
  function openLightbox(thumbnail) {
    mainDisplay.src = thumbnail.src;
    mainDisplay.alt = thumbnail.alt;
    mainPhoto.style.display = 'block'; // Hiển thị ảnh lớn
  }

  // Hàm closeLightbox để ẩn ảnh lớn
  function closeLightbox() {
    mainPhoto.style.display = 'none'; // Ẩn ảnh lớn
  }

  // Căn giữa ảnh nhỏ khi nhấn
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
      e.preventDefault(); // Ngăn hành vi mặc định
      e.stopPropagation(); // Ngăn sự kiện lan tỏa

      // Tính toán vị trí để căn giữa ảnh nhỏ
      const rowRect = row.getBoundingClientRect();
      const thumbnailRect = thumbnail.getBoundingClientRect();
      const scrollOffset = thumbnail.offsetLeft + (thumbnailRect.width / 2) - (rowRect.width / 2);

      // Cuộn để căn giữa ảnh nhỏ
      row.scrollTo({
        left: scrollOffset,
        behavior: 'smooth'
      });

      // Hiển thị ảnh lớn
      openLightbox(thumbnail);
    });
  });

  // Đảm bảo cuộn về left: 0 khi tải trang
  row.scrollLeft = 0;

  // Gán hàm closeLightbox toàn cục
  window.closeLightbox = closeLightbox;
});