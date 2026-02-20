class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['number', 'color'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const number = this.getAttribute('number');
    const color = this.getAttribute('color');

    if (!number || !color) return;

    this.shadowRoot.innerHTML = `
      <style>
        .ball {
          background-color: ${color};
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
      </style>
      <div class="ball">${number}</div>
    `;
  }
}

customElements.define('lotto-ball', LottoBall);

document.addEventListener('DOMContentLoaded', () => {
  const generatorBtn = document.getElementById('generator-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const numberDisplay = document.querySelector('.number-display');

  generatorBtn.addEventListener('click', () => {
    numberDisplay.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
      const color = getColor(number);
      const lottoBall = document.createElement('lotto-ball');
      lottoBall.setAttribute('number', number);
      lottoBall.setAttribute('color', color);
      numberDisplay.appendChild(lottoBall);
    });
  });

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });

  // Initialize theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = 'Light Mode';
  }
});

function getColor(number) {
  if (number <= 10) {
    return '#f2b526'; // yellow
  } else if (number <= 20) {
    return '#3498db'; // blue
  } else if (number <= 30) {
    return '#e74c3c'; // red
  } else if (number <= 40) {
    return '#2ecc71'; // green
  } else {
    return '#9b59b6'; // purple
  }
}
