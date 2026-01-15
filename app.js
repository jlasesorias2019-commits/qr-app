let qr;

function generateQR() {
  let text = document.getElementById("qrText").value.trim();
  const qrDiv = document.getElementById("qr");

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  qrDiv.innerHTML = "";

  // Normalizar unicode
  text = text.normalize("NFC");

  // Intentar procesar como URL
  try {
    const url = new URL(text);
    const asciiHost = punycode.toASCII(url.hostname);

    // Reemplazar hostname por versión ASCII
    const finalUrl =
      url.protocol + "//" + asciiHost + url.pathname + url.search + url.hash;

    text = finalUrl;
  } catch (e) {
    // No es URL → se deja como texto plano
  }

  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
  });
}

function downloadQR() {
  const img = document.querySelector("#qr img");

  if (!img) {
    alert("Primero genera un QR 🙂");
    return;
  }

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "codigo-qr.png";
  link.click();
}
