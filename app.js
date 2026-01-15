let qr;

function generateQR() {
  const text = document.getElementById("qrText").value;
  const qrDiv = document.getElementById("qr");
  qrDiv.innerHTML = "";

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
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
