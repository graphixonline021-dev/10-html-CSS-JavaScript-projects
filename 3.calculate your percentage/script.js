const calculateBtn = document.getElementById("calculate-btn");
const resultBox = document.getElementById("result");

const calculateMarks = () => {
  const web = parseFloat(document.getElementById("web").value);
  const maths = parseFloat(document.getElementById("maths").value);
  const comp = parseFloat(document.getElementById("comp").value);
  const phy = parseFloat(document.getElementById("phy").value);

  if (
    isNaN(web) || isNaN(maths) || isNaN(comp) || isNaN(phy) ||
    web < 0 || web > 100 ||
    maths < 0 || maths > 100 ||
    comp < 0 || comp > 100 ||
    phy < 0 || phy > 100
  ) {
    alert("Please enter valid marks between 0 and 100 for all subjects.");
    return;
  }

  const totalMarks = web + maths + comp + phy;
  const percentage = (totalMarks / 400) * 100;
  let grade = "";

  if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 60) {
    grade = "B";
  } else if (percentage >= 40) {
    grade = "C";
  } else {
    grade = "F";
  }

  const isPassed = web >= 35 && maths >= 35 && comp >= 35 && phy >= 35;
  const statusClass = isPassed ? "pass" : "fail";
  const statusText = isPassed ? "PASSED" : "FAILED";

  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    Out of 400, your total is <strong>${totalMarks}</strong> and percentage is <strong>${percentage.toFixed(2)}%</strong>.<br>
    Your Grade is <strong>${grade}</strong>.<br>
    Status: <span class="${statusClass}">${statusText}</span>
  `;
};

calculateBtn.addEventListener("click", calculateMarks);