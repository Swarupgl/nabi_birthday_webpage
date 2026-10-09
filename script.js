// Initialize Animate On Scroll (AOS)
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        once: true,
        offset: 100,
        duration: 1200
    });
});

// Realistic Confetti magic button functionality
const celebrateBtn = document.getElementById('celebrateBtn');

celebrateBtn.addEventListener('click', () => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;

    const originalText = celebrateBtn.innerText;
    celebrateBtn.innerText = "Wow! 🎉";

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            setTimeout(() => {
                celebrateBtn.innerText = originalText;
            }, 1000);
            return;
        }

        const particleCount = 60 * (timeLeft / duration);

        confetti({
            particleCount,
            startVelocity: 45,
            spread: 80,
            ticks: 200,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff5e7e', '#ff99ac', '#ffd166', '#d11149', '#ffffff'],
            gravity: 1.2,
            scalar: randomInRange(0.8, 1.4),
            shapes: ['circle', 'square']
        });

        confetti({
            particleCount,
            startVelocity: 45,
            spread: 80,
            ticks: 200,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff5e7e', '#ff99ac', '#ffd166', '#d11149', '#ffffff'],
            gravity: 1.2,
            scalar: randomInRange(0.8, 1.4),
            shapes: ['circle', 'square']
        });

    }, 250);
});

// --- NEW INTERACTIVE SURPRISES ---

// 1. Magic 14 Reasons Logic
const reasons = [
    "1. You always know how to make me laugh, even on my worst days.",
    "2. We can talk for hours without ever running out of things to say.",
    "3. You have the most beautiful, kind, and generous heart.",
    "4. From 2nd class to now, you've been a special part of my life for 14 years.",
    "5. You are always my biggest cheerleader in everything I do.",
    "6. We've had gaps in our friendship, but somehow, we always found our way back.",
    "7. Those days when we acted like lovers and eventually made it real will always be special to me. ❤️",
    "8. You are unapologetically yourself, and it inspires me every day.",
    "9. You care for me in ways that words can never fully explain.",
    "10. You always remember the little details about me.",
    "11. Every memory with you is precious, and I can't wait to create many more.",
    "12. Even after our fights, you still hold a special place in my heart.",
    "13. Your beautiful smile and caring nature make my world a little brighter.",
    "14. Because out of billions of people, I got lucky enough to find YOU, and I wouldn't trade our 14 years of memories for anything. ❤️"
];

let reasonIndex = 0;
const reasonsBox = document.getElementById('reasonsBox');
const reasonDisplay = document.getElementById('reasonDisplay');

reasonsBox.addEventListener('click', (e) => {
    // Pop confetti originating directly from the box when clicked
    const rect = reasonsBox.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
        particleCount: 30,
        spread: 50,
        origin: { x, y },
        colors: ['#ffd166', '#ff5e7e', '#ffffff']
    });

    reasonDisplay.innerText = reasons[reasonIndex];
    // Re-trigger animation
    reasonDisplay.style.animation = "none";
    setTimeout(() => {
        reasonDisplay.style.animation = "zoomInEffect 0.3s ease";
    }, 10);

    reasonIndex = (reasonIndex + 1) % reasons.length;
});

// 2. Secret Animated Envelope Logic
const envelopeContainer = document.getElementById('envelopeContainer');
const envelope = document.getElementById('envelope');

envelopeContainer.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        // Shoot heart-colored confetti when opened
        const rect = envelope.getBoundingClientRect();
        confetti({
            particleCount: 40,
            spread: 70,
            origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top) / window.innerHeight },
            shapes: ['circle'],
            colors: ['#ff5e7e', '#ff99ac']
        });
    } else {
        envelope.classList.remove('open');
    }
});

// 3. Secret Floating Hearts Hunt
const toast = document.getElementById('toast');
const secretMessages = [
    "You found a secret hug! 🤗",
    "Sending you so much love! ❤️",
    "You're totally amazing! ✨",
    "Besties forever! 👯‍♀️",
    "14 years down, forever to go! 🥂"
];

function showToast(msg) {
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // hide after 3s
}

// Spawn 6 hidden floating hearts across the whole screen randomly
for (let i = 0; i < 6; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.fontSize = "2rem";
    heart.style.cursor = "pointer";
    heart.style.zIndex = "9999";

    // Randomize position avoiding the very edges
    heart.style.top = Math.random() * 80 + 10 + "%";
    heart.style.left = Math.random() * 80 + 10 + "%";

    // Add unique floating animation speed to each
    heart.style.animation = `floatHeartAnim ${Math.random() * 3 + 2}s infinite alternate ease-in-out`;
    heart.title = "Click me!";

    heart.addEventListener('click', (e) => {
        // Confetti explosion where the mouse clicked
        confetti({
            particleCount: 25,
            spread: 40,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ['#ff5e7e', '#ffffff']
        });

        heart.style.display = 'none'; // hide heart once found

        // Pick a random secret message
        const randomMsg = secretMessages[Math.floor(Math.random() * secretMessages.length)];
        showToast(randomMsg);
    });

    document.body.appendChild(heart);
}
