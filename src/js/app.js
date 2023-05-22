let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const dominio = "http://localhost:3000"

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded',()=>{
    iniciarApp();
})

function iniciarApp(){
    mostrarSeccion(); //Muestra la seccion inicial
    tabs(); //Cambia la sección dependiendo del tab clickeado
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaSiguiente(); //Registramos la funcion para cambiar a la pagina siguiente
    paginaAnterior(); //Registramos la funcion para cambiar a la pagina anterior
    consultarAPI(); //Consulta la API en el backend de PHP
    nombreCliente(); //Establece el nombre del cliente en el objeto cita
    idCliente(); //Establece el id del cliente en el objeto cita
    seleccionarFecha(); //Establece la fecha del servicio en el objeto cita
    seleccionarHora(); //Establece la Hora del servicio en el objeto cita
    mostrarResumen(); //Muestra el resumen de la cita
}

function mostrarSeccion(){
    //Ocultar seccion visible
    const seccionMostrada = document.querySelector('.mostrar');
    if(seccionMostrada)
    seccionMostrada.classList.remove('mostrar');

    const menu = document.querySelector(`#paso-${paso}`);
    menu.classList.add('mostrar');
    
    //Resalta la seccion activa
    const tabs = document.querySelectorAll('.tabs button');
    tabs.forEach(tab=>{
        let temp = parseInt(tab.dataset.paso)
        if(temp==paso){
            tab.classList.add('actual');

        }
        else{
            tab.classList.remove('actual');
        }
    });
   
}

function tabs(){
    const botones = document.querySelectorAll(".tabs button");
    botones.forEach(boton=>{
        boton.addEventListener('click',function (e){
            paso = parseInt(e.target.dataset.paso);
            botonesPaginador();
            mostrarSeccion();
        })
    })
}

function botonesPaginador(){
    const botonSiguiente = document.getElementById('siguiente');
    const botonAnterior = document.getElementById('anterior');
    
    if(paso===1){
        botonAnterior.classList.add('ocultar');
        botonSiguiente.classList.remove('ocultar');
    }
    else if(paso===2){
        botonAnterior.classList.remove('ocultar');
        botonSiguiente.classList.remove('ocultar');
    }
    else if(paso===3){
        botonSiguiente.classList.add('ocultar');
        botonAnterior.classList.remove('ocultar');
        mostrarResumen();
    }   
    mostrarSeccion();
}

function paginaSiguiente(){
    const botonSiguiente = document.querySelector("#siguiente");
    botonSiguiente.addEventListener('click',function(){
    if(paso>=pasoFinal) return;
    else{
        paso++;
        console.log(paso);
        botonesPaginador();
    }
}
    )
}

function paginaAnterior(){
    const botonAnterior = document.querySelector("#anterior");
    botonAnterior.addEventListener('click',function(){
    if(paso<=pasoInicial) return;
    else{
        paso--;
        console.log(paso);
        botonesPaginador();
    }
}
    )
}

async function consultarAPI(){
    try{
        const url = dominio + '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    }
    catch(error){
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio=>{
        const {id,nombre,precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add("nombre-servicio");
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add("precio-servicio");
        precioServicio.textContent = `$ ${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        }
        
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.getElementById('servicios').appendChild(servicioDiv);
    })
}

function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;
    const divServicios = document.querySelector(`[data-id-servicio="${id}"]`);
    if(cita.servicios.find(elemento=>servicio===elemento)){
        divServicios.classList.remove('seleccionado');
        cita.servicios=cita.servicios.filter(elemento=>elemento!==servicio);
    }
    else{
        divServicios.classList.add('seleccionado');
        cita.servicios = [...servicios,servicio];
    }
}

function nombreCliente(){
    cita.nombre = document.getElementById('nombre').value;
}

function idCliente(){
    cita.id = document.getElementById('id').value;
}

function seleccionarFecha(){
    const formulario = document.querySelector(".formulario");
    const inputFecha = document.querySelector("#fecha");
    inputFecha.addEventListener('input',function(e){
        const dia = new Date(e.target.value).getUTCDay()
        if([6,0].includes(dia)){
            e.target.value = ''
            mostrarAlerta('Fines de semana no hay citas','error',formulario);
        }
        else{
            cita.fecha = inputFecha.value;
        }
    })
}

function mostrarAlerta(mensaje,tipo,elementoPadre,temp=true){
    const alertaPrevia = document.querySelector(".alerta");
    if (alertaPrevia){
        alertaPrevia.remove()
    }
    const alertaDiv = document.createElement('DIV');
    alertaDiv.classList.add("alerta")
    alertaDiv.classList.add(tipo)
    alertaDiv.textContent = mensaje;
    elementoPadre.appendChild(alertaDiv);
    if(temp){
        setTimeout(() => {
            alertaDiv.remove();
        }, 3000);
    }
}

function seleccionarHora(){
    const formulario = document.querySelector(".formulario");
    const inputHora = document.getElementById("hora");
    inputHora.addEventListener('input',function(e){
        const horaSeleccionada = e.target.value;
        const hora = horaSeleccionada.split(":")[0];
        if(hora<10 || hora >18){
            e.target.value = ''
            mostrarAlerta("La hora seleccionada esta fuera de nuestro horario","error",formulario)
        }
        else{
            cita.hora = horaSeleccionada;
        }
    })
}

function mostrarResumen(){
    const resumen = document.querySelector(".contenido-resumen");
    
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild)
    }

    if(Object.values(cita).includes('')||cita.servicios.length===0){
        mostrarAlerta("Faltan datos o Servicios","error",resumen,false)
        return;
    }
    

    //Imprimir el resumen
    const {nombre, fecha, hora, servicios} = cita;
    const fechaNueva = new Date(fecha)
    const mes = fechaNueva.getMonth()
    const dia = fechaNueva.getDate() + 2
    const year = fechaNueva.getFullYear()

    const fechaUTC = new Date(Date.UTC(year,mes,dia))
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX',opciones)
    
    const nombreCliente = document.createElement('P')
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`
    const fechaCita = document.createElement('P')
    fechaCita.classList.add('fecha')
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`
    const horaCita = document.createElement('P')
    horaCita.innerHTML = `<span>Hora:</span> ${hora} horas`

    //Heading para los servicios
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = "Resumen de Servicios"
    resumen.appendChild(headingServicios)
    //Visualizar los servicios seleccionados
    servicios.forEach(servicio=>{
        const {id,precio,nombre} = servicio
        const servicioDiv = document.createElement('DIV')
        servicioDiv.classList.add("contenedor-servicio")
        const textoServicio = document.createElement('P')
        textoServicio.textContent = nombre;
        const precioServicio = document.createElement('P')
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;
        servicioDiv.appendChild(textoServicio)
        servicioDiv.appendChild(precioServicio)
        resumen.appendChild(servicioDiv)
    })

    
    //Heading para la cita
    const headingCita = document.createElement('H3');
    headingCita.textContent = "Resumen de Cita"
    //Agregando el Boton de Guardar
    const botonReservar = document.createElement('BUTTON')
    botonReservar.classList.add('boton')
    botonReservar.textContent = "Reservar Cita"
    botonReservar.onclick = reservarCita
    resumen.appendChild(headingCita)
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar)

}

async function reservarCita(){
    const {id,fecha,hora,servicios} = cita
    const idServicios = servicios.map(servicio=>servicio.id)
    const datos = new FormData();
    datos.append('usuarioId',id)
    datos.append('fecha',fecha)
    datos.append('hora',hora)

    try {
        const url = 'http://localhost:3000/api/citas';
    const respuesta = await fetch(url,{
        method: 'POST',
        body: datos
    }) 
    const resultado = await respuesta.json();
    if(resultado.resultado){
        Swal.fire({
            icon: 'success',
            title: 'Cita Creada',
            text: 'Tu cita fue creada correctamente'
          }).then(()=>{
            window.location.reload();
          })
    }
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'No se pudo crear la cita',
            text: `${error}`
          }).then(()=>{
            window.location.reload();
          })
    }
    
}