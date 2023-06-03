const dominio = "http://localhost:3000";
document.addEventListener("DOMContentLoaded", cargarBotones);

function cargarBotones() {
  const botonesEliminar = document.querySelectorAll(".boton-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      eliminarServicio(e);
    });
  });
}

async function eliminarServicio(e) {
  let id = e.target.dataset.item;
  const datos = new FormData();
  datos.append("id", id);
  const respuesta = await mostrarAlertaServicio();
  if (!respuesta) return;

  try {
    const url = dominio + "/servicios/eliminar";
    const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
    });
    const resultado = await respuesta.json();
    if (resultado) {
      Swal.fire({
        icon: "success",
        title: "Servicio Eliminado",
        text: "El servicio fue eliminado correctamente",
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "No se pudo borrar el servicio",
      text: `${error}`,
    }).then(() => {
      window.location.reload();
    });
  }
}

async function mostrarAlertaServicio() {
  let respuesta = await Swal.fire({
    title: "¿Estas seguro?",
    text: "El servicio se borrará",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar servicio",
  }).then((result) => {
    return result.isConfirmed;
    // if (result.isConfirmed) return true;
  });
  return respuesta;
}
