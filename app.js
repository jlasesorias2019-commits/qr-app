let qr;

function generateQR() {
  const text = document.getElementById("qrText").value.trim();
  const qrDiv = document.getElementById("qr");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  qrDiv.innerHTML = "";
  downloadBtn.disabled = true;

  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.H
  });

  // Esperamos un momento a que se genere el QR
  setTimeout(() => {
    downloadBtn.disabled = false;
  }, 300);
}

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

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "codigo-qr.png";
  link.click();
}
