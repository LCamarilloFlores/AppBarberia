const dominio = "https://barberia.it-solutions.pw";
function cargarBotones() {
  document.querySelectorAll(".boton-eliminar").forEach((o) => {
    o.addEventListener("click", (o) => {
      eliminarServicio(o);
    });
  });
}
async function eliminarServicio(o) {
  let t = o.target.dataset.item;
  const e = new FormData();
  e.append("id", t);
  if (await mostrarAlertaServicio())
    try {
      const o = dominio + "/servicios/eliminar",
        t = await fetch(o, { method: "POST", body: e });
      (await t.json()) &&
        Swal.fire({
          icon: "success",
          title: "Servicio Eliminado",
          text: "El servicio fue eliminado correctamente",
        }).then(() => {
          window.location.reload();
        });
    } catch (o) {
      Swal.fire({
        icon: "error",
        title: "No se pudo borrar el servicio",
        text: "" + o,
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
  }).then((o) => o.isConfirmed);
}
document.addEventListener("DOMContentLoaded", cargarBotones);
