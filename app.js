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

    // Forzamos al navegador a convertir el hostname a ASCII (punycode)
    const asciiUrl = url.href.normalize("NFC");

    // El navegador ya expone la versión ASCII aquí:
    const fixedUrl = url.protocol + "//" + url.host + url.pathname + url.search + url.hash;

    text = fixedUrl;
  } catch (e) {
    // No es URL → se deja como texto normal
  }

  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
  });
}
