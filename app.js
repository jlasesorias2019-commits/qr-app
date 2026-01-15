let qr;

function generateQR() {
  let text = document.getElementById("qrText").value.trim();
  const qrDiv = document.getElementById("qr");

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  qrDiv.innerHTML = "";

  // Normalizamos texto para evitar problemas Unicode (ñ, acentos, etc.)
  text = text.normalize("NFC");

  // Si es una URL válida, la normalizamos con el parser del navegador
  try {
    const url = new URL(text);
    text = url.toString();
  } catch (e) {
    // No es URL, se deja como texto normal (ej. "hola", "evento", etc.)
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
