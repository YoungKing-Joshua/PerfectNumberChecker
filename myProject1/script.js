const images = [
    'url("./img/ship1.jpg")',
    'url("./img/ship2.jpg")',
    'url("./img/ship3.jpg")'
];

let currentIndex = 0;

function changeBackgroundImage() {
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundImage = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds

// Initial call to set the first background image
changeBackgroundImage();
