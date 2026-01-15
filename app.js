document.addEventListener("DOMContentLoaded", () => {

  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const input = document.getElementById("qrText");
  const qrDiv = document.getElementById("qr");

  generateBtn.addEventListener("click", generateQR);
  downloadBtn.addEventListener("click", downloadQR);

  function generateQR() {
    const text = input.value.trim();

    if (!text) {
      alert("Escribe algo primero 🙂");
      return;
    }

    qrDiv.innerHTML = "";

    if (typeof QRCode === "undefined") {
      alert("No se pudo cargar la librería QR.");
      return;
    }

    new QRCode(qrDiv, {
      text: text,
      width: 256,
      height: 256,
    });
  }

  function downloadQR() {
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

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "codigo-qr.png";
    link.click();
  }

});
