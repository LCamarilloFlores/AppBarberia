const dominio = "http://localhost:3000";
document.addEventListener("DOMContentLoaded", cargarBotones);

function cargarBotones() {
  const botonesEliminar = document.querySelectorAll(".boton-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      eliminarCita(e);
    });
  });
}

async function eliminarCita(e) {
  let id = e.target.dataset.item;
  const datos = new FormData();
  datos.append("id", id);
  const respuesta = await mostrarAlertaCita();
  if (!respuesta) return;

  try {
    const url = dominio + "/api/eliminar";
    const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
    });
    const resultado = await respuesta.json();
    if (resultado) {
      Swal.fire({
        icon: "success",
        title: "Cita Eliminada",
        text: "La cita fue eliminada correctamente",
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "No se pudo borrar la cita",
      text: `${error}`,
    }).then(() => {
      window.location.reload();
    });
  }
}

async function mostrarAlertaCita() {
  let respuesta = await Swal.fire({
    title: "¿Estas seguro?",
    text: "La cita se borrará",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar cita",
  }).then((result) => {
    return result.isConfirmed;
    // if (result.isConfirmed) return true;
  });
  return respuesta;
}
