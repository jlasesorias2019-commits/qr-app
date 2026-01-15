let qr; // Variable global para guardar la instancia del QR

function generateQR() {
  const textInput = document.getElementById("qrText");
  const text = textInput.value.trim();
  const qrDiv = document.getElementById("qr");
  const downloadBtn = document.getElementById("downloadBtn");

  // Validación: Si no hay texto, avisamos y salimos
  if (!text) {
    alert("¡Por favor escribe algo para convertir a QR!");
    return;
  }

  // 1. Limpiamos el código QR anterior (si había uno)
  qrDiv.innerHTML = "";
  
  // 2. Ocultamos el botón de descarga momentáneamente
  downloadBtn.style.display = "none";

  // 3. Generamos el nuevo QR
  // Usamos un pequeño retraso para asegurar que el DOM esté listo
  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });

  // 4. Mostramos el botón de descarga
  // Le damos 500ms para asegurar que la imagen se renderice
  setTimeout(() => {
    downloadBtn.style.display = "inline-block";
  }, 500);
}

function downloadQR() {
  const qrDiv = document.getElementById("qr");
  // Buscamos la imagen generada por la librería
  const img = qrDiv.querySelector("img");

  if (img && img.src) {
    // Creamos un enlace temporal para forzar la descarga
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "codigo-qr-luis.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert("Hubo un problema al generar la imagen. Intenta darle a 'Generar' otra vez.");
  }
}
