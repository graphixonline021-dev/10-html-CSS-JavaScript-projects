const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");

const keys = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

const generatePassword = () => {
  const length = parseInt(lengthEl.value);
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  let validChars = "";
  if (hasUpper) validChars += keys.uppercase;
  if (hasLower) validChars += keys.lowercase;
  if (hasNumber) validChars += keys.numbers;
  if (hasSymbol) validChars += keys.symbols;

  if (!validChars) {
    alert("Please select at least one character type!");
    return;
  }

  let generatedPassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    generatedPassword += validChars[randomIndex];
  }

  resultEl.value = generatedPassword;
};

copyBtn.addEventListener("click", () => {
  if (!resultEl.value) return;

  navigator.clipboard.writeText(resultEl.value).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  });
});

generateBtn.addEventListener("click", generatePassword);

// Initial password generation on load
generatePassword();