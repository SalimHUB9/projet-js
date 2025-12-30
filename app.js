document.querySelectorAll(".sidebar a").forEach(link => {
  link.onclick = () => {

    document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");

    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    const section = document.getElementById(link.dataset.section);
    section.classList.add("active");

    if (link.dataset.section === "api") {
      initAPI();
    }
  };
});
