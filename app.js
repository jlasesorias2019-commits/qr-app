let qr;

function generateQR() {
  const input = document.getElementById("qrText");
  const qrDiv = document.getElementById("qr");
  const downloadBtn = document.getElementById("downloadBtn");

  const text = (input.value || "").trim();

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  qrDiv.innerHTML = "";
  downloadBtn.disabled = true;

  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.H
  });

  // Esperamos explícitamente a que el QR exista
  waitForQr(qrDiv, () => {
    downloadBtn.disabled = false;   // 🔓 lo habilitamos aquí
  });
}

function waitForQr(container, callback) {
  let attempts = 0;

  const interval = setInterval(() => {
    const hasCanvas = container.querySelector("canvas");
    const hasImg = container.querySelector("img");

    if (hasCanvas || hasImg) {
      clearInterval(interval);
      callback();
    }

    attempts++;
    if (attempts > 60) {
      clearInterval(interval);
      callback(); // fallback: habilitar de todos modos
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
  document.body.removeChild(a);
}
