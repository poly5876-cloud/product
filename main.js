class LottoBall extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const number = this.getAttribute('number');
    const color = this.getAttribute('color');

    const ball = document.createElement('div');
    ball.style.backgroundColor = color;
    ball.style.width = '50px';
    ball.style.height = '50px';
    ball.style.borderRadius = '50%';
    ball.style.display = 'flex';
    ball.style.justifyContent = 'center';
    ball.style.alignItems = 'center';
    ball.style.color = 'white';
    ball.style.fontSize = '1.5rem';
    ball.style.fontWeight = 'bold';
    ball.textContent = number;

    shadow.appendChild(ball);
  }
}

customElements.define('lotto-ball', LottoBall);

const generatorBtn = document.getElementById('generator-btn');
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
