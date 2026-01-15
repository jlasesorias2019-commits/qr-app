function downloadQR() {
  const qrDiv = document.getElementById("qr");
  const canvas = qrDiv.querySelector("canvas");
  const img = qrDiv.querySelector("img");

  let dataUrl = null;

  if (canvas) {
    try {
      dataUrl = canvas.toDataURL("image/png");
    } catch (e) {
      alert("No se puede descargar este QR en este navegador. Intenta desde Chrome o una computadora.");
      return;
    }
  } else if (img) {
    dataUrl = img.src;
  } else {
    alert("Primero genera un QR 🙂");
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "codigo-qr.png";
  document.body.appendChild(link);

  requestAnimationFrame(() => {
    link.click();
    document.body.removeChild(link);
  });
}
