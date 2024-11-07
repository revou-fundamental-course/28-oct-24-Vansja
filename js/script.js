// Kunci scroll awal
document.body.classList.add('lock-scroll');

// Fungsi slideshow otomatis
let currentIndex = 0;
const slides = document.querySelectorAll('.background-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active-slide', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Panggil fungsi nextSlide setiap 3 detik
setInterval(nextSlide, 3000);

// Daftar gambar latar yang akan bergantian muncul
const bannerImages = [
    'https://cdn1-production-images-kly.akamaized.net/tMspf6fBZWXStvm1LoleV2UdS10=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1710767/original/032085600_1505448033-Ukur-Obesitas-Cukup-Pakai-Indeks-Massa-Tubuh.jpg',
    'https://res.cloudinary.com/dk0z4ums3/image/upload/v1625855445/attached_image/5-buah-untuk-diet-khusus-menurunkan-berat-badan.jpg',
    'https://telemed.ihc.id/uploads/img_post/img_0510202216649555269K507.jpg'
];

// Gambar banner
let currentImageIndex = 0;
const [slide1, slide2] = [document.querySelector('.slide1'), document.querySelector('.slide2')];

function changeBannerImage() {
    const nextImageIndex = (currentImageIndex + 1) % bannerImages.length;

    if (slide1.classList.contains('active-slide')) {
        slide2.style.backgroundImage = `url('${bannerImages[nextImageIndex]}')`;
        slide2.style.backgroundSize = 'cover';  
        slide2.style.backgroundPosition = 'center center';  
        slide2.classList.add('active-slide');
        slide1.classList.remove('active-slide');
    } else {
        slide1.style.backgroundImage = `url('${bannerImages[nextImageIndex]}')`;
        slide1.style.backgroundSize = 'cover';  
        slide1.style.backgroundPosition = 'center center';  
        slide1.classList.add('active-slide');
        slide2.classList.remove('active-slide');
    }

    currentImageIndex = nextImageIndex;
}

// Ganti gambar setiap 5 detik
setInterval(changeBannerImage, 5000);

// Fungsi untuk scroll ke konten di bawah dan membuka scroll
function scrollToContent() {
    document.body.classList.remove('lock-scroll'); // Buka scroll
    document.getElementById("content").scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.scroll-button').style.display = 'none'; // Hilangkan tombol setelah scroll
}

// Menambahkan event listener untuk tombol scroll
document.querySelector('.scroll-button').addEventListener('click', scrollToContent);


// Fungsi untuk menghitung BMI
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);

    // Cek jika weight atau height negatif atau tidak valid
    if (weight <= 0 || height <= 0) {
        alert('Berat badan dan tinggi badan harus lebih dari 0.');
        return; // Menghentikan eksekusi jika input tidak valid
    }

    if (weight && height && age) {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Menampilkan hasil
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>BMI Anda adalah: ${bmi.toFixed(1)}</p>
            <p>Kategori: ${getBMICategory(bmi)}</p>
            <p>Umur Anda adalah: ${age} tahun</p>
        `;
        updateScorebar(bmi);  // Update scorebar dan jarum
        
        // Kunci input dan tampilkan tombol reset
        lockFormInputs();
    } else {
        alert('Harap masukkan semua data dengan benar.');
    }
}

// Fungsi untuk mengunci input dan menampilkan tombol reset
function lockFormInputs() {
    document.getElementById('age').disabled = true;
    document.getElementById('weight').disabled = true;
    document.getElementById('height').disabled = true;
    document.querySelectorAll('input[name="jenis-kelamin"]').forEach(input => input.disabled = true);
    document.querySelector('button[type="button"]').style.display = 'none';  
    document.getElementById('reset-btn').style.display = 'inline';  
}

// Fungsi untuk mereset form
function resetForm() {
    document.getElementById('age').disabled = false;
    document.getElementById('weight').disabled = false;
    document.getElementById('height').disabled = false;
    document.querySelectorAll('input[name="jenis-kelamin"]').forEach(input => input.disabled = false);
    document.querySelector('button[type="button"]').style.display = 'inline'; 
    document.getElementById('reset-btn').style.display = 'none';  
    document.getElementById('result').innerHTML = `<p>BMI Anda adalah: 0</p><p>Kategori: </p><p>Umur Anda adalah: </p>`;
    document.getElementById('bmi-category').innerText = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('age').value = '';
}



// Fungsi untuk mendapatkan kategori BMI
function getBMICategory(bmi) {
    if (bmi < 18.5) return "Kurus";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal";
    if (bmi >= 25 && bmi < 29.9) return "Gemuk";
    return "Obesitas";
}

// Fungsi untuk mengupdate posisi jarum dan warna scorebar
function updateScorebar(bmi) {
    const needle = document.getElementById('needle');
    const category = getBMICategory(bmi);

    let leftPosition = 0;
    let rotationAngle = 0;

    // Mengatur posisi horizontal dan rotasi berdasarkan kategori BMI
    if (bmi < 18.5) {
        leftPosition = 10;
        rotationAngle = 0;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        leftPosition = 40; 
        rotationAngle = 0; 
    } else if (bmi >= 24.9 && bmi < 29.9) {
        leftPosition = 60;
        rotationAngle = 0; 
    } else if (bmi >= 30) {
        leftPosition = 90;
        rotationAngle = 0; 
    }
    
    // Mengatur posisi jarum 
    needle.style.left = `${leftPosition}%`; 
    needle.style.transform = `rotate(${rotationAngle}deg)`;
    needle.style.transition = 'transform 0.3s ease'; 
    needle.style.backgroundColor = 'red'; 
    
    // Menampilkan kategori BMI
    document.getElementById('bmi-category').innerText = `Kategori: ${category}`;
}

