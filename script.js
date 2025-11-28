const images = [
    'https://i.pinimg.com/736x/96/96/ab/9696abe3cf1bfa6e14e099fbb68b7658.jpg',
    'https://i.pinimg.com/1200x/de/ee/29/deee2940ad31d5c274132d9052b992e5.jpg',
    'https://i.pinimg.com/1200x/19/18/90/191890fcea0dc20dc1182205ba02744c.jpg',
    'https://i.pinimg.com/1200x/8e/f4/6e/8ef46ed90b4a35284ccbcc8a129eb413.jpg',
    'https://i.pinimg.com/1200x/b5/1e/ac/b51eac18069154668d9b66aeb34afe54.jpg',
    'https://i.pinimg.com/736x/42/10/d1/4210d104e48f848aadc3fa2797b55b0c.jpg',
    'https://i.pinimg.com/736x/bb/03/97/bb0397836852050fd6eca8e60a210f4d.jpg',
    'https://i.pinimg.com/736x/6e/ca/09/6eca094b983626f471e735e5182274f4.jpg'
];
const galleryTrack = document.getElementById('galleryTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageEl = document.getElementById('currentPage');
const totalPagesEl = document.getElementById('totalPages');
let currentIndex = 0;
let itemsPerPage = 3;
function updateItemsPerPage() {
    if (window.innerWidth <= 768) {
        itemsPerPage = 1;
    } else if (window.innerWidth <= 1024) {
        itemsPerPage = 2;
    } else {
        itemsPerPage = 3;
    }
    updateGallery();
}
function renderGallery() {
    galleryTrack.innerHTML = '';
    images.forEach((imgSrc, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Изображение ${index + 1}`;
        item.appendChild(img);
        galleryTrack.appendChild(item);
    });
}
function updateGallery() {
    const totalItems = images.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    totalPagesEl.textContent = totalPages;
    currentPageEl.textContent = currentIndex + 1;
    if (currentIndex >= totalPages) {
        currentIndex = totalPages - 1;
    }
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    const trackWidth = galleryTrack.clientWidth;
    const itemWidth = trackWidth / itemsPerPage;
    const offset = -currentIndex * itemWidth;
    galleryTrack.style.transform = `translateX(${offset}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalPages - 1;
}
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(images.length / itemsPerPage);
    if (currentIndex < totalPages - 1) {
        currentIndex++;
        updateGallery();
    }
});
window.addEventListener('resize', updateItemsPerPage);
let startX = 0;
let isDragging = false;

galleryTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

galleryTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextBtn.click();
        } else {
            prevBtn.click();
        }
        isDragging = false;
    }
});

galleryTrack.addEventListener('touchend', () => {
    isDragging = false;
});
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    updateItemsPerPage();

});
