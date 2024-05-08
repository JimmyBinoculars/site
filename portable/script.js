document.getElementById("portfolio-container").onmousemove = e => {
  for(const item of document.getElementsByClassName("portfolio-item")) {
    const rect = item.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    item.style.setProperty("--mouse-x", `${x}px`)
    item.style.setProperty("--mouse-y", `${y}px`)
  }
}

function ironDownload() {
  downlaodFile("jimmybinoculars.org.uk/portable/Downloads/" "IronPortable.zip")
  downloadFile("jimmybinoculars.org.uk/portable/Downloads/", "IronPortable.z01")
}

function downloadFile(url, fileName) {
  fetch(url, { method: "get", mode: "no-cors", referrerPolicy: "no-referrer" })
    .then((res) => res.blob())
    .then((res) => {
      const aElement = document.createElement("a");
      aElement.setAttribute("download", fileName);
      const href = URL.createObjectURL(res);
      aElement.href = href;
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    });
}