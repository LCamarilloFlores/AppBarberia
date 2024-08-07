let paso = 1;
const pasoInicial = 1,
  pasoFinal = 3,
  dominio = "https://barberia.it-solutions.pw",
  cita = { id: "", nombre: "", fecha: "", hora: "", servicios: [] };
function iniciarApp() {
  mostrarSeccion(),
    tabs(),
    botonesPaginador(),
    paginaSiguiente(),
    paginaAnterior(),
    consultarAPI(),
    nombreCliente(),
    idCliente(),
    seleccionarFecha(),
    seleccionarHora(),
    mostrarResumen();
}
function mostrarSeccion() {
  const e = document.querySelector(".mostrar");
  e && e.classList.remove("mostrar");
  document.querySelector("#paso-" + paso).classList.add("mostrar");
  document.querySelectorAll(".tabs button").forEach((e) => {
    parseInt(e.dataset.paso) == paso
      ? e.classList.add("actual")
      : e.classList.remove("actual");
  });
}
function tabs() {
  document.querySelectorAll(".tabs button").forEach((e) => {
    e.addEventListener("click", function (e) {
      (paso = parseInt(e.target.dataset.paso)),
        botonesPaginador(),
        mostrarSeccion();
    });
  });
}
function botonesPaginador() {
  const e = document.getElementById("siguiente"),
    t = document.getElementById("anterior");
  1 === paso
    ? (t.classList.add("ocultar"), e.classList.remove("ocultar"))
    : 2 === paso
    ? (t.classList.remove("ocultar"), e.classList.remove("ocultar"))
    : 3 === paso &&
      (e.classList.add("ocultar"),
      t.classList.remove("ocultar"),
      mostrarResumen()),
    mostrarSeccion();
}
function paginaSiguiente() {
  document.querySelector("#siguiente").addEventListener("click", function () {
    paso >= 3 || (paso++, botonesPaginador());
  });
}
function paginaAnterior() {
  document.querySelector("#anterior").addEventListener("click", function () {
    paso <= 1 || (paso--, console.log(paso), botonesPaginador());
  });
}
async function consultarAPI() {
  try {
    const e = dominio + "/api/servicios",
      t = await fetch(e);
    mostrarServicios(await t.json());
  } catch (e) {
    console.log(e);
  }
}
function mostrarServicios(e) {
  e.forEach((e) => {
    const { id: t, nombre: o, precio: a } = e,
      n = document.createElement("P");
    n.classList.add("nombre-servicio"), (n.textContent = o);
    const c = document.createElement("P");
    c.classList.add("precio-servicio"), (c.textContent = "$ " + a);
    const i = document.createElement("DIV");
    i.classList.add("servicio"),
      (i.dataset.idServicio = t),
      (i.onclick = function () {
        seleccionarServicio(e);
      }),
      i.appendChild(n),
      i.appendChild(c),
      document.getElementById("servicios").appendChild(i);
  });
}
function seleccionarServicio(e) {
  const { id: t } = e,
    { servicios: o } = cita,
    a = document.querySelector(`[data-id-servicio="${t}"]`);
  cita.servicios.find((t) => e === t)
    ? (a.classList.remove("seleccionado"),
      (cita.servicios = cita.servicios.filter((t) => t !== e)))
    : (a.classList.add("seleccionado"), (cita.servicios = [...o, e]));
}
function nombreCliente() {
  cita.nombre = document.getElementById("nombre").value;
}
function idCliente() {
  cita.id = document.getElementById("id").value;
}
function seleccionarFecha() {
  const e = document.querySelector(".formulario"),
    t = document.querySelector("#fecha");
  t.addEventListener("input", function (o) {
    const a = new Date(o.target.value).getUTCDay();
    [6, 0].includes(a)
      ? ((o.target.value = ""),
        mostrarAlerta("Fines de semana no hay citas", "error", e))
      : (cita.fecha = t.value);
  });
}
function mostrarAlerta(e, t, o, a = !0) {
  const n = document.querySelector(".alerta");
  n && n.remove();
  const c = document.createElement("DIV");
  c.classList.add("alerta"),
    c.classList.add(t),
    (c.textContent = e),
    o.appendChild(c),
    a &&
      setTimeout(() => {
        c.remove();
      }, 3e3);
}
function seleccionarHora() {
  const e = document.querySelector(".formulario");
  document.getElementById("hora").addEventListener("input", function (t) {
    const o = t.target.value,
      a = o.split(":")[0];
    a < 10 || a > 18
      ? ((t.target.value = ""),
        mostrarAlerta(
          "La hora seleccionada esta fuera de nuestro horario",
          "error",
          e
        ))
      : (cita.hora = o);
  });
}
function mostrarResumen() {
  const e = document.querySelector(".contenido-resumen");
  for (; e.firstChild; ) e.removeChild(e.firstChild);
  if (Object.values(cita).includes("") || 0 === cita.servicios.length)
    return void mostrarAlerta("Faltan datos o Servicios", "error", e, !1);
  const { nombre: t, fecha: o, hora: a, servicios: n } = cita,
    c = new Date(o),
    i = c.getMonth(),
    r = c.getDate() + 2,
    s = c.getFullYear(),
    d = new Date(Date.UTC(s, i, r)).toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    l = document.createElement("P");
  l.innerHTML = "<span>Nombre:</span> " + t;
  const u = document.createElement("P");
  u.classList.add("fecha"), (u.innerHTML = "<span>Fecha:</span> " + d);
  const m = document.createElement("P");
  m.innerHTML = `<span>Hora:</span> ${a} horas`;
  const p = document.createElement("H3");
  (p.textContent = "Resumen de Servicios"),
    e.appendChild(p),
    n.forEach((t) => {
      const { id: o, precio: a, nombre: n } = t,
        c = document.createElement("DIV");
      c.classList.add("contenedor-servicio");
      const i = document.createElement("P");
      i.textContent = n;
      const r = document.createElement("P");
      (r.innerHTML = "<span>Precio:</span> $" + a),
        c.appendChild(i),
        c.appendChild(r),
        e.appendChild(c);
    });
  const h = document.createElement("H3");
  h.textContent = "Resumen de Cita";
  const v = document.createElement("BUTTON");
  v.classList.add("boton"),
    (v.textContent = "Reservar Cita"),
    (v.onclick = reservarCita),
    e.appendChild(h),
    e.appendChild(l),
    e.appendChild(u),
    e.appendChild(m),
    e.appendChild(v);
}
async function reservarCita() {
  const { id: e, fecha: t, hora: o, servicios: a } = cita,
    n = a.map((e) => e.id),
    c = new FormData();
  c.append("usuarioId", e),
    c.append("fecha", t),
    c.append("hora", o),
    c.append("servicios", n);
  try {
    const e = dominio + "/api/citas",
      t = await fetch(e, { method: "POST", body: c });
    (await t.json()).resultado &&
      Swal.fire({
        icon: "success",
        title: "Cita Creada",
        text: "Tu cita fue creada correctamente",
      }).then(() => {
        window.location.reload();
      });
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "No se pudo crear la cita",
      text: "" + e,
    }).then(() => {
      window.location.reload();
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});
