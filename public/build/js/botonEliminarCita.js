const dominio = "https://barberia.it-solutions.pw:3000";
function cargarBotones() {
  document.querySelectorAll(".boton-eliminar").forEach((t) => {
    t.addEventListener("click", (t) => {
      eliminarCita(t);
    });
  });
}
async function eliminarCita(t) {
  let a = t.target.dataset.item;
  const o = new FormData();
  o.append("id", a);
  if (await mostrarAlertaCita())
    try {
      const t = dominio + "/api/eliminar",
        a = await fetch(t, { method: "POST", body: o });
      (await a.json()) &&
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
document.addEventListener("DOMContentLoaded", cargarBotones);
