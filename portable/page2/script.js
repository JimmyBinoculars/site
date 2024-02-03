document.getElementById("portfolio-container").onmousemove = e => {
  for(const item of document.getElementsByClassName("portfolio-item")) {
    const rect = item.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    item.style.setProperty("--mouse-x", `${x}px`)
    item.style.setProperty("--mouse-y", `${y}px`)
  }
}