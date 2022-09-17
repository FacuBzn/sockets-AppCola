//Referencias para trabajar el HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket'); // referencia al id 
const btnCrear = document.querySelector('button'); //referencia al primer boton que aparezca en el HTML


const socket = io();


socket.on('connect', () => { //inicializacion
    // console.log('Conectado');
    btnCrear.disabled = false; //Si se conecta va a estar habilitado

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true; //Si se desconecta o no esta conectado mi servidor no voy a poder hacer click o disparar sobre ese boton

});

socket.on('ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
});

btnCrear.addEventListener( 'click', () => {
      
    socket.emit( 'siguiente-ticket', null, ( ticket ) => { // emitir ese mensaje, debe ser el mismo que esta en el controlador "siguiente-ticket"
        /*console.log('Desde el server', ticket );*/
        lblNuevoTicket.innerText = ticket;
    });

});



