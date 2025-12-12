import { WORDS, NOUNS, VERBS, ENDINGS, SETTINGS } from './config.js';
import { getRandom, generateId, generateSentence } from './utils.js';
import { createGrid, checkOverlaps } from './grid-system.js';

// --- State ---
let activeBlock = null;

// --- Content Generation ---
function generateBigText() {
    const count = Math.random() > 0.5 ? 2 : 3;
    let res = "";
    for(let i=0; i<count; i++) res += getRandom(WORDS) + "<br>";
    return res;
}

function generateDates() {
    const d1 = Math.floor(Math.random() * 30) + 1;
    const d2 = Math.floor(Math.random() * 30) + 1;
    return `<u>System Run</u><br>${d1}.10.202X<br><br><u>Compile</u><br>${d1}.${d2}.202X<br>Runtime: ${Math.floor(Math.random()*100)}ms`;
}

function updateContent() {
    document.getElementById('label-id').innerHTML = `FILE<br>ERR_${generateId()}<br>V.2.0`;
    document.getElementById('intro-text').innerHTML = generateSentence(NOUNS, VERBS, ENDINGS) + " " + generateSentence(NOUNS, VERBS, ENDINGS);
    document.getElementById('date-text').innerHTML = generateDates();
    document.getElementById('desc-text').innerHTML = `ANALYSIS: <br> ${generateSentence(NOUNS, VERBS, ENDINGS)} The graphical unit processes input.`;
    document.getElementById('credit-text').innerHTML = `<u>ID: ${generateId()}</u><br>Render Module<br>Output_Log`;

    document.getElementById('big-1').innerHTML = generateBigText();
    document.getElementById('big-2').innerHTML = generateBigText();
    
    // Special layout for side text
    const w1 = getRandom(WORDS).substring(0,2);
    const w2 = getRandom(WORDS).substring(0,2);
    const w3 = getRandom(WORDS).substring(0,2);
    document.getElementById('big-3').innerHTML = `${w1}<br>${w2}<br>${w3}`;

    // Recalculate grid visibility after text changes
    checkOverlaps();
}

// --- Visual Effects (Particles) ---
function spawnParticles(x, y) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        
        const size = Math.random() * 7 + 3;
        Object.assign(p.style, { width: `${size}px`, height: `${size}px`, left: `${x}px`, top: `${y}px` });
        
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        
        p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 0.8 },
            { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, opacity: 0 }
        ], {
            duration: 500 + Math.random() * 300,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }).onfinish = () => p.remove();
    }
}

// --- Interaction Logic ---
function handleMouseMove(e) {
    const wrapper = document.getElementById('poster');
    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 1. Text Physics (Parallax & Focus)
    document.querySelectorAll('.big-text').forEach(block => {
        const speed = parseFloat(block.getAttribute('data-speed'));
        const x = (window.innerWidth - e.pageX * speed) / 60;
        const y = (window.innerHeight - e.pageY * speed) / 60;
        
        let scale = 1, blurVal = 0, opacity = 1;

        if (activeBlock) {
            if (block === activeBlock) {
                scale = 1.15; 
            } else {
                scale = 0.9; blurVal = 4; opacity = 0.3; 
            }
        }

        block.style.transform = `translate(${x}px, ${y}px)`;
        block.style.scale = scale;
        block.style.filter = `url('#ink-bleed') blur(${blurVal}px)`;
        block.style.opacity = opacity;
    });

    // 2. Dot Magnetism
    document.querySelectorAll('.grid-dot').forEach(dot => {
        if(dot.style.opacity === '0') return; // Skip hidden dots

        const dotRect = dot.getBoundingClientRect();
        // Calculate center of dot relative to wrapper
        const dotX = dotRect.left - rect.left + (dotRect.width/2);
        const dotY = dotRect.top - rect.top + (dotRect.height/2);

        const dist = Math.hypot(mouseX - dotX, mouseY - dotY);

        if (dist < SETTINGS.magnetRadius) {
            const scale = 1 + ((SETTINGS.magnetRadius - dist) / SETTINGS.magnetRadius) * 1.5;
            dot.firstChild ? null : (dot.innerHTML = ''); // simple check
             // CSS pseudo-elements can't be transformed directly via JS easily without CSS vars
             // But the original code styled the ::after. 
             // Correction: Original JS modified style on ::after? No, you can't.
             // Original Code Hack: dot.querySelector('::after') -> THIS IS INVALID JS.
             // Let's fix the logic for the "Human" version to be correct.
             // We will scale the DOT itself, or use a CSS Variable.
             dot.style.transform = `scale(${scale})`; 
        } else {
            dot.style.transform = `scale(1)`;
        }
    });
}

// --- Event Listeners ---
function init() {
    const wrapper = document.getElementById('poster');

    // Text Hover Effects
    document.querySelectorAll('.big-text').forEach(block => {
        block.addEventListener('mouseenter', () => { activeBlock = block; block.style.color = '#333'; });
        block.addEventListener('mouseleave', () => { activeBlock = null; block.style.color = 'var(--ink-color)'; });
    });

    // Global Events
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', () => {
        // Reset state
        document.querySelectorAll('.grid-dot').forEach(d => d.style.transform = 'scale(1)');
        document.querySelectorAll('.big-text').forEach(b => {
            b.style.transform = 'translate(0,0) scale(1)';
            b.style.filter = `url('#ink-bleed') blur(0px)`;
            b.style.opacity = 1;
        });
    });

    document.addEventListener('click', (e) => {
        spawnParticles(e.clientX, e.clientY);
        spawnParticles(window.innerWidth / 2, window.innerHeight / 2);
        updateContent();
    });

    window.addEventListener('resize', () => {
        createGrid();
        checkOverlaps();
    });

    // Start
    createGrid();
    updateContent();
}

init();
