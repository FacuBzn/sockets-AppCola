//Referencias HTML
const lblEscritorio = document.querySelector('h1'); //el primero h1 que encuentre
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');



const searchParams = new URLSearchParams( window.location.search );  //leer los parametros de la URL 

if ( !searchParams.has('escritorio') ){ //saber si existe el escritorio o no

    window.location = 'index.html'; // Vamos a sacar al usuario al index, para que no siga
    throw new Error('El escritorio es obligatorio'); //lanzar un error
}

const escritorio = searchParams.get('escritorio');
/*console.log({escritorio});*/
lblEscritorio.innerText = escritorio; // asigno al escritorio


divAlerta.style.display = 'none'; // para que no aparezca la alerta en el front

const socket = io();


socket.on('connect', () => { //inicializacion
    btnAtender.disabled = false; //Si se conecta va a estar habilitad
});

socket.on('disconnect', () => {    
    btnAtender.disabled = true; //Si se desconecta o no esta conectado mi servidor no voy a poder hacer click o disparar sobre ese boton
});

socket.on('ultimo-ticket', ( ultimo ) => {
    
});

btnAtender.addEventListener( 'click', () => {
      
    socket.emit('atender-ticket', {escritorio},( { ok, ticket, msg} ) => { // le estoy mandando dentro del payload el escritorio como un objeto
       
        if ( !ok ){ // si el ok no es true ( no viene )
            lblTicket.innerText = 'Nadie ';
            return divAlerta.style.display = '' ;
        }
        
        lblTicket.innerText = 'Ticket ' + ticket.numero; 

    });

    /* socket.emit( 'siguiente-ticket', null, ( ticket ) => { // emitir ese mensaje, debe ser el mismo que esta en el controlador "siguiente-ticket"
    }); */

});


