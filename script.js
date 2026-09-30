// =========================================
// MỞ THIỆP
// =========================================

function openInvitation() {

    // Hoa bung ra
    createOpeningFlowers();

    // Ẩn phong thư
    const opening = document.getElementById("opening");

    if (opening) {
        opening.style.display = "none";
    }

    // Hiện nội dung
    const invitation = document.getElementById("invitation");

    if (invitation) {
        invitation.style.display = "block";
    }

    // Về đầu trang
    window.scrollTo(0, 0);

    // Bật nhạc
    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    if (music) {

        music.play().then(() => {

            if (musicButton) {
                musicButton.classList.add("playing");
            }

        }).catch(() => {

            console.log("Trình duyệt không cho tự động phát nhạc.");

        });
    }

    // Kích hoạt hiệu ứng
    setupScrollReveal();

    // Bắt đầu tự cuộn sau 1 giây
    setTimeout(function () {
        autoScrollWedding();
    }, 1000);
}

// =========================================
// TỰ ĐỘNG CUỘN
// =========================================

let autoScrollTimer = null;
let autoScrollStopped = false;


// =========================================
// BẮT ĐẦU TỰ ĐỘNG CUỘN
// =========================================

function autoScrollWedding() {

    // Nếu khách đã vuốt thì không chạy lại
    if (autoScrollStopped) {
        return;
    }

    if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
    }

    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    autoScrollTimer = setInterval(function () {

        // Nếu khách đã vuốt thì dừng
        if (autoScrollStopped) {

            clearInterval(autoScrollTimer);
            autoScrollTimer = null;

            return;
        }

        const currentPosition = window.scrollY;

        const maxPosition =
            document.documentElement.scrollHeight -
            window.innerHeight;


        // Chưa đến cuối
        if (currentPosition < maxPosition) {

            window.scrollBy(0, 1);

        } else {

            // Đã đến cuối
            clearInterval(autoScrollTimer);

            autoScrollTimer = null;

            console.log("Đã chạy hết thiệp ❤️");
        }

    }, 20);
}


// =========================================
// DỪNG KHI KHÁCH THỰC SỰ VUỐT
// =========================================

function stopAutoScroll() {

    autoScrollStopped = true;

    if (autoScrollTimer) {

        clearInterval(autoScrollTimer);

        autoScrollTimer = null;
    }
}


// =========================================
// VUỐT BẰNG CHUỘT
// =========================================

window.addEventListener(
    "wheel",
    function () {
        stopAutoScroll();
    },
    { passive: true }
);


// =========================================
// VUỐT TRÊN ĐIỆN THOẠI
// =========================================

let touchStartY = 0;

window.addEventListener(
    "touchstart",
    function (event) {

        touchStartY = event.touches[0].clientY;

    },
    { passive: true }
);


window.addEventListener(
    "touchmove",
    function (event) {

        const currentY = event.touches[0].clientY;

        const difference =
            Math.abs(currentY - touchStartY);

        // Chỉ dừng khi thực sự vuốt
        if (difference > 10) {

            stopAutoScroll();

        }

    },
    { passive: true }
);



// =========================================
// HIỆU ỨNG BAY VÀO KHI CUỘN
// =========================================

function setupScrollReveal() {

    // Các nhóm nội dung
    const sections = document.querySelectorAll(
        ".section, .couple-photo-section, .family-section, .wedding-gift, .photo-gallery, .new-photo-section, .location, .closing"
    );

    sections.forEach(function (section) {

        // Tiêu đề
        const titles = section.querySelectorAll(
            "h1, h2, h3, .small-text, .date-title, .date-subtitle, .gift-title, .gallery-title, .new-photo-title"
        );

        titles.forEach(function (element) {

            element.classList.add("scroll-title");

        });


        // Đoạn văn
        const texts = section.querySelectorAll(
            "p:not(.small-text):not(.date-title):not(.gift-title)"
        );

        texts.forEach(function (element) {

            element.classList.add("scroll-text");

        });


        // Ảnh
        const images = section.querySelectorAll("img");

        images.forEach(function (image) {

            image.classList.add("scroll-image");

        });


        // QR
        const qr = section.querySelectorAll(
            ".qr-card, .qr-heart"
        );

        qr.forEach(function (element) {

            element.classList.add("scroll-qr");

        });
    });


    // Observer theo dõi vị trí trên màn hình
    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    // Theo dõi tất cả phần tử hiệu ứng
    const revealElements = document.querySelectorAll(
        ".scroll-title, .scroll-text, .scroll-image, .scroll-qr"
    );

    revealElements.forEach(function (element) {

        observer.observe(element);

    });
}


// =========================================
// HOA BUNG KHI MỞ THIỆP
// =========================================

function createOpeningFlowers() {

    const flowers = [
        "🌸",
        "🌷",
        "🌼",
        "🌺",
        "✿",
        "❀",
        "🌸",
        "🌷",
        "🌼",
        "✿",
        "❀",
        "🌺"
    ];

    flowers.forEach(function (flowerType, index) {

        const flower = document.createElement("span");

        flower.className = "opening-flower";

        flower.innerHTML = flowerType;

        flower.style.left = "50%";
        flower.style.top = "50%";

        const angle =
            (index / flowers.length) * Math.PI * 2;

        const distance =
            150 + Math.random() * 220;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        flower.style.setProperty(
            "--x",
            x + "px"
        );

        flower.style.setProperty(
            "--y",
            y + "px"
        );

        flower.style.setProperty(
            "--rotate",
            (Math.random() * 720 - 360) + "deg"
        );

        flower.style.animationDelay =
            (Math.random() * 0.15) + "s";

        document.body.appendChild(flower);

        setTimeout(function () {

            flower.remove();

        }, 1800);

    });
}


// =========================================
// BẬT / TẮT NHẠC
// =========================================

function toggleMusic() {

    const music = document.getElementById("weddingMusic");

    const button = document.getElementById("musicButton");

    if (!music || !button) return;

    if (music.paused) {

        music.play();

        button.classList.add("playing");

    } else {

        music.pause();

        button.classList.remove("playing");

    }
}
// =========================================
// GỬI LỜI CHÚC
// =========================================

function sendWish() {

    const nameInput = document.getElementById("wishName");
    const messageInput = document.getElementById("wishMessage");
    const wishList = document.getElementById("wishList");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    // Kiểm tra tên
    if (!name) {
        alert("Bạn hãy nhập tên nhé ❤️");
        nameInput.focus();
        return;
    }

    // Kiểm tra lời chúc
    if (!message) {
        alert("Bạn hãy viết lời chúc nhé ❤️");
        messageInput.focus();
        return;
    }

    // Tạo lời chúc mới
    const wish = document.createElement("div");

    wish.className = "wish-item";

    wish.innerHTML = `
        <div class="wish-heart">♡</div>

        <div>
            <h3>${escapeHTML(name)}</h3>

            <p>${escapeHTML(message)}</p>
        </div>
    `;

    // Đưa lời chúc mới lên đầu
    wishList.prepend(wish);

    // Xóa nội dung đã nhập
    nameInput.value = "";
    messageInput.value = "";

    // Thông báo
    alert("Đã gửi lời chúc đến cô dâu và chú rể ❤️");
}


// =========================================
// BẢO VỆ NỘI DUNG NHẬP
// =========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}