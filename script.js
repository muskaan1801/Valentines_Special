// DOM Elements
const questionCard = document.getElementById('questionCard');
const successCard = document.getElementById('successCard');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartsBg = document.getElementById('heartsBg');
const loveTextBg = document.getElementById('loveTextBg');
const mainGif = document.getElementById('mainGif');

// Sad/emotional cat GIFs that change when user hovers over "No"
const sadCatGifs = [
    'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif', // Sad cat
    'https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif', // Crying cat
    'https://media.giphy.com/media/6qFFgNgextP9u/giphy.gif', // Disappointed cat
    'https://media.giphy.com/media/kQbMO5X7UA1C8/giphy.gif', // Sad kitty
    'https://media.giphy.com/media/14ut8PhnIwzros/giphy.gif', // Lonely cat
    'https://media.giphy.com/media/ISOckXUybVfQ4/giphy.gif', // Emotional cat
    'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif', // Sad eyes cat
    'https://media.giphy.com/media/oBQZIgNobc7ewVWvCd/giphy.gif' // Heartbroken cat
];

let currentGifIndex = 0;

// "I Love You" in different languages
const loveInLanguages = [
    'I Love You',              // English
    'Je t\'aime',              // French
    'Te amo',                  // Spanish
    'Ich liebe dich',          // German
    'Ti amo',                  // Italian
    'Eu te amo',               // Portuguese
    'Я тебя люблю',            // Russian
    '我爱你',                   // Chinese
    '愛してる',                 // Japanese
    '사랑해',                   // Korean
    'אני אוהב אותך',           // Hebrew
    'Σ\'αγαπώ',                // Greek
    'Mahal kita',              // Filipino
    'Anh yêu em',              // Vietnamese
    'Ik hou van jou',          // Dutch
    'Jag älskar dig',          // Swedish
    'Miluji tě',               // Czech
];

function createLoveBackground() {
    loveTextBg.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.className = 'love-word';
        span.textContent = loveInLanguages[Math.floor(Math.random() * loveInLanguages.length)];
        
        // Random positioning
        span.style.left = `${Math.random() * 100}%`;
        span.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay and duration for varied floating effect
        span.style.animationDelay = `${Math.random() * 10}s`;
        span.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        loveTextBg.appendChild(span);
    }
}

function createFloatingHeart() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💘', '💝'];
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heartsBg.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => heart.remove(), 10000);
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function moveNoButton(event) {
    // Add moving class to make button absolute
    noBtn.classList.add('moving');
    
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate safe random position within viewport
    const maxX = Math.min(containerRect.width - 100, viewportWidth - 200);
    const maxY = 150;
    
    // Generate random position
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Change to next sad cat GIF
    currentGifIndex = (currentGifIndex + 1) % sadCatGifs.length;
    mainGif.src = sadCatGifs[currentGifIndex];
}

/**
 * Create confetti explosion effect
 */
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb3d9', '#ffd700', '#ff6b6b', '#4ecdc4'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            document.body.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

/**
 * Handle "Yes" button click - show success message
 */
function handleYesClick() {
    createConfetti();
    questionCard.style.display = 'none';
    successCard.style.display = 'block';
}

/**
 * Handle "No" button interaction - prevent clicking
 */
function handleNoInteraction(event) {
    event.preventDefault();
    moveNoButton();
}

// Event Listeners
yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', handleNoInteraction);

// Initialize the page
function initializePage() {
    // Create background love text
    createLoveBackground();

    // Start creating floating hearts at intervals
    setInterval(createFloatingHeart, 300);

    // Create initial batch of floating hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}