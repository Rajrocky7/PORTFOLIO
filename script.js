window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.style.background = window.scrollY > 50 ? "#0f172a" : "#1e293b";
});
