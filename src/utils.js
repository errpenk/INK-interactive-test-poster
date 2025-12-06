// --- DATA SOURCES ---
export const bigWords = ["VOID", "FLUX", "CORE", "DATA", "ECHO", "SCAN", "GRID", "NULL", "ZERO", "FORM", "ZONE", "HACK", "TYPE", "INK", "BIOS", "MODE", "VIEW", "PORT"];
export const nouns = ["The algorithm", "A structure", "Visual noise", "The archive", "System failure", "Digital decay", "Raw output", "Memory leak"];
export const verbs = ["observes", "corrupts", "displays", "encodes", "renders", "filters", "obscures", "indexes"];
export const ends = ["the invisible.", "manifesting form.", "without context.", "in the matrix.", "beyond logic.", "static data.", "a new layer."];

// --- UTILS ---
export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const generateId = () => Math.floor(Math.random() * 9999).toString().padStart(4, '0');

export function generateBigText() {
    const count = Math.random() > 0.5 ? 2 : 3;
    let res = "";
    for(let i=0; i<count; i++) {
        res += getRandom(bigWords) + "<br>";
    }
    return res;
}

export function generateSentence() {
    return `${getRandom(nouns)} ${getRandom(verbs)} ${getRandom(ends)}`;
}

export function generateDates() {
    const d1 = Math.floor(Math.random() * 30) + 1;
    const d2 = Math.floor(Math.random() * 30) + 1;
    return `<u>System Run</u><br>${d1}.10.202X<br><br><u>Compile</u><br>${d1}.${d2}.202X<br>Runtime: ${Math.floor(Math.random()*100)}ms`;
}