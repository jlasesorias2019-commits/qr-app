document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("qrText");
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const qrDiv = document.getElementById("qr");

  generateBtn.addEventListener("click", generateQR);
  downloadBtn.addEventListener("click", downloadQR);

  function generateQR() {
    const text = input.value.trim();
    if (!text) return alert("Escribe algo");

    qrDiv.innerHTML = "";

    new QRCode(qrDiv, {
      text: text,
      width: 256,
      height: 256,
    });
  }

 function generateQR() {
  let text = input.value.trim();
  if (!text) return alert("Escribe algo");

  try {
    const url = new URL(text);

    // Si el dominio tiene ñ, lo convertimos manualmente a punycode válido
    if (url.hostname.includes("ñ")) {
      url.hostname = "xn--" + url.hostname.replace("ñ", "n--");
    }

    text = url.href;
  } catch (e) {}

  qrDiv.innerHTML = "";

  new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
  });
}
