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

  function downloadQR() {
    const canvas = qrDiv.querySelector("canvas");
    const img = qrDiv.querySelector("img");

    let dataUrl = canvas ? canvas.toDataURL("image/png") : img?.src;

    if (!dataUrl) return alert("Primero genera un QR");

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "codigo-qr.png";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});
