function setParticles(color = "#ff003c") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80 },
      color: { value: color },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: {
        enable: true,
        distance: 150,
        color: color,
        opacity: 0.4,
        width: 1
      },
      move: { enable: true, speed: 2 }
    }
  });
}

const THEME_KEY = 'redx-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  setParticles(theme === 'dark' ? '#ff003c' : '#000');
  document.getElementById('themeIcon').src = theme === 'dark'
    ? 'assets/icons/moon.png'
    : 'assets/icons/sun.png';
}

applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

const aobInput = document.getElementById("aobInput");
const cppOutput = document.getElementById("cppOutput");
const byteCount = document.getElementById("byteCount");

aobInput.addEventListener("input", () => {
  const parts = aobInput.value.trim().split(/\s+/);
  let bytes = [];
  let count = 0;
  for (let part of parts) {
    if (part === "??") {
      bytes.push("/* ? */");
    } else if (/^[A-Fa-f0-9]{2}$/.test(part)) {
      bytes.push("0x" + part.toUpperCase());
      count++;
    }
  }
  byteCount.textContent = `BYTE COUNT: ${count}`;
  cppOutput.textContent = `unsigned char aob[] = { ${bytes.join(", ")} };`;
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const code = cppOutput.textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById("copyBtn");
    btn.textContent = "✔️ Copied!";
    setTimeout(() => {
      btn.textContent = "📋 Copy Code";
    }, 1500);
  });
});

const hoverCard = document.getElementById("hover-card");

document.addEventListener("mousemove", (e) => {
  const rect = hoverCard.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  const rotateX = (deltaY / rect.height) * -10;
  const rotateY = (deltaX / rect.width) * 10;
  hoverCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.addEventListener("mouseleave", () => {
  hoverCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
