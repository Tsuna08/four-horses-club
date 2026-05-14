# Four hordes club

A website dedicated to the international Vasyuki chess tournament. The project is designed in a retro poster style and contains information about the event, the stages of transforming the town of Vasyuki, and a list of tournament participants.

## Preview

![Four hordes club Preview](demo.png)

## Technologies

- **HTML**
- **CSS**
- **JavaScript**

## Architecture

```
four-hordes-club/
├── index.html              # Main page
├── styles.css              # Core styles
├── script.js               # Client logic (sliders, carousels)
├── assets/                 # Media files
└── README.md
```

## How to Run

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Open `index.html` in your preferred web browser.

## Implementation Highlights

- **Marquee** — animated via CSS @keyframes with content duplication handled in JavaScript.
- **Player slider** — responsive: the number of visible cards adjusts to screen width.
- **Stages grid** — uses CSS Grid on desktop and transforms into a horizontal slider with pagination on mobile.
- **Responsive design** — all styles are optimized for screen widths from 320px up to 1500px.
- **Custom fonts** — Merriweather for headings, Golos Text for body text.
