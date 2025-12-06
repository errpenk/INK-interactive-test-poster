// --- DATA SOURCES ---
const bigWords = ["VOID", "FLUX", "CORE", "DATA", "ECHO", "SCAN", "GRID", "NULL", "ZERO", "FORM", "ZONE", "HACK", "TYPE", "INK", "BIOS", "MODE", "VIEW", "PORT"];
const nouns = ["The algorithm", "A structure", "Visual noise", "The archive", "System failure", "Digital decay", "Raw output", "Memory leak"];
const verbs = ["observes", "corrupts", "displays", "encodes", "renders", "filters", "obscures", "indexes"];
const ends = ["the invisible.", "manifesting form.", "without context.", "in the matrix.", "beyond logic.", "static data.", "a new layer."];

// --- UTILS ---
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generateId = () => Math.floor(Math.random() * 9999).toString().padStart(4, '0');

function generateBigText() {
    const count = Math.random() > 0.5 ? 2 : 3;
    let res = "";
    for(let i=0; i<count; i++) {
        res += getRandom(bigWords) + "<br>";
    }
    return res;
}

function generateSentence() {
    return `${getRandom(nouns)} ${getRandom(verbs)} ${getRandom(ends)}`;
}

function generateDates() {
    const d1 = Math.floor(Math.random() * 30) + 1;
    const d2 = Math.floor(Math.random() * 30) + 1;
    return `<u>System Run</u><br>${d1}.10.202X<br><br><u>Compile</u><br>${d1}.${d2}.202X<br>Runtime: ${Math.floor(Math.random()*100)}ms`;
}

// --- COLLISION DETECTION ---
function checkOverlaps() {
    const dots = document.querySelectorAll('.grid-dot');
    const texts = document.querySelectorAll('.small-text');

    // We need to wait a microtick for the DOM to settle text sizes if it just changed
    requestAnimationFrame(() => {
        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            let overlap = false;

            texts.forEach(text => {
                const textRect = text.getBoundingClientRect();
                // Check intersection
                if (
                    dotRect.left < textRect.right &&
                    dotRect.right > textRect.left &&
                    dotRect.top < textRect.bottom &&
                    dotRect.bottom > textRect.top
                ) {
                    overlap = true;
                }
            });

            if (overlap) {
                dot.style.opacity = '0';
            } else {
                dot.style.opacity = '1';
            }
        });
    });
}

// --- MAIN GENERATION LOGIC ---
function regenerateContent() {
    document.getElementById('label-id').innerHTML = `FILE<br>ERR_${generateId()}<br>V.2.0`;
    document.getElementById('intro-text').innerHTML = generateSentence() + " " + generateSentence();
    document.getElementById('date-text').innerHTML = generateDates();
    document.getElementById('desc-text').innerHTML = `ANALYSIS: <br> ${generateSentence()} ${generateSentence()} The graphical unit processes the visual input through a stochastic filter. ${generateSentence()}`;
    document.getElementById('credit-text').innerHTML = `<u>ID: ${generateId()}</u><br>Render Module<br>Output_Log`;

    document.getElementById('big-1').innerHTML = generateBigText();
    document.getElementById('big-2').innerHTML = generateBigText();
    const w1 = getRandom(bigWords).substring(0,2);
    const w2 = getRandom(bigWords).substring(0,2);
    const w3 = getRandom(bigWords).substring(0,2);
    document.getElementById('big-3').innerHTML = `${w1}<br>${w2}<br>${w3}`;

    // Check overlaps after content change
    checkOverlaps();
}

// --- GRID SYSTEM ---
const wrapper = document.getElementById('poster');
const gridSpacing = 50; 

function createGrid() {
    const existingDots = document.querySelectorAll('.grid-dot');
    existingDots.forEach(dot => dot.remove());

    const width = wrapper.offsetWidth;
    const height = wrapper.offsetHeight;
    const cols = Math.floor(width / gridSpacing);
    const rows = Math.floor(height / gridSpacing);
    
    for (let i = 0; i < (cols * rows) + 60; i++) {
        const dot = document.createElement('div');
        dot.classList.add('grid-dot');
        wrapper.appendChild(dot);
    }
    
    // Check overlaps after grid creation
    checkOverlaps();
}

// --- INTERACTIVITY ---

let activeBlock = null;

document.querySelectorAll('.big-text').forEach(block => {
    block.addEventListener('mouseenter', () => {
        activeBlock = block;
        block.style.color = '#333';
    });
    block.addEventListener('mouseleave', () => {
        activeBlock = null;
        block.style.color = 'var(--ink-color)';
    });
});

wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 1. Text Physics
    const textBlocks = document.querySelectorAll('.big-text');
    textBlocks.forEach(block => {
        const speed = parseFloat(block.getAttribute('data-speed'));
        
        const x = (window.innerWidth - e.pageX * speed) / 60;
        const y = (window.innerHeight - e.pageY * speed) / 60;
        
        let scale = 1;
        let blurVal = 0;
        let opacity = 1;

        if (activeBlock) {
            if (block === activeBlock) {
                // Active
                scale = 1.15; 
                blurVal = 0;
                opacity = 1;
            } else {
                // Inactive
                scale = 0.9; 
                blurVal = 4;
                opacity = 0.3; 
            }
        }

        block.style.transform = `translate(${x}px, ${y}px)`;
        block.style.scale = scale;
        block.style.filter = `url('#ink-bleed') blur(${blurVal}px)`;
        block.style.opacity = opacity;
    });

    // 2. Dot Magnetism
    const dots = document.querySelectorAll('.grid-dot');
    dots.forEach(dot => {
        // Skip calculation if dot is hidden due to overlap
        if(dot.style.opacity === '0') return;

        const dotRect = dot.getBoundingClientRect();
        const dotX = dotRect.left - rect.left + (gridSpacing/2);
        const dotY = dotRect.top - rect.top + (gridSpacing/2);

        const dist = Math.hypot(mouseX - dotX, mouseY - dotY);
        const maxDist = 120;

        if (dist < maxDist) {
            const scale = 1 + ((maxDist - dist) / maxDist) * 1.5;
            dot.querySelector('::after').style.transform = `scale(${scale})`;
        } else {
            dot.querySelector('::after').style.transform = `scale(1)`;
        }
    });
});

wrapper.addEventListener('mouseleave', () => {
    document.querySelectorAll('.grid-dot::after').forEach(d => d.style.transform = 'scale(1)');
    
    document.querySelectorAll('.big-text').forEach(b => {
        b.style.transform = 'translate(0,0)';
        b.style.scale = 1;
        b.style.filter = `url('#ink-bleed') blur(0px)`;
        b.style.opacity = 1;
    });
});

// --- CLICK PARTICLE EFFECT ---
function spawnParticles(x, y) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        
        const size = Math.random() * 7 + 3;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        const anim = p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 0.8 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 500 + Math.random() * 300,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        });

        anim.onfinish = () => p.remove();
    }
}

document.addEventListener('click', (e) => {
    spawnParticles(e.clientX, e.clientY);
    spawnParticles(window.innerWidth / 2, window.innerHeight / 2);
    regenerateContent();
});

// --- INIT ---
window.addEventListener('resize', () => {
    createGrid();
    checkOverlaps();
});
createGrid();
regenerateContent();