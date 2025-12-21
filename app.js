document.querySelectorAll(".sidebar a").forEach(link=>{
  link.onclick = ()=>{
    document.querySelectorAll(".sidebar a").forEach(a=>a.classList.remove("active"));
    link.classList.add("active");

    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    document.getElementById(link.dataset.section).classList.add("active");
  }
});
