const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Load transactions from localStorage or initialize empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Save to localStorage
const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Add new transaction
const addTransaction = (e) => {
  e.preventDefault();

  const textValue = text.value.trim();
  const amountValue = +amount.value.trim();

  if (!textValue || isNaN(amountValue) || amountValue === 0) {
    alert("Please enter a valid description and non-zero amount.");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: textValue,
    amount: amountValue
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = "";
  amount.value = "";
};

// Render transaction to DOM list
const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
};

// Remove transaction by ID
window.removeTransaction = (id) => {
  transactions = transactions.filter((t) => t.id !== id);
  updateLocalStorage();
  init();
};

// Update Balance, Income, and Expense display
const updateValues = () => {
  const amounts = transactions.map((t) => t.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `+$${income}`;
  moneyMinus.innerText = `-$${expense}`;
};

// Initialize app
const init = () => {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
};

form.addEventListener("submit", addTransaction);

init();