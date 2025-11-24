# INK-Random Project
This is an interactive art which designed to explore the possibility of including multiple topics on a single page rendering.

A. Key Interaction
1. Procedural Generation: When user clicks anywhere on the screen, the content changes.

2. Mouse Physics-Parallax: As user move the mouse, the large text blocks move slightly in opposite directions (data-speed), creating a matrix-3D depth effect.
   
3. Mouse Physics-Magnetism: The background dots react to the cursor. Dots near the mouse swell in size, creating a wave-like ripple effect as you move across the grid.
   
4. Focus and Depth of Field: When hovering over a specific large word, that word scales up and remains sharp, while the other text blocks blur and fade out. This mimics a camera shifting focus.



B. Key Technology
1. Mix-Blend-Mode: The text use multiply (for dark) and difference (for white) to simulate the ink-printed.

2. Filters: use blur(), contrast(), and brightness() to create the atmosphere.

3. The Ink-Bleed Effect: The code includes an invisible SVG block. This is a displacement filter applied to the text. It roughens the edges of the crisp fonts.

4. DOM Manipulation: Generating grid dots based on screen width.
5. Randomization Logic: Arrays are used to store keywords, which are randomly combined to create unique sentences every time the user clicks.
   


