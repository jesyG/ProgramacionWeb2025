document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const linea = `${nombre},${email},${mensaje}\n`;

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "contacto.txt",
        types: [{
          description: "Archivo de texto",
          accept: { "text/plain": [".txt"] }
        }]
      });

      const writable = await handle.createWritable();
      await writable.write(linea);
      await writable.close();

      alert("¡Formulario enviado correctamente!");
      form.reset();
    } catch (err) {
      console.error("Error guardando archivo:", err);
      alert("Error al guardar el contacto. Por favor permití acceso al archivo.");
    }
  });
});