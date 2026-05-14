// ===== LIGHTNING CANVAS =====
const canvas = document.getElementById('lightning-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawLightning(x, y, length, angle, width, branches) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    let cx = x, cy = y;
    const segments = 8 + Math.floor(Math.random() * 6);
    const segLen = length / segments;

    for (let i = 0; i < segments; i++) {
        const jitter = (Math.random() - 0.5) * 40;
        cx += Math.cos(angle) * segLen + jitter;
        cy += Math.sin(angle) * segLen;
        ctx.lineTo(cx, cy);

        if (branches > 0 && Math.random() < 0.25) {
            drawLightning(cx, cy, length * 0.4, angle + (Math.random() - 0.5) * 1.2, width * 0.5, branches - 1);
        }
    }

    ctx.strokeStyle = `rgba(127, 255, 0, ${0.15 + Math.random() * 0.2})`;
    ctx.lineWidth = width;
    ctx.shadowColor = 'rgba(127, 255, 0, 0.5)';
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function animateLightning() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.03) {
        const x = Math.random() * canvas.width;
        const length = 150 + Math.random() * 250;
        drawLightning(x, 0, length, Math.PI / 2 + (Math.random() - 0.5) * 0.4, 2, 2);
    }

    if (Math.random() < 0.02) {
        const side = Math.random() < 0.5 ? 0 : canvas.width;
        const y = Math.random() * canvas.height * 0.7;
        const angle = side === 0 ? 0.3 : Math.PI - 0.3;
        drawLightning(side, y, 100 + Math.random() * 150, angle, 1.5, 1);
    }

    requestAnimationFrame(animateLightning);
}
animateLightning();

// ===== FLOATING PARTICLES =====
const particlesContainer = document.getElementById('particles');

for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.width = (2 + Math.random() * 4) + 'px';
    p.style.height = p.style.width;
    particlesContainer.appendChild(p);
}

// ===== MEMBER COUNT ANIMATION =====
function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    function update() {
        start += step;
        if (start >= target) {
            el.textContent = target.toLocaleString('pt-BR') + '+';
            return;
        }
        el.textContent = Math.floor(start).toLocaleString('pt-BR') + '+';
        requestAnimationFrame(update);
    }
    update();
}

const memberEl = document.getElementById('member-count');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(memberEl, 2847, 2000);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
observer.observe(memberEl);

// ===== CTA BUTTON ELECTRIC SPARKS ON HOVER =====
const ctaBtn = document.getElementById('cta-button');

ctaBtn.addEventListener('mouseenter', () => {
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: absolute;
            width: 3px; height: 3px;
            background: #ffc107;
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            box-shadow: 0 0 6px #ffc107;
        `;
        const rect = ctaBtn.getBoundingClientRect();
        spark.style.left = (rect.left + Math.random() * rect.width) + 'px';
        spark.style.top = (rect.top + Math.random() * rect.height) + 'px';
        document.body.appendChild(spark);

        const dx = (Math.random() - 0.5) * 80;
        const dy = (Math.random() - 0.5) * 80;

        spark.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' });

        setTimeout(() => spark.remove(), 600);
    }
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.benefit-card, .cta-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));
