let qr;

function generateQR() {
  let text = document.getElementById("qrText").value.trim();
  const qrDiv = document.getElementById("qr");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!text) {
    alert("Escribe algo primero 🙂");
    return;
  }

  // Limpiamos el contenido anterior
  qrDiv.innerHTML = "";
  
  // Ocultamos el botón de descarga mientras se genera el nuevo
  downloadBtn.style.display = "none";

  text = text.normalize("NFC");

  // Generamos el QR
  qr = new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });

  // Mostramos el botón de descarga después de un breve momento
  // para asegurar que el QR se haya pintado.
  setTimeout(() => {
    downloadBtn.style.display = "block";
  }, 300);
}

function downloadQR() {
  const qrDiv = document.getElementById("qr");
  // La librería genera un canvas y luego una imagen (img). 
  // Intentamos obtener la imagen primero (es más seguro para descargar).
  const img = qrDiv.querySelector("img");
  
  if (img && img.src) {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "codigo-qr.png";
    document.body.appendChild(link); // Requerido por algunos navegadores (Firefox)
    link.click();
    document.body.removeChild(link);
  } else {
    // Fallback por si la imagen no está lista, intentamos con el canvas
    const canvas = qrDiv.querySelector("canvas");
    if(canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "codigo-qr.png";
        link.click();
    } else {
        alert("Hubo un error al leer el QR. Intenta generarlo de nuevo.");
    }
  }
}
