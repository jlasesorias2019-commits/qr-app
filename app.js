let qr = null;

function generateQR() {
  const input = document.getElementById("qrText");
  const qrDiv = document.getElementById("qr");
  const downloadBtn = document.getElementById("downloadBtn");

  const text = input.value.trim();

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  // Limpia el contenedor
  qrDiv.innerHTML = "";

  // Deshabilita mientras se genera
  downloadBtn.disabled = true;

  // Genera el QR
  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.H
  });

  // Esperamos hasta que exista realmente el canvas o img
  const interval = setInterval(() => {
    const canvas = qrDiv.querySelector("canvas");
    const img = qrDiv.querySelector("img");

    if (canvas || img) {
      clearInterval(interval);
      downloadBtn.disabled = false; // 🔓 habilitamos botón
    }
  }, 50);
}

function downloadQR() {
  const qrDiv = document.getElementById("qr");
  const canvas = qrDiv.querySelector("canvas");
  const img = qrDiv.querySelector("img");

  let dataUrl = null;

  if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  } else if (img && img.src) {
    dataUrl = img.src;
  }

  if (!dataUrl) {
    alert("Primero genera un QR 🙂");
    return;
  }

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "codigo-qr.png";

  document.body.appendChild(a);
  a.click();
  document.body.remove
