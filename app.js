function generateQR() {
  let text = document.getElementById("qrText").value.trim();
  const qrDiv = document.getElementById("qr");

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  qrDiv.innerHTML = "";
  text = text.normalize("NFC");

  try {
    const url = new URL(text);

    const asciiHostname = url.hostname
      .split(".")
      .map(part => part.normalize("NFC").replace(/ñ/g, "xn--n"))
      .join(".");

    url.hostname = asciiHostname;
    text = url.toString();

  } catch (e) {}

  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
  });
}
