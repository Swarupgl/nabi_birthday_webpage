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

// --- THE 15-SECOND PHOTO BLAST EFFECT WITH DRAG & DROP ---

const photoSources = [
    "Snapchat-1019011002.jpg.jpeg",
    "Snapchat-1108701876.jpg.jpeg",
    "Snapchat-1187899568.jpg.jpeg",
    "Snapchat-1503025018.jpg.jpeg",
    "Snapchat-1841916656.jpg.jpeg",
    "Snapchat-231559626.jpg.jpeg",
    "Snapchat-386739698.jpg.jpeg",
    "Snapchat-390855562.jpg.jpeg",
    "Snapchat-470176122.jpg.jpeg",
    "Snapchat-477938349.jpg.jpeg",
    "Snapchat-681173562.jpg.jpeg",
    "Snapchat-839058291.jpg.jpeg"
];

let blastTriggered = false;
const storySection = document.getElementById('storySection');

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !blastTriggered) {
        blastTriggered = true;
        // Trigger the blast 15 seconds after they start reading the story
        setTimeout(triggerPhotoBlast, 45000);
    }
}, { threshold: 0.3 });

observer.observe(storySection);

function triggerPhotoBlast() {
    const blastContainer = document.createElement('div');
    blastContainer.id = "blastContainer";
    document.body.appendChild(blastContainer);

    // Reveal overlay
    setTimeout(() => { blastContainer.style.opacity = '1'; }, 10);

    const closeBtn = document.createElement('button');
    closeBtn.innerText = "Close Memories ✖";
    closeBtn.id = "closeBlastBtn";
    closeBtn.onclick = () => {
        blastContainer.style.opacity = '0';
        setTimeout(() => blastContainer.remove(), 1000);
    };
    blastContainer.appendChild(closeBtn);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Global tracker for z-index so clicked images always come to the absolute front
    let highestZ = 100000;

    // Explode each photo outward
    photoSources.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = "blast-img";

        // Start precisely at center
        img.style.left = `50%`;
        img.style.top = `50%`;

        blastContainer.appendChild(img);

        const angle = (index / photoSources.length) * Math.PI * 2 + (Math.random() * 0.5);
        const maxRadius = Math.min(window.innerWidth, window.innerHeight) / 2;
        const radius = Math.random() * (maxRadius * 0.8) + (maxRadius * 0.2);

        const destX = Math.cos(angle) * radius;
        const destY = Math.sin(angle) * radius;
        const rotate = Math.random() * 80 - 40;

        // State trackers for dragging
        let currentX = destX;
        let currentY = destY;
        let isDragging = false;
        let startClientX, startClientY;

        // Trigger the initial explosion animation
        setTimeout(() => {
            img.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) rotate(${rotate}deg) scale(1)`;
            img.style.opacity = '1';

            confetti({
                particleCount: 15,
                spread: 30,
                origin: {
                    x: (centerX + destX) / window.innerWidth,
                    y: (centerY + destY) / window.innerHeight
                },
                colors: ['#ffffff', '#ff99ac']
            });
        }, 100 * index);

        // --- DRAG AND DROP LOGIC (Mouse & Touch) ---
        const bringToFront = () => {
            highestZ += 1;
            img.style.zIndex = highestZ;
        };

        const onDragStart = (e) => {
            // only allow left clicks or touches
            if (e.type === 'mousedown' && e.button !== 0) return;
            e.preventDefault();
            bringToFront();
            isDragging = true;

            startClientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            startClientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

            // Remove the 1s easing transition so dragging follows the cursor instantly
            img.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
            // Scale up slightly when picked up
            img.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) rotate(${rotate}deg) scale(1.05)`;
        };

        const onDragMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

            const deltaX = clientX - startClientX;
            const deltaY = clientY - startClientY;

            startClientX = clientX;
            startClientY = clientY;

            currentX += deltaX;
            currentY += deltaY;

            img.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) rotate(${rotate}deg) scale(1.05)`;
        };

        const onDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            // Restore normal scale when dropped
            img.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) rotate(${rotate}deg) scale(1)`;
        };

        // Attach events to window/document for smooth tracking when moving fast
        img.addEventListener('mousedown', onDragStart);
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);

        // Touch events for mobile phones
        img.addEventListener('touchstart', onDragStart, { passive: false });
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('touchend', onDragEnd);
        document.addEventListener('touchcancel', onDragEnd);
    });

    // Fade in close button after explosion finishes
    setTimeout(() => {
        closeBtn.style.opacity = '1';
        closeBtn.style.transform = 'translateX(-50%) translateY(0)';
    }, 1500);
}


// --- INTERACTIVE SURPRISES ---

// 1. Magic 14 Reasons Logic
const reasons = [
    "1. You always know how to make me laugh, even on my worst days.",
    "2. We can talk for hours without ever running out of things to say.",
    "3. You have the most beautiful, kind, and generous heart.",
    "4. Our crazy inside jokes that nobody else will ever understand.",
    "5. You are always my biggest cheerleader in everything I do.",
    "6. We've survived all our awkward phases together and are still here!",
    "7. You give the absolute best advice when I'm lost or confused.",
    "8. You are unapologetically yourself, and it inspires me every day.",
    "9. We don't even need words to communicate sometimes; one look is enough.",
    "10. You always remember the little details about me.",
    "11. Every adventure is 100x better when you're by my side.",
    "12. You forgive my mistakes and love me unconditionally.",
    "13. Your vibrant energy lights up any room you walk into.",
    "14. Because out of billions of people, I got lucky enough to find YOU as my best friend."
];

let reasonIndex = 0;
const reasonsBox = document.getElementById('reasonsBox');
const reasonDisplay = document.getElementById('reasonDisplay');

reasonsBox.addEventListener('click', (e) => {
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
    }, 3000);
}

for (let i = 0; i < 6; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.fontSize = "2rem";
    heart.style.cursor = "pointer";
    heart.style.zIndex = "9999";

    heart.style.top = Math.random() * 80 + 10 + "%";
    heart.style.left = Math.random() * 80 + 10 + "%";

    heart.style.animation = `floatHeartAnim ${Math.random() * 3 + 2}s infinite alternate ease-in-out`;
    heart.title = "Click me!";

    heart.addEventListener('click', (e) => {
        confetti({
            particleCount: 25,
            spread: 40,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ['#ff5e7e', '#ffffff']
        });

        heart.style.display = 'none';
        const randomMsg = secretMessages[Math.floor(Math.random() * secretMessages.length)];
        showToast(randomMsg);
    });

    document.body.appendChild(heart);
}
