const track = document.querySelector('.slider-track');
const btnNext = document.querySelector('.button_price-list-popular_2');
const btnPrev = document.querySelector('.button_price-list-popular_1');

let currentTranslate = 0;
let targetTranslate = 0;
let baseSpeed = 0.5; 
let isPaused = false;

// Для свайпа мышью
let isDragging = false;
let startX = 0;
let dragTranslate = 0;

track.innerHTML += track.innerHTML;

function animate() {
    if (!isPaused && !isDragging) {
        targetTranslate -= baseSpeed;
    }

    // Плавный "догон" цели
    currentTranslate += (targetTranslate - currentTranslate) * 0.08;

    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(currentTranslate) >= halfWidth) {
        currentTranslate += halfWidth;
        targetTranslate += halfWidth;
    }

    track.style.transform = `translateX(${currentTranslate}px)`;
    requestAnimationFrame(animate);
}

animate();

// --- УПРАВЛЕНИЕ КНОПКАМИ И КЛАВИАТУРОЙ ---
function move(direction) {
    const slide = track.firstElementChild;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    const slideWidth = slide.offsetWidth + gap;

    if (direction === 'next') {
        targetTranslate = (Math.floor(targetTranslate / slideWidth) - 1) * slideWidth;
    } else {
        targetTranslate = (Math.ceil(targetTranslate / slideWidth) + 1) * slideWidth;
    }
}

btnNext.addEventListener('click', () => move('next'));
btnPrev.addEventListener('click', () => move('prev'));

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') move('next');
    if (e.key === 'ArrowLeft') move('prev');
});

// --- УПРАВЛЕНИЕ МЫШЬЮ (DRAG) ---
track.addEventListener('mousedown', (e) => {
    isDragging = true;
    isPaused = true;
    startX = e.pageX;
    dragTranslate = targetTranslate;
    track.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (x - startX) * 1.5; // Коэффициент 1.5 для чувствительности
    targetTranslate = dragTranslate + walk;
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    isPaused = false;
    track.style.cursor = 'grab';
    
    // При отпускании "примагничиваем" к ближайшему слайду
    const slide = track.firstElementChild;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    const slideWidth = slide.offsetWidth + gap;
    targetTranslate = Math.round(targetTranslate / slideWidth) * slideWidth;
});

// Наведение
track.addEventListener('mouseenter', () => { if(!isDragging) isPaused = true; });
track.addEventListener('mouseleave', () => { if(!isDragging) isPaused = false; });

track.addEventListener('touchstart', (e) => {
    isDragging = true;
    isPaused = true;
    startX = e.touches[0].pageX; // Берем координату первого касания
    dragTranslate = targetTranslate;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5; 
    targetTranslate = dragTranslate + walk;
}, { passive: true });

window.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    isPaused = false;
    
    // "Примагничивание" к слайду
    const slide = track.firstElementChild;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    const slideWidth = slide.offsetWidth + gap;
    targetTranslate = Math.round(targetTranslate / slideWidth) * slideWidth;
});

const mainButtons = document.querySelectorAll('.wrapper_button .button');

if (mainButtons.length > 0) {
    mainButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.innerText.trim(); // Берем название кнопки
            window.location.href = `index_2.html?cat=${encodeURIComponent(category)}`;
        });
    });
}