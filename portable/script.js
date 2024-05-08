document.getElementById("portfolio-container").onmousemove = e => {
  for(const item of document.getElementsByClassName("portfolio-item")) {
    const rect = item.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    item.style.setProperty("--mouse-x", `${x}px`)
    item.style.setProperty("--mouse-y", `${y}px`)
  }
}

function downloadFiles() {
  var file1Url = './Downloads/IronPortable.zip'; // Replace with actual file URL
  var file2Url = './Downloads/IronPortable.z01'; // Replace with actual file URL

  var link = document.getElementById('downloadLink');
  link.setAttribute('href', file1Url);
  link.setAttribute('download', ''); // This attribute is necessary for download
  link.click();

  // Create a new link for the second file
  var link2 = document.createElement('a');
  link2.setAttribute('href', file2Url);
  link2.setAttribute('download', ''); // This attribute is necessary for download
  link2.click();
}