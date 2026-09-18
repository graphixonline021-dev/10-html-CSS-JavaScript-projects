const contents = document.querySelectorAll(".content");
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    
    contents.forEach((content) => content.classList.remove("active"));

    item.classList.add("active");

    const targetId = item.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
  });
});