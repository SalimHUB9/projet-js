const dashboardSection = document.getElementById("dashboard");

// Observer كيترقّب وقتاش dashboard تولّي active
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (
      mutation.attributeName === "class" &&
      dashboardSection.classList.contains("active")
    ) {
      updateDashboard();
    }
  });
});

// نراقبو تغيّر class
observer.observe(dashboardSection, {
  attributes: true
});

// Navigation SPA
document.querySelectorAll(".sidebar a").forEach(link => {
  link.onclick = () => {

    document.querySelectorAll(".sidebar a")
      .forEach(a => a.classList.remove("active"));
    link.classList.add("active");

    document.querySelectorAll(".section")
      .forEach(s => s.classList.remove("active"));

    document.getElementById(link.dataset.section)
      .classList.add("active");
  };
});

// Initial load
window.addEventListener("load", () => {
  // إلا كان dashboard هو الأول
  if (dashboardSection.classList.contains("active")) {
    updateDashboard();
  }
});
