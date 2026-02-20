/**
 * Main JavaScript file for the Premium Lotto Number Generator.
 * Handles smooth scrolling, theme toggling, and the core lotto generator web component.
 */

// --- Smooth Scrolling for Navigation --- //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Theme Toggler --- //
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.innerHTML = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
});


// --- Lotto Generator Web Component --- //
class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.numbers = new Set();
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#generator-btn').addEventListener('click', () => this.generateNumbers());
    }

    generateNumbers() {
        // Placeholder for the number generation logic
        this.numbers.clear();
        while (this.numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            this.numbers.add(randomNumber);
        }
        this.updateDisplay();
    }

    updateDisplay() {
        // Placeholder for rendering the generated numbers
        const display = this.shadowRoot.querySelector('.number-display');
        display.innerHTML = ``;
        const sortedNumbers = [...this.numbers].sort((a,b) => a-b);

        sortedNumbers.forEach(number => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = number;
            display.appendChild(ball);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-machine {
                    text-align: center;
                    padding: 2rem;
                    background: var(--secondary-color);
                    border-radius: 20px;
                    box-shadow: inset 0 0 15px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3);
                }
                .number-display {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin: 2rem 0;
                    padding: 1.5rem;
                    background: rgba(0,0,0,0.2);
                    border-radius: 10px;
                    min-height: 80px;
                }
                .ball {
                    width: 60px; height: 60px;
                    border-radius: 50%;
                    display: flex; justify-content: center; align-items: center;
                    font-size: 1.8rem; font-weight: bold;
                    color: var(--text-color-dark);
                    background-color: #f0f0f0;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    transform: scale(0);
                    animation: popIn 0.5s ease-out forwards;
                }
                @keyframes popIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                #generator-btn {
                    padding: 1rem 2.5rem;
                    font-size: 1.2rem;
                    font-weight: 700;
                    border-radius: 50px;
                    border: none;
                    cursor: pointer;
                    background-color: var(--accent-color);
                    color: var(--text-color-dark);
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: var(--glow-shadow);
                }
                #generator-btn:hover { 
                    transform: translateY(-3px); 
                    box-shadow: var(--glow-shadow), 0 8px 25px rgba(0,0,0,0.3);
                }
            </style>
            <div class="lotto-machine">
                <div class="number-display"></div>
                <button id="generator-btn">Generate Numbers</button>
            </div>
        `;
    }
}

customElements.define('lotto-generator', LottoGenerator);
