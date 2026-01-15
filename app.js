function downloadQR() {
  const qrDiv = document.getElementById("qr");
  const canvas = qrDiv.querySelector("canvas");
  const img = qrDiv.querySelector("img");

  if (canvas) {
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      forceDownload(url);
    });
  } else if (img) {
    fetch(img.src)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        forceDownload(url);
      });
  } else {
    alert("Primero genera un QR 🙂");
  }
}

function forceDownload(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "codigo-qr.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
