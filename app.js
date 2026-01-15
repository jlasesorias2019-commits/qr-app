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

  // Limpia y bloquea el botón mientras se genera
  qrDiv.innerHTML = "";
  downloadBtn.disabled = true;

  // Genera el QR
  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.H
  });

  // Espera a que el QR exista realmente en el DOM (img o canvas)
  waitForQrRender(qrDiv, () => {
    downloadBtn.disabled = false;
  });
}

function waitForQrRender(container, onReady) {
  let tries = 0;
  const maxTries = 60; // ~3s si corre cada 50ms

  const timer = setInterval(() => {
    const hasCanvas = !!container.querySelector("canvas");
    const hasImg = !!container.querySelector("img");

    if (hasCanvas || hasImg) {
      clearInterval(timer);
      onReady();
      return;
    }

    tries++;
    if (tries >= maxTries) {
      clearInterval(timer);
      // Si algo raro pasó, lo dejamos habilitado para que al menos intente
      onReady();
    }
  }, 50);
}

function downloadQR() {
  const qrDiv = document.getElementById("qr");
  const canvas = qrDiv.querySelector("canvas");
  const img = qrDiv.querySelector("img");

  // Si aún no hay QR
  if (!canvas && !img) {
    alert("Primero genera un QR 🙂");
    return;
  }

  // 1) Si es canvas: descarga directa
  if (canvas) {
    const dataUrl = canvas.toDataURL("image/png");
    triggerDownload(dataUrl, "codigo-qr.png");
    return;
  }

  // 2) Si es img: normalmente es dataURL, también se puede descargar
  if (img && img.src) {
    triggerDownload(img.src, "codigo-qr.png");
    return;
  }

  alert("No se pudo obtener el QR para descargar.");
}

function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Fallback para navegadores que bloquean download (especialmente iOS/Safari)
  // Abrimos la imagen en otra pestaña para que el usuario la guarde.
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isIOS || isSafari) {
    window.open(url, "_blank");
    return;
  }

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
