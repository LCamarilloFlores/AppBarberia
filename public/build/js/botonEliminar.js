const dominio = "https://barberia.it-solutions.pw";
function cargarBotones() {
  document.querySelectorAll(".boton-eliminar").forEach((t) => {
    t.addEventListener("click", (t) => {
      eliminarCita(t);
    });
  });
}
async function eliminarCita(t) {
  let o = t.target.dataset.item;
  const i = new FormData();
  i.append("id", o);
  if (await mostrarAlertaCita())
    try {
      const t = dominio + "/api/eliminar",
        o = await fetch(t, { method: "POST", body: i });
      (await o.json()) &&
        Swal.fire({
          icon: "success",
          title: "Cita Eliminada",
          text: "La cita fue eliminada correctamente",
        }).then(() => {
          window.location.reload();
        });
    } catch (t) {
      Swal.fire({
        icon: "error",
        title: "No se pudo borrar la cita",
        text: "" + t,
      }).then(() => {
        window.location.reload();
      });
    }
}
async function mostrarAlertaCita() {
  return await Swal.fire({
    title: "¿Estas seguro?",
    text: "La cita se borrará",
    icon: "warning",
    showCancelButton: !0,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar cita",
  }).then((t) => t.isConfirmed);
}
async function eliminarServicio(t) {
  let o = t.target.dataset.item;
  const i = new FormData();
  i.append("id", o);
  if (await mostrarAlertaServicio())
    try {
      const t = dominio + "/servicio/eliminar",
        o = await fetch(t, { method: "POST", body: i });
      (await o.json()) &&
        Swal.fire({
          icon: "success",
          title: "Servicio Eliminado",
          text: "El servicio fue eliminado correctamente",
        }).then(() => {
          window.location.reload();
        });
    } catch (t) {
      Swal.fire({
        icon: "error",
        title: "No se pudo borrar el servicio",
        text: "" + t,
      }).then(() => {
        window.location.reload();
      });
    }
}
async function mostrarAlertaServicio() {
  return await Swal.fire({
    title: "¿Estas seguro?",
    text: "El servicio se borrará",
    icon: "warning",
    showCancelButton: !0,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar servicio",
  }).then((t) => t.isConfirmed);
}
document.addEventListener("DOMContentLoaded", cargarBotones);
