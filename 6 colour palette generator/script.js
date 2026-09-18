const paletteContainer = document.getElementById("palette-container");
const generateBtn = document.getElementById("generate-btn");
const toast = document.getElementById("toast");

const COLOR_COUNT = 5;
let colorsState = Array.from({ length: COLOR_COUNT }, () => ({
  hex: "",
  isLocked: false
}));

const getRandomHexColor = () => {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 1500);
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${text} to clipboard!`);
  });
};

const renderPalette = () => {
  paletteContainer.innerHTML = "";

  colorsState.forEach((colorObj, index) => {
    if (!colorObj.isLocked || !colorObj.hex) {
      colorObj.hex = getRandomHexColor();
    }

    const col = document.createElement("div");
    col.className = "color-column";
    col.style.backgroundColor = colorObj.hex;

    col.innerHTML = `
      <span class="hex-code" title="Click to copy">${colorObj.hex}</span>
      <button class="lock-btn" aria-label="Lock color">
        <i class="fa-solid ${colorObj.isLocked ? "fa-lock" : "fa-lock-open"}"></i>
      </button>
    `;

    
    col.querySelector(".hex-code").addEventListener("click", () => {
      copyToClipboard(colorObj.hex);
    });

    
    col.querySelector(".lock-btn").addEventListener("click", () => {
      colorObj.isLocked = !colorObj.isLocked;
      renderPalette();
    });

    paletteContainer.appendChild(col);
  });
};

generateBtn.addEventListener("click", renderPalette);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target.tagName !== "BUTTON") {
    e.preventDefault();
    renderPalette();
  }
});


renderPalette();