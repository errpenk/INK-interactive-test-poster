# INK-Random Project

> An interactive generative art piece designed to explore the possibility of including multiple topics on a single page rendering.

**INK-Random** blends the chaotic aesthetics of "digital decay" with the tactile feel of physical printing. It serves as a procedural poster archive where every click generates a unique layout, sentence structure, and visual composition.

---

##  Key Interactions

This project relies on intuitive user input to drive the generative engine:

*   **Procedural Generation**
    *   **Action:** Click anywhere on the screen.
    *   **Effect:** The entire content regenerates. Arrays of keywords, dates, and sentences are randomly combined to create unique semantic contexts and layouts every time.

*   **Parallax Depth**
    *   **Action:** Move your mouse across the canvas.
    *   **Effect:** Large text blocks move slightly in opposite directions at varying speeds (`data-speed`), creating a "Matrix-3D" sensation and separating the foreground from the background.

*   **Grid Magnetism**
    *   **Action:** Move cursor near the background grid.
    *   **Effect:** The grid dots react to the cursor's presence. Dots swell in size as the mouse approaches, creating a wave-like ripple effect that follows your movement.

*   **Focus & Depth of Field**
    *   **Action:** Hover over a specific large word.
    *   **Effect:** The system mimics a camera shifting focus. The hovered word scales up and remains sharp, while other text blocks blur and fade out, directing the viewer's attention.

---

##  Technical Implementation

The project is built with vanilla HTML/CSS/JS, utilizing modern browser capabilities to simulate analog effects without external libraries.

### 1. The "Ink-Bleed" Effect (SVG Filters)
To simulate the imperfection of ink on paper, we inject an invisible SVG block containing a `<feTurbulence>` and `<feDisplacementMap>` filter. This filter is applied to the DOM text elements via CSS, effectively "roughening" the edges of the crisp digital fonts to look like wet ink.

### 2. Composition & Blending
*   **Mix-Blend-Mode:** Heavy use of `multiply` (for dark ink) and `difference` (for white text) ensures elements interact visually with the background, rather than just sitting on top of it.
*   **Atmosphere:** CSS filters like `blur()`, `contrast()`, and `brightness()` are dynamically manipulated via JavaScript to create depth states.

### 3. Generative Logic
*   **Randomization:** Customized utility functions (`utils.js`) pull from dictionaries to assemble sentences.
*   **Collision Detection:** After every generation, the system calculates the bounding boxes of text elements and hides any background grid dots that fall underneath, ensuring legible typography.

---

## License
This project is open-source and available under the MIT License.

