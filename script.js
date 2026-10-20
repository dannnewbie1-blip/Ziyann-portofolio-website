function showModal(message) {
    document.getElementById('modal-message').innerText = message;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('custom-modal').style.display = 'none';
}

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');
const profileImage = document.querySelector('#profile-image');
const profileUpload = document.querySelector('#profile-upload');
const savedProfileImage = localStorage.getItem('profile-image');

// Muat foto profil yang tersimpan di localStorage
if (savedProfileImage) {
    profileImage.src = savedProfileImage;
}

// Fitur Unggah Foto Profil
profileUpload.addEventListener('change', () => {
    const file = profileUpload.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showModal('Silakan pilih file gambar yang valid.');
        profileUpload.value = '';
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
        try {
            localStorage.setItem('profile-image', reader.result);
            profileImage.src = reader.result;
            showModal('Foto profil berhasil diperbarui!');
        } catch (error) {
            showModal('Foto tidak dapat disimpan. Coba pilih gambar dengan ukuran lebih kecil.');
        }
    });
    reader.readAsDataURL(file);
});

// Toggle Hamburger Menu Mobile
menuIcon.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x', isOpen);
    menuIcon.classList.toggle('bx-menu', !isOpen);
    menuIcon.setAttribute('aria-expanded', String(isOpen));
    menuIcon.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

// Fungsi Navigasi Aktif saat Scroll
function updatePageState() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
            });
        }
    });

    document.querySelector('.header').classList.toggle('sticky', scrollPosition > 100);
}

// Tutup Navbar saat Link Diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu');
        menuIcon.setAttribute('aria-expanded', 'false');
        menuIcon.setAttribute('aria-label', 'Buka menu');
    });
});

window.addEventListener('scroll', updatePageState);
updatePageState();