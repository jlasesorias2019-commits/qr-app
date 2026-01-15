let qr;

function generateQR() {
  let text = document.getElementById("qrText").value.trim();
  const qrDiv = document.getElementById("qr");

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  qrDiv.innerHTML = "";

  try {
    const url = new URL(text);

    // Normalizamos y usamos la versión que el navegador entiende
    text = url.href;

  } catch (e) {
    // No es URL → se deja como texto normal
  }

  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
  });
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
