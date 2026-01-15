function downloadQR() {
  const qrDiv = document.getElementById("qr");
  const canvas = qrDiv.querySelector("canvas");
  const img = qrDiv.querySelector("img");

  let dataUrl = null;

  if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  } else if (img) {
    dataUrl = img.src;
  } else {
    alert("Primero genera un QR 🙂");
    return;
  }

  // Si está dentro de Google Sites (iframe), abrir en pestaña nueva
  const a = document.createElement("a");
  a.href = dataUrl;
  a.target = "_blank";
  a.rel = "noopener noreferrer";

  // Intento de descarga (funciona fuera del iframe)
  a.download = "codigo-qr.png";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
