let qr;

function generateQR() {
  let text = document.getElementById("qrText").value.trim();
  const qrDiv = document.getElementById("qr");

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  qrDiv.innerHTML = "";

  text = text.normalize("NFC");

  // Si es URL, convertir dominio con ñ a punycode
  try {
    const url = new URL(text);

    // Convertimos solo el hostname si tiene caracteres especiales
    const punycodeDomain = punycode.toASCII(url.hostname);

    url.hostname = punycodeDomain;
    text = url.toString();

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
