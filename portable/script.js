document.getElementById("portfolio-container").onmousemove = e => {
  for(const item of document.getElementsByClassName("portfolio-item")) {
    const rect = item.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    item.style.setProperty("--mouse-x", `${x}px`)
    item.style.setProperty("--mouse-y", `${y}px`)
  }
}

document.getElementById("Iron").addEventListener("click", function() {
  downloadFile("./Downloads/IronPortable.zip");
  downloadFile("./Downloads/IronPortable.z01");
});

function downloadFile(filename) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Placeholder content for ' + filename));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}